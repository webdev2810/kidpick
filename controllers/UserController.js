// const { response } = require('express')
// const User = require('../models/User')

// //Show the list of Users
// const index = (req, res, next) => {
//     User.paginate({}, { page: req.query.page, limit: req.query.limit })
//     .then(data => {
//         res.status(200).json({
//             data
//         })
//     })
//     .catch(error => {
//         res.status(400).json({
//             error
//         })
//     })
// }

// //Show single user
// const show = (req, res, next) => {
//     let userID = req.body.userID
//     User.findById(userID)
//     .then(response => {
//         res.json({
//             response
//         })
//     })
//     .catch(error => {
//         res.json({
//             message: '2An error Occured!'
//         })
//     })
// }

// ///Add new User account
// const store = (req, res, next) => {
//     let user = new User({
//         name: req.body.name,
//         age: req.body.age,
//         dateOfBirth: req.body.dateOfBirth,
//         parentsphone: req.body.parentsPhone,
//         GuardiansPhone: req.body.GuardiansPhone,
//         email: req.body.email,
//         resedential_Address: req.body.resedential_Address,
//         pinCode: req.body.pinCode
//     })
//     if(req.files) {
//         let path = ''
//         req.files.forEach(function(files, index, arr){
//             path = path + files.path + ','
//         })
//         path = path.substring(0, path.lastIndexOf(","))
//         user.avatar = path
//     }

//     user.save().then(response => {
//         res.json({
//             message: 'Signup Successfully$'
//         })
//     })
//     .catch(error => {
//         res.json({
//             message: '3An error Occured!'
//         })
//     })
// }

// // Update account
// const update = (req, res, next) => {
//     let userID = req.body.userID

//     let updateData = {
//         name: req.body.name,
//         phone: req.body.phone,
//         password: req.body.password,
//         age: req.body.age,
//         dateOfBirth: req.body.dateOfBirth,
//         second_Phone: req.body.second_Phone,
//         email: req.body.email,
//         resedential_address: req.body.resedential_address,
//         pinCode: req.body.pinCode,
//     }

//     User.findByIdAndUpdate(userID, {$set: updateData})
//     .then(() => {
//         res.json({
//             message: 'User updated Successfully$'
//         })
//     })
//     .catch(error => {
//         res.json({
//             message: '4An error Occured!'
//         })
//     })
// }

// // Delete an account 
// const destroy = (req, res, next) => {
//     let userID = req.body.userID
//     User.findOneAndRemove(userID)
//     .then(() => {
//         res.json({
//             message: 'Account deleted Successfully'
//         })
//     })
//     .catch(error => {
//         res.json({
//             message: '5An error Occured!'
//         })
//     })
// }

// module.exports = {
//     index,show,store,update,destroy
// }