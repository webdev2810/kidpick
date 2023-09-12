const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const dotenv = require('dotenv')
dotenv.config()

const UserRoute = require('./api/User');
// const AuthRoute = require('./api/auth')

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error' , (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established!')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 3000

//cors
// const cors = require("cors");
// app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/user', UserRoute)
// app.use('/api', AuthRoute)