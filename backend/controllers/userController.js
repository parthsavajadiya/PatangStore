import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateWebToken from '../utils/generateToken.js';
const authUsers = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const users = await User.findOne({ email })
    console.log(users);

    if (users && (await users.matchPassword(password))) {
        res.json({
            _id: users._id,
            name: users.name,
            email: users.email,
            isAdmin: users.isAdmin,
            token: generateWebToken(users._id),
        })
    } else {
        res.status(401)
        throw new Error("Invalid Email or Password")

    }

})

const ragisterUsers = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({ name, email, password })

    if (user) {

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateWebToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error("Invalid user Data")
    }

})




const getUserProfiles = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)


    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("InValid User Profile")
    }

})

export { authUsers, getUserProfiles, ragisterUsers }