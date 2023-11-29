const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/telegramClone')
.then(()=>console.log('db Connected'))
.catch((err)=>console.log('db',err))