
const CollegeModel = require('../models/collegemodel')
const InternModel = require("../models/internmodel")

// creating intern data

exports.createIntern = async (req, res) => {

    try {
        let internData = req.body
        let { name, email, mobile } = { ...internData }
        let clgName = internData.collegeName;

        let findclg = await CollegeModel.findOne({ name: clgName })
        if (!findclg) {
            return res.status(400).send({ status: false, message: "college dose not exist" })
        }

        let collegeId = findclg["_id"]
        let toCreateIntern = { name, mobile, email, collegeId }

        let saveData = await InternModel.create(toCreateIntern)
        return res.status(201).send({ status: true, data: saveData })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
