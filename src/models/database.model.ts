import mongoose from "mongoose";

const userDatabaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    privilege: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

const UserSchema = mongoose.model('User', userDatabaseSchema);

export default UserSchema;