const io = require( "socket.io" )();
const socketapi = {
    io: io
};
const userMsg = require('../models/chatModel');
const users = require('../models/userModel');

io.on('connection', async function (socket) {
    // console.log('a user connected', socket.id);
    const socketID = socket.id
    let userID;
    let User;
    socket.on('userId',async function(user){
      userID = user
      try {
        User = await users.findById(userID);
      } catch (error) {
        
      }
    });

    socket.on('msges', async (msges)=>{
      if(userID === msges.sender){
        try {
          const chat = await userMsg.findById(msges.chatID);
          const newMsg = {
            sender:msges.sender,
            receiver:msges.receiver,
            msg:msges.msg,
            senddate:new Date().toLocaleString()
          }
          await chat.chats.push(newMsg)
          await chat.save();
          io.emit(msges.receiver, newMsg);
        } catch (error) {
          
        }
      }
    })
   
  });


module.exports = socketapi;