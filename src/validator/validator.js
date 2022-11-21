const InternModel = require("../models/internmodel")
const CollModel = require("../models/collegemodel")

// validation for interns

const isValidName = (name) => {

    const nameRegex = /^[a-zA-Z]+$/.test(name)

}

const isValidEmail = (email) => {

    const emailRegex = /^[a-z0-9_]{3,}@[a-z]{3,}[.]{1}[a-z]{3,6}$/.test(email)

}

const isValidMobile = (mobile) => {

    const mobileRegex = /^[6-9]\d{9}$/.test(mobile)

}

// validation for colleges

exports.collValid = async (req, res, next) => {

    try {
        const collDetail = req.body
        let { name, fullName, logoLink } = { ...collDetail }

        if (Object.keys(collDetail) == 0) {
            return res
                .status(404)
                .send({ status: false, message: "Please enter college details" })
        }

        if (!name) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter college name" })
        }
        if (!fullName) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter full name of college" })
        }
        if (!logoLink) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter college logo link" })
        }

        let nameCheck = await CollModel.findOne({ name })
        let fnameCheck = await CollModel.findOne({ fullName })
        let logoCheck = await CollModel.findOne({ logoLink })
        if (nameCheck) {
            return res
                .status(400)
                .send({ status: false, message: "College name is already exist" })
        }
        if (fnameCheck) {
            return res
                .status(400)
                .send({ status: false, message: "College full name is already exist" })
        }
        if (logoCheck) {
            return res
                .status(400)
                .send({ status: false, message: "College logo link is already exist" })
        }
        next()
    }
    catch (error) {
        res.status(500).send({ message: error.message, status: false })
    }
}