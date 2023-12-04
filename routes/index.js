var express = require('express');
var router = express.Router();

const nodemailer = require('nodemailer')
const userLogin = require('../models/userModel')
const storyModel = require('../models/storyModel')
const chatModel = require('../models/chatModel')
const passport = require('passport');
const localPassport = require('passport-local');
const socketApi = require('../utils/socketapi');
passport.use(new localPassport(userLogin.authenticate()))
let fs = require('fs');
require('dotenv').config();
 




/* GET home page. */
router.get('/', isLogedIn,async function(req, res, next) {
  const user = await req.user.populate('chats')
  const chats = await user.chats;
  // console.log( 'helo', chats);
  res.render('index',{chatL:chats, user:req.user});
});

router.get('/login', function(req, res, next) {
  let fMsg = ''
  let rMsg = ''
  let msg = req.session.messages
  req.session.messages = null;
  req.flash('error').forEach((msg)=>{
    fMsg = msg;
    // console.log(msg, 'msg')
  })
  req.flash('notFound').forEach((msg)=>{
    rMsg = msg
  })
  res.render('login',{msg:msg, fMsg:fMsg, rMsg:rMsg});
});

router.get('/profile', isLogedIn, function(req, res, next) {
  res.render('profile');
});
router.get('/chat/archive', function(req, res, next) {
  const chatL = chatList()
  let idNumber = req.params.chatID
  res.json({ idNumber:idNumber});
});
router.get('/chat/:chatID/:usrID',isLogedIn, async function(req, res, next) {
  try {
    if(req.params.chatID == req.params.usrID){
      const chatUser = await userLogin.findById(req.params.usrID);
      const mainUser = await userLogin.findById(req.user.id);
      const newChat = await chatModel({among:{
        usr1:req.user.id,
        usrname1:req.user.username,
        usr2:req.params.usrID,
        usrname2:chatUser.username,
      }});
      await mainUser.chats.push(newChat._id);
      await chatUser.chats.push(newChat._id);
      await Promise.all([mainUser.save(), chatUser.save(), newChat.save()]);
      console.log('id created')
      res.render('chatUi',{chatUser:chatUser, usrID:req.user.id, chatData:newChat})
    } else {
      const chatUser = await userLogin.findById(req.params.usrID)
      if(chatUser.chats.includes(req.params.chatID) && req.user.chats.includes(req.params.chatID)){
        const chatData = await chatModel.findById(req.params.chatID)
        res.render('chatUi',{chatUser:chatUser, usrID:req.user.id, chatData:chatData})
      } else{
        console.log('not allow');
        res.redirect('/');
      }
    }
    
  } catch (error) {
    console.log('e1:- ', error)
  }
  
});

router.post('/addMess/:idN',function(req, res, next){
  let chatL=[];
  const chatLists = chatList()
 try {
   
    chatL = JSON.parse(fs.readFileSync(`public/json/${req.params.idN}.json`,'utf-8'))
 } catch (error) {
  console.log(error)
 }
  console.log(req.params.idN);
  console.log(req.body)
  let newMsg;
  chatLists.forEach(element => {
    if(element.id == req.params.idN){
      newMsg = {
       senderId:"Ajay456",
       receiverId:element.name,
       timestamp:times,
       text:req.body.text,
       sent:true,
       delivered:false
     }
    }
  });
  chatL.push(newMsg);
  fs.writeFileSync(`public/json/${req.params.idN}.json`, JSON.stringify(chatL));
  res.redirect(`/chat/${req.params.idN}`)
  // res.json(chatL);
})

router.get('/frnd', isLogedIn,async function(req, res){
  try {
    const frnd = await userLogin.find()
    console.log(frnd);
  res.render('friendList.ejs',{user:req.user, frnd:frnd})
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

// sign up routes
router.post('/signup', async (req, res, next)=>{
  try {
    await userLogin.register({
      username:req.body.username,
      email:req.body.email
    },req.body.password);
    res.redirect('/login');
  } catch (error) {
    // console.log(error)
    // res.send(error);
    req.flash('error', error.message);
    // console.log(error.message, 'yehi hai')
    res.redirect('/login')
  }
  
});

router.post('/login', passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/login',
  failureMessage:true,
}), (req, res, next)=>{
  
})


// forgotPassword all rotes
router.post('/forgot', async (req, res, next)=>{
  try {
    const userF = await userLogin.findOne({email:req.body.email});
    if(!userF){
      req.flash('notFound', 'Email is not registered')
      res.redirect('/login')
    } else{
      const otp = Math.floor(1000 + Math.random()*9000);
      userF.genratedOtp = otp;
      await userF.save();
      sendOtpFunction(userF.email, otp, res)
      .then(()=>{
        let checkOtpMsg = ''
        req.flash('otpV').forEach(function(otp){
          checkOtpMsg = otp
        })
        res.render('otpPage', {useremail:userF, checkOtpMsg:checkOtpMsg})})
        .catch((error)=>{
          console.log(error);
          res.send(error)
        })
      // })
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})


// sendOtp function
async function sendOtpFunction(email, otp, res){
  const transport = nodemailer.createTransport({
    service:'gmail',
    host:'smpt.gmail.com',
    port:465,
    auth:{
      user:process.env.user,
      pass:process.env.pass
    }
  })
  const mailOptions = {
    from:`Telegram Clone <${process.env.user}>`,
    to:email,
    subject:'Reset password OTP',
    html:`<h1>Your OTP is:- ${otp}</h1>`
  };
  transport.sendMail(mailOptions, (error, info)=>{
    if(error){
      console.log(error),
      res.send(error)
    } else {
      // console.log(info)
      return;
    }
  })
}

router.post('/otpV/:id', async function(req, res){
  try {
    const userF = await userLogin.findById(req.params.id);
    if(!userF){
      req.flash('notFound', 'Email is not registered')
      res.redirect('/login')
    } else{
      if(userF.genratedOtp === +req.body.otp){
        userF.genratedOtp = -1;
        await userF.save();
        res.render('newPass', {useremail:userF})
      } else{
        res.render('otpPage', {useremail:userF, checkOtpMsg:'Wrong OTP'})
      }
    }
  } catch (error) {
    console.log('otp ', error)
  }
})





// logout routes
router.get('/logout', isLogedIn, function(req, res, next) {
  req.logOut(()=>{
    res.redirect('/login');
  })
});

// is login middleware
function isLogedIn(req, res, next){
  if(req.isAuthenticated()){
    
    next()
  } else{
    res.redirect('/login')
  }
}


module.exports = router;
