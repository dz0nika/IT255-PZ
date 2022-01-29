const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const User = require("../models/user")

router.post("/signin", (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (result) {
                        return res.status(200).json({
                            message: "Login successfull!",
                            user: {
                                username: user[0].username,
                                email: user[0].email,
                                favList: user[0].favList
                            }
                        })
                    } else {
                        return res.json({
                            message: "Password incorrect!"
                        })
                    }
                })
            } else {
                return res.json({
                    message: "Email not found!"
                })
            }
        })
})

router.put("/update/favorite", (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                User.updateOne({email: req.body.email}, {favList: req.body.favList}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })

                return res.json({
                    message: "Successfully updated!"
                })
            } 
            return res.json({
                message: "Update failed!"
            })
        })
})

router.post("/signup", (req, res, next) => {

    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.json({
                    message: "Email already exists!"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            email: req.body.email,
                            favList: req.body.favList,
                            password: hash,
                        })
                        
                        user.save()
                            .then(result => {
                                console.log(result)
                                res.json({
                                    message: "Successfully registered!"
                                })
                            })
                            .catch(error => {
                                console.log(error)
                                res.status(500).json({
                                    error: error
                                })
                            })
                    }
                })
            }
        })
})

module.exports = router