
const collegeModel = require('../models/collegemodel')
const InternModel = require("../models/internmodel")


//>---------------------------------------> creating intern data <----------------------------------------<\\


exports.createIntern = async (req, res) => {

    try {
        let internData = req.body
        let { name, email, mobile } = { ...internData }
        let collegeName = internData.collegeName.toLowerCase();

        let findCollege = await collegeModel.findOne({ name: collegeName })
        if (!findCollege) {
            return res.status(404).send({ status: false, message: "Can not find this college !" })
        }

        let collegeId = findCollege["_id"]
        let toCreateIntern = { name, mobile, email, collegeId }

        let saveData = await InternModel.create(toCreateIntern)

        return res.status(201).send({ status: true, data: saveData })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//---------------------------------------------------------------------------------------------------------\\