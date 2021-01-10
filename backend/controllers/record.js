const Record = require("../models/records");

class recordController {
    createRecord = async (req, res) => {
        console.log(req.body)
        try {
            const record = await new Record({
                ...req.body,
                postedBy: req.body.patientsId ? req.body.patientsId : req.user
            });
            await record.save();
            return res.status(201).json({
                success: true,
                record
            })
        } catch (e) {
            throw new Error(e.message)
        }
    };
    getRecords = async (req, res) => {
        try {
            const records = await Record.find()
                .populate("postedBy", "phone fullName photo")
            return res.status(201).json({
                success: true,
                records
            })
        } catch (e) {
            throw new Error(e.message)
        }
    };

    getMyRecords = async (req, res) => {
        try {
            const records = await Record.find({postedBy: req.user._id})
                .populate("postedBy", "fullName photo")
            return res.status(201).json({
                records
            })
        } catch (e) {
            throw new Error(e.message)
        }
    }
    removeRecord = async (req, res) => {
        try {
            await Record.findById({_id: req.body._id})
            res.status(200).json({
                success: true
            })
        } catch (e) {
            throw new Error(e.message)
        }
    };
}


const recordsController = new recordController();

module.exports = {
    recordsController,
};
