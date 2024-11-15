const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"],
    },
    lastName: {
        type: String,
        required: [true, "last name is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
    },
    phone: {
        type: Number,
        required: [true, "phone is required"],
    },
    company: {
        type: String,
        required: [true, "company is required"],
    },
    jobTitle: {
        type: String,
        required: [true, "job title message is required"],
    },
    createdBy: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('contacts', contactsSchema);