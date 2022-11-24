const express = require('express')
const router = express.Router()



const ValidMid = require("../validator/validator")

const CollegeControl = require("../controller/collegecontrol")

const InternControl = require("../controller/interncontrol")


// CREATING COLLEGE
router.post("/functionup/colleges", ValidMid.collValid, CollegeControl.createCollege)

// CREATING INTERN
router.post("/functionup/interns", ValidMid.internValid, InternControl.createIntern)

// GETING COLLEGE DETAILS
router.get("/functionup/collegeDetails", CollegeControl.getCollegeIntern)



module.exports = router