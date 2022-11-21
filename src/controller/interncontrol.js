
<<<<<<< HEAD
const CollegeModel = require('../models/collegemodel')
const InternModel = require("../models/internmodel")


exports.createIntern = async (req, res) => {
=======
const collegemodel = require ('../models/collegemodel')
const internmodel=require("../models/internmodel"
)

exports.createIntern =async (req, res) =>{
>>>>>>> 689259dc20401d4c1edbb4b6e4149639448bffef

    try {
        let internData = req.body
        let { name, email, mobile } = { ...internData }
        let colName = internData.collegeName;

        let createData = await CollegeModel.findOne({ name: colName })
        if (!colName) {
            return res
                .status(400)
                .send({ status: false, msg: "college dose not exist" })
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


exports.getCollegeIntern = async (req, res) => {
    try {
        const collegeName = req.query.collegeName
        if (!collegeName)
            return res
                .status(400)
                .send({ status: false, msg: "please send the collegeName from quires" })

        let collegeDetails = await CollegeModel.findOne({
            name: collegeName,
            isDeleted: false
        })
        if (!collegeDetails)
            return res
                .status(404)
                .send({ status: false, msg: "college not exist" })

        let objectOfCollegeDetails = collegeDetails.toObject()
        let { name, fullName, logoLink } = { ...objectOfCollegeDetails }

        let interDetails = await InternModel
            .find({ collegeId: collegeDetails._id, isDeleted: false })
            .select({ name: 1, email: 1, mobile: 1 })

        if (!interDetails[0]) {
            return res
                .status(404)
                .send({ Status: false, msg: "no  intern applied for this college" })
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