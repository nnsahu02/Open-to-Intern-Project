const InternModel = require("../models/internmodel")


exports.createIntern = async (req, res) => {

    try {

        let createData = await InternModel.create(req.body)

        res.status(201).send({ message: createData, status: true })
    }
    catch (error) {
        res.status(500).send({ message: error.message, status: false })
    }
}
