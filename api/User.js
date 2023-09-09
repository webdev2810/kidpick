const express = require('express');
const router = express.Router();

// const UserController = require('../controllers/UserController')
// const upload = require('../middleware/upload')
// const authenticate = require('../middleware/authenticate')

// mongodb user model
const User = require('./../models/User');

//password handler
const bcrypt = require('bcrypt');

// router.get('/', authenticate, UserController.index)
// router.post('/show',UserController.show)
// router.post('/store', upload.array('avatar[]'), UserController.store)
// router.post('/update',UserController.update)
// router.post('/delete',UserController.destroy)

//Signup
router.post('/signup', (req, res) => {
    let {name, phone, password,age, dateOfBirth, second_Phone, email, resedential_address, pinCode} = req.body;
    name = name.trim();
    phone = phone.trim();
    password = password.trim();
    age = age.trim();
    dateOfBirth = dateOfBirth.trim();
    second_Phone = second_Phone.trim();
    email = email.trim();
    resedential_address = resedential_address.trim();
    pinCode = pinCode.trim();

    if (name == "" || phone == "" || password == "" || age == "" || dateOfBirth == "" || second_Phone == "" || email == "" || resedential_address == "" || pinCode == "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
    } else if (!/^[a-zA-Z]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        })
    }else if(!/^[0-9]*$/.test(phone) || phone.length != 10) {
        res.json({
            status: "FAILED",
            message: "Invalid Phone Number"
        })
    }else if(!/^[0-9]*$/.test(second_Phone) || second_Phone.length != 10) {
        res.json({
            status: "FAILED",
            message: "Invalid Phone Number"
        })
    } else if (!new Date(dateOfBirth).getTime()) {
        res.json({
            status: "FAILED",
            message: "Invalid date of birth entered"
        })
    } else if (password.length < 8) {
        res.json({
            status: "FAILED",
            message: "Password is too short"
        })
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: "FAILED",
            message: "Invalid Phone Number"
        })
    } else {
        //checking if user already exists
        User.find({phone}).then(result =>{
            if(result.length) {
                //A user already exist
                res.json({
                    status: "FAILED",
                    message: "This no. already exists"
                })
            }else {
                //try to create new user

                //password handling
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword =>{
                    const newUser = new User({
                        name,
                        phone,
                        password: hashedPassword,
                        age,
                        dateOfBirth,
                        second_Phone,
                        email,
                        resedential_address,
                        pinCode
                    });

                    newUser.save().then(result => {
                        res.json({
                            status: "SUCCESS",
                            message: "SignUp Successful",
                            data: result,
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "An error occured while saving user account!"
                        })
                    })
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while hashing password!"
                    })
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "This account already exist!"
            })
        })
    }
})



//Signin
router.post('/signin', (req, res) => {
    let { phone, password } = req.body;
    
    phone = phone.trim();
    password = password.trim();

    if (phone == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty credentials supplied!"
        })
    } else {
        // check if user exists
        User.find({phone}).then(data => {
        if (data.length) {
            //User exists
            const hashedPassword = data[0].password;
            bcrypt.compare(password, hashedPassword).then(result => {
                if (result) {
                    //password match
                    res.json({
                        status: "SUCCESS",
                        message: "Signin Successfully",
                        data: data
                    })
                }
            }).catch(err => {
                res.json({
                    status: "FAILED",
                    message: "Invalid Password"
                })
            })
        } else {
            res.json({
                status: "FAILED",
                message: "Invalid credentials entered!"
            })
        }
    }).catch(err => {
        res.json({
            status: "FAILED",
            message: "An error occured while checking for existing user!"
        })
    })
}
})

// // Update account
router.post('/update', (req, res) => {
    let userID = req.body.userID

    let updateData = {
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password,
        age: req.body.age,
        dateOfBirth: req.body.dateOfBirth,
        second_Phone: req.body.second_Phone,
        email: req.body.email,
        resedential_address: req.body.resedential_address,
        pinCode: req.body.pinCode,
    }

    User.findByIdAndUpdate(userID, {$set: updateData})
    .then(() => {
        res.json({
            message: 'User updated Successfully$'
        })
    })
    .catch(error => {
        res.json({
            message: '4An error Occured!'
        })
    })
})

// //Show the list of Users
router.get('/', (req, res) => {
    User.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: "An error occured"
        })
    })
})


module.exports = router;
