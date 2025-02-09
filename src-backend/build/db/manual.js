"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_model_1 = __importDefault(require("../models/admin.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect('mongodb://localhost:27017/main_database');
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};
connectDB();
const newUser = new admin_model_1.default({
    name: "purinnyova",
    posisi: "admin",
    email: "purinnyova@fuckhead.com",
    password: "123456"
});
bcryptjs_1.default.genSalt(10, (err, salt) => {
    bcryptjs_1.default.hash(newUser.password, salt, (err, hash) => {
        if (err)
            throw err;
        newUser.password = hash;
        newUser.save()
            .then(user => console.log(user))
            .catch(err => console.log(err));
    });
});
