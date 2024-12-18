const contactsModel = require("../models/contactsModel");
const userModel = require("../models/userModel");

exports.getContacts = async (req,res) => {
    try{
        const user = await userModel.findOne({ _id: req.body.id});
        if(!user){
            res.status(401).json({
                status: "false",
                message: "unauthorized access."
            })
        }

        const page = parseInt(req.query.page) || 1;    // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
        const skip = (page - 1) * limit;

        const data = await contactsModel.find({ createdBy: user._id }).skip(skip).limit(limit);        
        const totalContacts = await contactsModel.countDocuments({ createdBy: user._id });
        res.status(200).json({
            status: "Success",
            message: "Contacts fetched successfully.",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            data,
            totalContacts
        });

    } catch(err){
        res.status(500).json({
            status: "false",
            message: err.message
        });
    }
}

exports.addContact = async (req,res) => {
    try{
        const user = await userModel.find({ _id: req.body.id });
        if(!user){
            res.status(401).json({
                status: "false",
                message: "unauthorized access."
            })
        }

        req.body.createdBy = req.body.id;
        const newContact = await contactsModel.create(req.body);
        res.status(201).json({
            status: "Success",
            message: "Contact added successfully.",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            data: newContact
        });
    } catch(err){
        res.status(500).json({
            status: "false",
            message: err.message
        });
    }
}

exports.updateContact = async (req,res) => {
    try{
        const user = await userModel.find({ _id: req.body.id });
        if(!user){
            res.status(401).json({
                status: "false",
                message: "unauthorized access."
            })
        }

        const { id } = req.params;
        const updateData = req.body;

        await contactsModel.findOneAndUpdate({ _id: id }, { $set: updateData });
        res.status(201).json({
            status: "Success",
            message: "Contact updated successfully.",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
        });

    } catch(err){
        res.status(500).json({
            status: "false",
            message: err.message
        });
    }
}

exports.deleteContact = async (req,res) => {
    try{
        const user = await userModel.find({ _id: req.body.id });
        if(!user){
            res.status(401).json({
                status: "false",
                message: "unauthorized access."
            })
        }

        const { id } = req.params;

        await contactsModel.findOneAndDelete({ _id: id });
        res.status(202).json({
            status: "Success",
            message: "Contact deleted successfully.",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
        });
    } catch(err){
        res.status(500).json({
            status: "false",
            message: err.message
        });
    }
}