const express = require('express')
const router = express.Router()

const CollControl = require("../controller/collegecontrol")
const InternControl = require("../controller/interncontrol")
const ValidMid = require("../validator/validator")


router.post("/functionup/colleges", ValidMid.collValid, CollControl.createCollege)
<<<<<<< HEAD
router.post("/functionup/colleges", ValidMid.internValid, InternControl.createCollege)
router.get("/functionup/colleges", InternControl.getCollegeIntern)
=======
router.post("/functionup/colleges", ValidMid.internValid, InternControl.createIntern)
router.get("/functionup/colleges",InternControl.getCollegeIntern)
>>>>>>> 689259dc20401d4c1edbb4b6e4149639448bffef


module.exports = router