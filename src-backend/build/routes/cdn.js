"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
const util_1 = require("util");
const path_1 = require("path");
const router = (0, express_1.Router)();
const readdirAsync = (0, util_1.promisify)(fs_1.readdir);
const statAsync = (0, util_1.promisify)(fs_1.stat);
router.get("/uploads/:user", async (request, response) => {
    const user = request.params.user;
    const directoryPath = `uploads/${user}`;
    const fileName = request.query.fileName;
    try {
        if (fileName) {
            const filePath = (0, path_1.join)(directoryPath, fileName);
            const fileStats = await statAsync(filePath);
            if (fileStats.isFile()) {
                response.status(200).sendFile(filePath, { root: '.' });
                return;
            }
            else {
                response.status(404).json({ error: "File not found" });
                return;
            }
        }
        else {
            const files = await readdirAsync(directoryPath);
            response.status(200).json({ files });
        }
    }
    catch (error) {
        response.status(500).json({ error: error.message });
    }
});
exports.default = router;
