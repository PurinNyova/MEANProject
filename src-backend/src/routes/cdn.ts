import { Request, Response, Router } from "express";
import { readdir, stat } from "fs";
import { promisify } from "util";
import { join } from "path";

const router = Router();
const readdirAsync = promisify(readdir);
const statAsync = promisify(stat);

router.get("/uploads/:user", async (request: Request, response: Response) => {
    const user = request.params.user;
    const directoryPath = `uploads/${user}`;
    const fileName = request.query.fileName as string;

    try {
        if (fileName) {
            const filePath = join(directoryPath, fileName);
            const fileStats = await statAsync(filePath);
            if (fileStats.isFile()) {
                response.status(200).sendFile(filePath, { root: '.' });
                return
            } else {
                response.status(404).json({ error: "File not found" });
                return
            }
        } else {
            const files = await readdirAsync(directoryPath);
            response.status(200).json({ files });
        }
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
});

export default router;
