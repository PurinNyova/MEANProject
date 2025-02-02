import mongoose from "mongoose";

const adminDatabaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const AdminSchema = mongoose.model('Admin', adminDatabaseSchema);

export default AdminSchema;