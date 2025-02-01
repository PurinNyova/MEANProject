import mongoose from "mongoose";

const userDatabaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    npm: {
        type: Number,
        required: true
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

const UserSchema = mongoose.model('User', userDatabaseSchema);

export default UserSchema;