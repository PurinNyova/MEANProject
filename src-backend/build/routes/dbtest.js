"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = __importDefault(require("../models/user.model"));
const router = (0, express_1.Router)();
router.get("/", async (request, response) => {
    try {
        const queriedUser = await user_model_1.default.find({});
        console.log("Main dbRoute Call");
        response.status(200).json({ success: true, ...queriedUser });
    }
    catch (error) {
        console.log("Error detected in dbtest get root", error.message);
        response.status(500).json({ success: false, message: "Internal server error" });
    }
});
router.get("/:param", async (request, response) => {
    const paramField = request.params.param;
    const queryValue = request.query.value;
    if (!queryValue) {
        response.status(400).json({ success: false, message: "Query value is required" });
        return;
    }
    try {
        const query = {};
        // Using regex for approximate, case-insensitive, partial match
        query[paramField] = { $regex: new RegExp(queryValue, 'i') };
        const queriedUser = await user_model_1.default.find(query);
        console.log(queriedUser);
        response.status(200).json({ success: true, ...queriedUser });
    }
    catch (error) {
        console.log("Error detected in dbtest get param", error.message);
        response.status(500).json({ success: false, message: "Internal server error" });
    }
});
router.post("/", async (request, response) => {
    const user = request.body;
    if (!user.name || !user.email || !user.npm || !user.kelas || !user.jurusan || !user.lokasiKampus || !user.tempatTanggalLahir || !user.kelamin || !user.alamat || !user.noHP || !user.email || !user.posisi || !user.lastIPK) {
        response.status(400).json({ response: 'Invalid Body: Is every required field populated?' });
    }
    const newUser = new user_model_1.default(user);
    if (newUser.Document === undefined) {
        newUser.Document = "no documents";
    }
    try {
        await newUser.save();
        response.status(201).json({ success: true, data: user });
    }
    catch (error) {
        console.error("Error in adding new user", error);
        response.status(500).json({ success: false, message: "there has been an error in adding new user" });
    }
});
exports.default = router;
