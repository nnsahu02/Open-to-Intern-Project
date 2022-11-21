const express = require('express')
const mongoose = require('mongoose')
const route = require("./routes/route")

const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://lonemohsin33:Diabetes7889%40@functionup.aq5cty2.mongodb.net/Project2",

{ useNewUrlParser: true })

.then(() => console.log("MDB is connected"))
.catch(err => console.log(err))

app.use('/', route)

app.listen((process.env.PORT || 3000), () => console.log("Server is running !"))