import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
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

const DocumentDB = mongoose.model('Document', DocumentSchema);

export default DocumentDB