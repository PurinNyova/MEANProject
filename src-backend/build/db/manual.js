"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const readline_sync_1 = __importDefault(require("readline-sync"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
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
const menu = () => {
    console.log("\n1. Add Admin");
    console.log("2. List Admins");
    console.log("3. Delete Admin");
    console.log("4. Exit");
    const choice = readline_sync_1.default.question("\nEnter your choice: ");
    return choice;
};
const addAdmin = () => {
    const name = readline_sync_1.default.question("Enter name: ");
    const posisi = readline_sync_1.default.question("Enter posisi: ");
    const email = readline_sync_1.default.question("Enter email: ");
    const password = readline_sync_1.default.question("Enter password: ");
    const newUser = new admin_model_1.default({ name, posisi, email, password });
    bcryptjs_1.default.genSalt(10, (err, salt) => {
        bcryptjs_1.default.hash(newUser.password, salt, (err, hash) => {
            if (err)
                throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => console.log("Admin added:", user))
                .catch(err => console.log(err));
        });
    });
};
const listAdmins = async () => {
    const admins = await admin_model_1.default.find();
    console.log("\nAdmins:\n", admins);
};
const deleteAdmin = async () => {
    const admins = await admin_model_1.default.find();
    console.log("\nAdmins:\n", admins);
    const adminId = readline_sync_1.default.question("\nEnter the ID of the admin to delete: ");
    admin_model_1.default.findByIdAndDelete(adminId)
        .then(() => console.log("Admin deleted"))
        .catch(err => console.log(err));
};
const main = async () => {
    while (true) {
        const choice = menu();
        switch (choice) {
            case "1":
                addAdmin();
                break;
            case "2":
                await listAdmins();
                break;
            case "3":
                await deleteAdmin();
                break;
            case "4":
                console.log("Goodbye!");
                process.exit(0);
            default:
                console.log("Invalid choice, please try again.");
        }
    }
};
main();
