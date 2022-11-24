const InternModel = require("../models/internmodel")
const CollModel = require("../models/collegemodel")


//>---------------------------------------> validation functions <---------------------------------------<\\

const isValid = function (value) {
    if (typeof value === "string" && value.trim().length >= 1) return true
    if (typeof value === "undefined" || value === null) return false

}

//---------------------------------------------------------------------------------------------------------\\


//>------------------------------------------> REGEX functions <------------------------------------------<\\

const isValidName = (name) => {

    return /^[A-Za-z\s]{1,50}$/.test(name)
}
const isValidEmail = (email) => {

    return /^[a-z0-9_]{2,}@[a-z]{3,}.[com]{3}$/.test(email)
}
const isValidMobile = (mobile) => {

    return /^[6-9]\d{9}$/.test(mobile);
}
const isValidLogo = (logoLink) => {

    return /^(http[s]?:\/\/.*\.(?:png|jpeg))$/g.test(logoLink);
}

//---------------------------------------------------------------------------------------------------------\\


//>--------------------------------------> validation for colleges <--------------------------------------<\\

exports.collValid = async (req, res, next) => {

    try {
        const collDetail = req.body

        let name = collDetail.name.toLowerCase()
        let fullName = collDetail.fullName.toLowerCase()
        let logoLink = collDetail.logoLink

        if (Object.keys(collDetail).length == 0) {
            return res.status(400).send({ status: false, message: "Please enter college details" })
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


        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "Please enter college name" })
        }
        if (!isValid(fullName)) {
            return res.status(400).send({ status: false, message: "Please enter college full name" })
        }
        if (!isValid(logoLink)) {
            return res.status(400).send({ status: false, message: "Please enter college logo link" })
        }

        // using previously created REGEX functions ----

        let [Name, LogoLink] = [isValidName(name), isValidLogo(logoLink)]

        if (!Name) {
            return res.status(400).send({ status: false, message: "Please enter a valid college name" })
        }
        if (!LogoLink) {
            return res.status(400).send({ status: false, message: "Please enter a valid college logo link" })
        }

        // chicking details for uniqueness ----

        let nameCheck = await CollModel.findOne({ name: name })
        let fnameCheck = await CollModel.findOne({ fullName: fullName })
        let logoCheck = await CollModel.findOne({ logoLink: logoLink })

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
        return res.status(500).send({ status: false, message: error.message })
    }
}

//---------------------------------------------------------------------------------------------------------\\


//>---------------------------------------> validation for interns <--------------------------------------<\\

exports.internValid = async (req, res, next) => {

    try {
        const internDetail = req.body
        let collegeName = req.body.collegeName.toLowerCase()

        let { name, email, mobile } = { ...internDetail }

        if (Object.keys(internDetail) == 0) {
            return res.status(404).send({ status: false, message: "Please provide details" })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "Please enter student name" })
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Please enter student email" })
        }
        if (!isValid(mobile)) {
            return res.status(400).send({ status: false, message: "Please enter student mobile number" })
        }
        if (!isValid(collegeName)) {
            return res.status(400).send({ status: false, message: "Please enter college name" })
        }

        // using previously created REGEX functions ----

        let [Name, Mobile, Email, CollegeName] =
            [isValidName(name),
            isValidMobile(mobile),
            isValidEmail(email),
            isValidName(collegeName)]

        if (!Name) {
            return res.status(400).send({ status: false, message: "Please enter a valid name" })
        }
        if (!Mobile) {
            return res.status(400).send({ status: false, message: "Please enter a valid mobile" })
        }
        if (!Email) {
            return res.status(400).send({ status: false, message: "Please enter a valid email" })
        }
        if (!CollegeName) {
            return res.status(400).send({ status: false, message: "Please enter a valid college name" })
        }

        // checking for uniquness ----

        let emailCheck = await InternModel.findOne({ email })
        let mobileCheck = await InternModel.findOne({ mobile })

        if (emailCheck) {
            return res.status(400).send({ status: false, message: "This email is already exist" })
        }
        if (mobileCheck) {
            return res.status(400).send({ status: false, message: "This mobile number is already exist" })
        }
        next()
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//---------------------------------------------------------------------------------------------------------\\

