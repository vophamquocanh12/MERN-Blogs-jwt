const { User, Token } = require('../model/model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const UserController = {
  signupUser: async (request, response) => {
    try {
      const hashedPassword = await bcrypt.hash(request.body.password, 10)

      const user = { username: request.body.username, name: request.body.name, password: hashedPassword }

      const newUser = new User(user)
      await newUser.save()
      response.status(200).json({
        message: 'Sign up successful!',
      })
    } catch (error) {
      response.status(500).json({
        errorMessage: 'Error while signing up user',
      })
    }
  },
  loginUser: async (request, response) => {
    let user = await User.findOne({ username: request.body.username })
    if (!user) {
      return response.status(400).json({ message: 'Username does not match' })
    }

    try {
      const match = await bcrypt.compare(request.body.password, user.password)
      console.log(match)
      if (match) {
        console.log('1');
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' })
        const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)

        const newToken = new Token({token: refreshToken})
        await newToken.save()
        
        response
          .status(200)
          .json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username })
      } else {
        response.status(400).json({ message: 'Password does not match' })
      }
    } catch (error) {
      response.status(500).json({ message: 'Error while login the user' })
    }
  },
}
module.exports = UserController
