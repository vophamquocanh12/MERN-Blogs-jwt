const { User } = require('../model/model')
const bcrypt = require('bcrypt')


const UserController = {
    signupUser: async (req, res) => {
        try {
            const {name, username, password, confirmPassword } = req.body
            const existUsername = await User.findOne({username})
            if(!name  || !password){
                res.status(400).json({
                    message: 'Missing name/username/password!'
                })
            }else if(!confirmPassword){
                res.status(400).json({
                    message: 'Missing confirm password'
                })
            }else if(existUsername){
                res.status(409).json({
                    message: 'Username already taken!'
                })
            }else if(password !== confirmPassword){
                res.status(401).json({
                    message: 'Confirm password do not match!'
                })
            }else{
                const salt = 10
                const hash = bcrypt.hashSync(req.password, salt)
                req.body.password = hash

                const user = new User(req.body)
                await user.save()
                res.status(201).json({
                    message: 'User sign up successfully!'
                })
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}
module.exports = UserController