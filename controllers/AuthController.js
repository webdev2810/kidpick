// const Acc = require('../models/Acc')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// const register = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
//         if(err) {
//             res.json({
//                 error: err
//             })
//         }

//         let acc = new Acc ({
//             name: req.body.name,
//             phone: req.body.phone,
//             email: req.body.email,
//             password: hashedPass
//         })
//         acc.save()
//         .then(acc => {
//             res.json({
//                 message: 'Account added Successfully'
//             })
//         })
//         .catch(error => {
//             res.json({
//                 message: 'An error Occured!'
//             })
//         })
//     })

    
// }

// const login = (req, res, next) => {
//     var username = req.body.username
//     var password = req.body.password

//     Acc.findOne({$or: [{email:username}, {phone:username}]})
//     .then(acc => {
//         if(acc){
//             bcrypt.compare(password, acc.password, function(err, result) {
//                 if(err) {
//                     res.json({
//                         error: err
//                     })
//                 }
//                 if(result){
//                     let token = jwt.sign({name: acc.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME})
//                     let refreshtoken = jwt.sign({name: acc.name}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME})
//                     res.status(200).json({
//                         message: 'Login Successful!',
//                         token,
//                         refreshtoken
//                     })
//                 }else{
//                     res.status(200).json({
//                         message: 'Incorrect Password!'
//                     })
//                 }
//             })
//         }else{
//             res.status(200).json({
//                 message: 'No user found!'
//             })
//         }
//     })
// }

// const refreshToken = (req, res, next) => {
//      const refreshToken = req.body.refreshToken
//      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function(err, decode){
//         if(err) {
//             res.status(400).json({
//                 err
//             })
//         }
//         else {
//             let token = jwt.sign( {name: decode.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME})
//             let refreshToken= req.body.refreshToken
//             res.status(200).json({
//                 message: "Token refreshed successfully!",
//                 token,
//                 refreshToken
//             })
//         }
//      })

// }

// module.exports ={
//     register, login, refreshToken
// }