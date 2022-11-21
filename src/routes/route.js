const express = require('express')
const router = express.Router()

const CollControl = require("../controller/collegecontrol")
const InternControl = require("../controller/interncontrol")
const ValidMid = require("../validator/validator")


router.post("/functionup/colleges", ValidMid.collValid, CollControl.createCollege)
router.post("/functionup/colleges", ValidMid.internValid, InternControl.createCollege)
router.get("/functionup/colleges",InternControl.getCollegeIntern)


module.exports = router