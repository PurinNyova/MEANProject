import { Request, Response } from 'express';
import { join } from 'path';
import { promisify } from 'util';
import { stat, readdir } from 'fs';
import archiver from 'archiver';

const statAsync = promisify(stat);
const readdirAsync = promisify(readdir);

const router = require('express').Router();

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
                return;
            } else {
                response.status(404).json({ error: "File not found" });
                return;
            }
        } else {
            const files = await readdirAsync(directoryPath);
            if (files.length === 0) {
                response.status(404).json({ error: "No files found" });
                return;
            }
            
            const archive = archiver('zip', {
                zlib: { level: 9 }
            });

            archive.on('error', (err) => {
                throw err;
            });

            response.attachment(`${user}.zip`);
            archive.pipe(response);

            archive.directory(directoryPath, false);

            await archive.finalize();
        }
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
});

export default router;
