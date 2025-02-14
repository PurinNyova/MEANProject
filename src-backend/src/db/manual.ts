import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import readlineSync from "readline-sync";
import AdminSchema from "../models/admin.model";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/main_database');
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error: any) {
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

    const choice = readlineSync.question("\nEnter your choice: ");
    return choice;
};

const addAdmin = () => {
    const name = readlineSync.question("Enter name: ");
    const posisi = readlineSync.question("Enter posisi: ");
    const email = readlineSync.question("Enter email: ");
    const password = readlineSync.question("Enter password: ");

    const newUser = new AdminSchema({ name, posisi, email, password });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => console.log("Admin added:", user))
                .catch(err => console.log(err));
        });
    });
};

const listAdmins = async () => {
    const admins = await AdminSchema.find();
    console.log("\nAdmins:\n", admins);
};

const deleteAdmin = async () => {
    const admins = await AdminSchema.find();
    console.log("\nAdmins:\n", admins);

    const adminId = readlineSync.question("\nEnter the ID of the admin to delete: ");
    AdminSchema.findByIdAndDelete(adminId)
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
                console.log("Invalid");
        }
    }
};

main();
