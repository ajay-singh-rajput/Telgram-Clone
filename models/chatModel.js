const mongoose = require('mongoose');

const chatModel = new mongoose.Schema({
    among:Object,
    chats:Array
    // [{
    //     sender:String,
    //     receiver:String,
    //     msg:String,
    //     isread:Boolean,
    //     senddate:Date,
    //     readdate:Date,
    //     isreceive:Boolean
    // }]
});

module.exports = mongoose.model('chat', chatModel);