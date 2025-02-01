import AdminSchema from "../models/admin.model";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

const newUser = new AdminSchema({
    name: "fuckhead",
    posisi: "ground",
    email: "fuckhead@fckhead.com",
    password: "123456"
});


bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
            .then(user => console.log(user))
            .catch(err => console.log(err));
    });
});
