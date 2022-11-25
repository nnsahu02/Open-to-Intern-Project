const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')
const route = require("./routes/route")

const app = express()

app.use(multer().any())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb+srv://Adityakunta:IPSyBcf7uKmQrNcH@aditya.4payvyl.mongodb.net/?retryWrites=true&w=majority",

    { useNewUrlParser: true })

    .then(() => console.log("MDB is connected"))
    .catch(err => console.log(err))

app.use('/', route)

app.listen((process.env.PORT || 3001), () => console.log("Server is running !"))