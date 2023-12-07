const mongoose = require('mongoose');

const chatModel = new mongoose.Schema({
    among:Object,
    chats:Array,
    isread:{type:Boolean,default:true}
});

module.exports = mongoose.model('chat', chatModel);