const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        unique: true,
        trim : true
    },
    fullName: {
        type: String,
        require: true,
        unique: true
    },
    logoLink: {
        type: String,
        require: true,
        unique: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('college', collegeSchema)