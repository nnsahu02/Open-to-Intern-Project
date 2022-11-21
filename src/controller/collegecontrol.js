
const CollModel = require("../models/collegemodel")


exports.createCollege = async (req, res) => {

    try {

        let createData = await CollModel.create(req.body)

        res.status(201).send({ message: createData, status: true })
    }
    catch (error) {
        res.status(500).send({ message: error.message, status: false })
    }
}