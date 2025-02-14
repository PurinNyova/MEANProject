"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const util_1 = require("util");
const fs_1 = require("fs");
const archiver_1 = __importDefault(require("archiver"));
const statAsync = (0, util_1.promisify)(fs_1.stat);
const readdirAsync = (0, util_1.promisify)(fs_1.readdir);
const router = require('express').Router();
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
            if (files.length === 0) {
                response.status(404).json({ error: "No files found" });
                return;
            }
            const archive = (0, archiver_1.default)('zip', {
                zlib: { level: 9 } // Sets the compression level.
            });
            // Handle archiver errors
            archive.on('error', (err) => {
                throw err;
            });
            // Pipe the output to the response
            response.attachment(`${user}.zip`);
            archive.pipe(response);
            // Append files from directory
            archive.directory(directoryPath, false);
            await archive.finalize();
        }
    }
    catch (error) {
        response.status(500).json({ error: error.message });
    }
});
exports.default = router;
