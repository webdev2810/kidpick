const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    phone: String,
    password: String,
    age: String,
    dateOfBirth: Date,
    second_Phone: String,
    email: String,
    resedential_address: String,
    pinCode: String
});

// const mongoosePaginate = require('mongoose-paginate-v2')

// const userSchema = new Schema({
//     name: {
//         type: String
//     },
//     age: {
//         type: String
//     },
//     dateOfBirth: {
//         type: String
//     },
//     parentsPhone: {
//         type: String
//     },
//     GuardiansPhone: {
//         type: String
//     },
//     email: {
//         type: String
//     },
//     resedential_Address: {
//         type: String
//     },
//     pinCode: {
//         type: Number
//     },
//     avatar: {
//         type: String
//     }
// }, {timestamps: true})

// userSchema.plugin(mongoosePaginate)

const User = mongoose.model('User', UserSchema)
module.exports = User