const io = require( "socket.io" )();
const socketapi = {
    io: io
};
const userMsg = require('../models/chatModel');
const users = require('../models/userModel');
let onlineUser = []

io.on('connection', async function (socket) {
    console.log('a user connected', socket.id);
    const socketID = socket.id
    let userID;
    let User;
    socket.on('userId',async function(user){
      userID = user
      onlineUser.push(user)
      console.log('user online', onlineUser)
      io.emit('online', onlineUser);
      try {
        User = await users.findById(userID);
        User.online = ture;
        await User.save();
      } catch (error) {
        
      }
      socket.on('disconnect',async (dis)=>{
        console.log('dissconcted', dis)
        onlineUser.forEach(function(check, i){
          if(check === userID){
            onlineUser.splice(i, 1);
          }
        });
        io.emit('online', onlineUser);
        User.online = false;
          await User.save();
      })
    });

    socket.on('msges', async (msges)=>{
      if(userID  == msges.sender){
        try {
          const chat = await userMsg.findById(msges.chatID);
          if (Object.values(chat.among).includes(msges.sender)) {
            
            let timeonly = new Date().toLocaleString().split(',')[1].split(':')
            const newMsg = {
              sender:msges.sender,
              receiver:msges.receiver,
              msg:msges.msg,
              senddate:new Date().toLocaleString().split(',')[0],
              sendtime:(timeonly[0]+':'+timeonly[1]+' '+ timeonly[2].split(' ')[1])
            }
            
            await chat.chats.push(newMsg);
            chat.isread = true; 
            await chat.save();
            io.emit(msges.receiver, msges);
          }
        } catch (error) {
          console.log(error)
        }
      }
    })
    socket.on('isread',async function(re){
      if(userID == re.usrID){
        try {
          const chat = await userMsg.findById(re.chatID);
          chat.isread = false;
          await chat.save();
        } catch (error) {
          console.log(error)
        }
      }
    })
    
   
  });


module.exports = socketapi;