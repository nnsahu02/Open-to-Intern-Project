const express = require('express')
const router = express.Router()

const CollControl = require("../controller/collegecontrol")
const InternControl = require("../controller/interncontrol")
const ValidMid = require("../validator/validator")


router.post("/functionup/colleges", ValidMid.collValid, CollControl.createCollege)
router.post("/functionup/interns", ValidMid.internValid, InternControl.createIntern)
router.get("/functionup/collegeDetails", CollControl.getCollegeIntern)


module.exports = router