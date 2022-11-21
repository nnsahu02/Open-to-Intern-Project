
const CollegeModel = require('../models/collegemodel')
const InternModel = require("../models/internmodel")

// creating intern data

exports.createIntern = async (req, res) => {

    try {
        let internData = req.body
        let { name, email, mobile } = { ...internData }
        let colName = internData.college;

        let createData = await CollegeModel.findOne({ name: colName })
        if (!colName) {
            return res
                .status(400)
                .send({ status: false, message: "college dose not exist" })
        }

        let collegeId = createData["_id"]
        let toCreateIntern = { name, mobile, email, collegeId }

        let saveData = await InternModel.create(toCreateIntern)
        return res
            .status(201)
            .send({ message: saveData, status: true })
    }
    catch (error) {
        res.status(500).send({ message: error.message, status: false })
    }
}
