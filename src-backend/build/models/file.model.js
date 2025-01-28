"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DocumentSchema = new mongoose_1.default.Schema({
    cvPath: {
        type: String,
        required: true
    },
    krsPath: {
        type: String,
        required: true
    },
    pasFotoPath: {
        type: String,
        required: true
    },
    ktmPath: {
        type: String,
        required: true
    },
    ktpPath: {
        type: String,
        required: true
    },
    rangkumanNilaiPath: {
        type: String,
        required: true
    },
    certificatePath: {
        type: String,
        required: true
    }
});
const DocumentDB = mongoose_1.default.model('Document', DocumentSchema);
exports.default = DocumentDB;
