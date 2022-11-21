const InternModel = require("../models/internmodel")
const CollModel = require("../models/collegemodel")

// validation functions

const isValidName = (name) => {
    if (typeof name == 'undefined' || name == 'null')
        return false

    let nameRegCheck = /^[a-zA-Z]+$/.test(name)
    if (nameRegCheck == true)
        return true

    if (typeof name == 'string' && name.trim().length >= 1)
        return true
}
const isValidEmail = (email) => {
    if (typeof email == 'undefined' || email == 'null')
        return false

    let mailRegCheck = /^[a-z0-9_]{3,}@[a-z]{3,}[.]{1}[a-z]{3,6}$/.test(email)
    if (mailRegCheck == true)
        return true

    if (typeof email == 'string' && email.trim().length >= 1)
        return true
}
const isValidMobile = (mobile) => {
    if (typeof mobile == 'undefined' || mobile == 'null')
        return false

    let mobRegCheck = /^[6-9]\d{9}$/.test(mobile)
    if (mobRegCheck == true)
        return true

    if (typeof mobile == 'string' && mobile.trim().length >= 1)
        return true
}
const isValidLogo = (logoLink) => {
    if (typeof logoLink == 'undefined' || logoLink == 'null')
        return false

    let linkRegCheck = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(logoLink)
    if (linkRegCheck == true)
        return true

    if (typeof logoLink == 'string' && logoLink.trim().length >= 1)
        return true
}


// validation for colleges

exports.collValid = async (req, res, next) => {

    try {
        const collDetail = req.body
        let { name, fullName, logoLink } = { ...collDetail }

        if (Object.keys(collDetail) == 0) {
            return res.status(404).send({ status: false, message: "Please enter college details" })
        }

        if (!name) {
            return res.status(400).send({ status: false, message: "Please enter college name" })
        }

        if (!fullName) {
            return res.status(400).send({ status: false, message: "Please enter full name of college" })
        }

        if (!logoLink) {
            return res.status(400).send({ status: false, message: "Please enter college logo link" })
        }

        let [Name, FullName, LogoLink] = [isValidName(name), isValidName(fullName), isValidLogo(logoLink)]

        if (!Name)
            return res.status(400).send({ status: false, message: "Please enter a valid college name" })

        if (!FullName)
            return res.status(400).send({ status: false, message: "Please enter a valid college full name" })

        if (!LogoLink)
            return res.status(400).send({ status: false, message: "Please enter a valid college logo link" })


        let nameCheck = await CollModel.findOne({ name })
        let fnameCheck = await CollModel.findOne({ fullName })
        let logoCheck = await CollModel.findOne({ logoLink })
        if (nameCheck) {
            return res.status(400).send({ status: false, message: "College name is already exist" })
        }
        if (fnameCheck) {
            return res.status(400).send({ status: false, message: "College full name is already exist" })
        }
        if (logoCheck) {
            return res.status(400).send({ status: false, message: "College logo link is already exist" })
        }
        next()
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

// validation for interns

exports.internValid = async (req, res, next) => {

    try {
        const internDetail = req.body
        let { name, email, mobile, collegeName } = { ...internDetail }

        if (Object.keys(internDetail).length == 0) {
            return res.status(404).send({ status: false, message: "Please enter student details" })
        }
        if (!name) {
            return res.status(400).send({ status: false, message: "Please enter student name" })
        }
        if (!email) {
            return res.status(400).send({ status: false, message: "Please enter student email" })
        }
        if (!mobile) {
            return res.status(400).send({ status: false, message: "Please enter student mobile number" })
        }
        if (!collegeName) {
            return res.status(400).send({ status: false, message: "Please enter college name" })
        }

        let [Name, Mobile, Email, CollegeName] = [isValidName(name), isValidMobile(mobile), isValidEmail(email), isValidName(collegeName)]


        if (!Name) return res.status(400).send({ status: false, message: "Please enter a valid name" })

        if (!Mobile) return res.status(400).send({ status: false, message: "Please enter a valid mobile" })

        if (!Email) return res.status(400).send({ status: false, message: "Please enter a valid email" })

        if (!CollegeName) return res.status(400).send({ status: false, message: "Please enter a valid college name" })


        let emailCheck = await InternModel.findOne({ email })
        if (emailCheck) {
            return res.status(400).send({ status: false, message: "This email is already exist" })
        }

        let mobileCheck = await InternModel.findOne({ mobile })
        if (mobileCheck) {
            return res.status(400).send({ status: false, message: "This mobile number is already exist" })
        }
        next()
    }
    catch (error) {
        res.status(500).send({ message: error.message, status: false })
    }
}