const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { getContacts, addContact, updateContact, deleteContact } = require("../controllers/contactController");

router
    .route("/")
    .get( authMiddleware, getContacts );

router
    .route("/")
    .post( authMiddleware, addContact );

router
    .route("/:id")
    .put( authMiddleware, updateContact );

router
    .route("/:id")
    .delete( authMiddleware, deleteContact );

module.exports = router;