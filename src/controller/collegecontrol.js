
const CollegeModel = require("../models/collegemodel")
const InternModel = require("../models/internmodel")


// creating colleges data

exports.createCollege = async (req, res) => {

    try {

        let bodyData = req.body
        let lowerName = bodyData.name.toLowerCase()
        let lowerFullName = bodyData.fullName.toLowerCase()

        req.body.name = lowerName
        req.body.fullName = lowerFullName

        let createData = await CollegeModel.create(req.body)

        res.status(201).send({ status: true, message: createData })
    }
    catch (error) {
        res.status(500).send({ status: false, msg : "coming from controller", message: error.message })
    }
}

// getting college details with interns 

exports.getCollegeIntern = async (req, res) => {
    try {
        const collegeName = req.query.collegeName
        if (!collegeName)
            return res
                .status(400)
                .send({ status: false, message: "Please enter a college name in quires" })

        let collegeDetails = await CollegeModel.findOne(
            {
                $or: [
                    { name: collegeName },
                    { fullName: collegeName }],
                isDeleted: false
            })
        if (!collegeDetails)
            return res
                .status(404)
                .send({ status: false, message: "Can not find this college !" })

        let objectOfCollegeDetails = collegeDetails.toObject()
        let { name, fullName, logoLink } = { ...objectOfCollegeDetails }

        let interDetails = await InternModel
            .find({ collegeId: collegeDetails._id, isDeleted: false })
            .select({ name: 1, email: 1, mobile: 1 })

        if (!interDetails[0]) {
            return res
                .status(404)
                .send({ Status: false, message: "No intern applied for this college" })
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
