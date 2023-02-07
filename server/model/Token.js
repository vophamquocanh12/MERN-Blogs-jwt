const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true  
    }
})

let Token = mongoose.model('Token', TokenSchema)
module.exports = Token