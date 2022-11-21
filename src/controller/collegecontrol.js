
const CollegeModel = require("../models/collegemodel")
const InternModel = require("../models/internmodel")

// creating colleges data

exports.createCollege = async (req, res) => {

    try {

        let createData = await CollegeModel.create(req.body)

        res.status(201).send({ message: createData, status: true })
    }
    catch (error) {
        res.status(500).send({ message: error.message, status: false })
    }
}

// searching colleges 

exports.getCollegeIntern = async (req, res) => {
    try {
        const collegeName = req.query.collegeName
        if (!collegeName)
            return res
                .status(400)
                .send({ status: false, message: "please send the collegeName from quires" })

        let collegeDetails = await CollegeModel.findOne({
            name: collegeName,
            isDeleted: false
        })
        if (!collegeDetails)
            return res
                .status(404)
                .send({ status: false, message: "college not exist" })

        let objectOfCollegeDetails = collegeDetails.toObject()
        let { name, fullName, logoLink } = { ...objectOfCollegeDetails }

        let interDetails = await InternModel
            .find({ collegeId: collegeDetails._id, isDeleted: false })
            .select({ name: 1, email: 1, mobile: 1 })

        if (!interDetails[0]) {
            return res
                .status(404)
                .send({ Status: false, message: "no  intern applied for this college" })
        }
        let internOf_a_college = {
            name,
            fullName,
            logoLink,
            inter: interDetails
        }

        return res
            .status(200)
            .send({ status: true, data: internOf_a_college })

    } catch (error) {
        res.status(500).send({ message: error.message, status: false })
    }
}