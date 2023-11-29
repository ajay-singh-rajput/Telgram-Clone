const mongoose = require('mongoose');

const storyModel = new mongoose.Schema({
    typeofstatus:String,
    storydata:String,
    byuser:{
        type:mongoose.Schema.Types.ObjectId, ref:'userData'
    },
    createdAt: { type: Date, expires: 86400, default: Date.now }
});

module.exports = mongoose.model('story',storyModel);