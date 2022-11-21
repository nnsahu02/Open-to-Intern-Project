const InternModel = require("../models/internmodel")


exports.createIntern = async (req, res) => {

    try {
        let internData = req.body
        let {name, email, mobile} = {...internData}
        let colName = internData.colName

        let createData = await InternModel.create()

        res.status(201).send({ message: createData, status: true })
    }
    catch (error) {
        res.status(500).send({ message: error.message, status: false })
    }
}


// exports.getCollegeDetail = 