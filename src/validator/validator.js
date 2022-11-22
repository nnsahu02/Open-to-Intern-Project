const InternModel = require("../models/internmodel")
const CollModel = require("../models/collegemodel")


// validation functions

const isValid = function (value) {
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === "undefined" || value === null) return false
    return true;
};

// REGEX functions ----

const isValidName = (name) => {
    let nameRegex = /^[A-Za-z\s]{1,50}$/.test(name)
    return nameRegex
}
const isValidEmail = (email) => {
    let emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
    return emailRegex
}
const isValidMobile = (mobile) => {
    return /^[6-9]\d{9}$/.test(mobile);
};
const isValidLogo = (logoLink) => {
    const nameRegex = /^[a-zA-Z0-9!@#$&()`.:?=_;~(){}%^*+,/"-]*$/;
    return nameRegex.test(logoLink);
};


// validation for colleges

exports.collValid = async (req, res, next) => {

    try {
        const collDetail = req.body
        let { name, fullName, logoLink } = { ...collDetail }

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

        // using previously created REGEX functions ----

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

        if (Object.keys(internDetail) == 0) {
            return res
                .status(404)
                .send({ status: false, message: "Please provide details" })
        }
        if (!isValid(name)) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter student name" })
        }
        if (!isValid(email)) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter student email" })
        }
        if (!isValid(mobile)) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter student mobile number" })
        }
        if (!isValid(collegeName)) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter college name" })
        }

        // using previously created REGEX functions ----

        let [Name, Mobile, Email, CollegeName] =
            [isValidName(name),
            isValidMobile(mobile),
            isValidEmail(email),
            isValidName(collegeName)]

        if (!Name) return res
            .status(400)
            .send({ status: false, message: "Please enter a valid name" })

        if (!Mobile) return res
            .status(400).
            send({ status: false, message: "Please enter a valid mobile" })

        if (!Email) return res
            .status(400)
            .send({ status: false, message: "Please enter a valid email" })

        if (!CollegeName)
            return res
                .status(400)
                .send({ status: false, message: "Please enter a valid college name" })



        let emailCheck = await InternModel.findOne({ email })
        if (emailCheck) {
            return res
                .status(400)
                .send({ status: false, message: "This email is already exist" })
        }
        let mobileCheck = await InternModel.findOne({ mobile })
        if (mobileCheck) {
            return res
                .status(400)
                .send({ status: false, message: "This mobile number is already exist" })
        }
        next()
    }
    catch (error) {
        res.status(500).send({ message: error.message, status: false })
    }
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

        if (!isValid(name)) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter college name" })
        }
        if (!isValid(fullName)) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter full name of college" })
        }
        if (!isValid(logoLink)) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter college logo link" })
        }

        // using previously created REGEX functions ----

        let [Name, FullName, LogoLink] =
            [isValidName(name),
            isValidName(fullName),
            isValidLogo(logoLink)]

        if (!Name) return res
            .status(400)
            .send({ status: false, message: "Please enter a valid college name" })

        if (!FullName) return res
            .status(400)
            .send({ status: false, message: "Please enter a valid college full name" })

        if (!LogoLink) return res.status(400).send({ status: false, message: "Please enter a valid college logo link" })


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
