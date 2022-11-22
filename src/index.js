const express = require('express')
const mongoose = require('mongoose')
const route = require("./routes/route")

const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://Adityakunta:IPSyBcf7uKmQrNcH@aditya.4payvyl.mongodb.net/?retryWrites=true&w=majority",

{ useNewUrlParser: true })

.then(() => console.log("MDB is connected"))
.catch(err => console.log(err))

app.use('/', route)

app.listen((process.env.PORT || 3000), () => console.log("Server is running !"))