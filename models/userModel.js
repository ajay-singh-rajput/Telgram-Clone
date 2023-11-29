const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const userModel = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'username is required'],
        unique:[true, 'username already exist'],
        minLength:[4, 'username field must have atleast 4 character']
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        required:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:String,
    chats:[{type:mongoose.Schema.Types.ObjectId, ref:'chat'}],
    story:[{type:mongoose.Schema.Types.ObjectId, ref:'story'}],
    genratedOtp:{
        type:Number,
        default:-1
    },
    online:Boolean,
    dp:{
        type:String,
        default:'false'
    }
})
userModel.plugin(plm)
module.exports = mongoose.model('userData', userModel);