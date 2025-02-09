"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userDatabaseSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    npm: {
        type: String,
        required: true,
        unique: true
    },
    kelas: {
        type: String,
        required: true
    },
    jurusan: {
        type: String,
        required: true
    },
    lokasiKampus: {
        type: String,
        required: true
    },
    tempatTanggalLahir: {
        type: String,
        required: true
    },
    kelamin: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    noHP: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    posisi: {
        type: String,
        required: true
    },
    lastIPK: {
        type: Number,
        required: true
    },
    files: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});
const UserSchema = mongoose_1.default.model('User', userDatabaseSchema);
exports.default = UserSchema;
