let messagesTextArea = document.querySelector('.messagesTextArea')
let hideI1 = document.querySelector('.hideI1')
let hideI2 = document.querySelector('.hideI2')
let sendBtn = document.querySelector('.sendBtn')
messagesTextArea.addEventListener("keydown", function (event) {
    setTimeout(function(){
        if((messagesTextArea.value).length > 0){
            hideI1.style.display = "none"
            hideI2.style.display = "none"
            sendBtn.style.display = "initial"
        } else {
            hideI1.style.display = "initial"
            hideI2.style.display = "initial"
            sendBtn.style.display = "none"
        }
    },0)
});
let chatUl = document.querySelector('.chatUl') 
chatUl.scrollBy(0,chatUl.clientHeight)

// socket

const socket = io();
const usrID = document.querySelector('#idContainer').getAttribute('userid')
// console.log(usrID)
const frndID = document.querySelector('#idContainer').getAttribute('frndid')
const chatID = document.querySelector('#idContainer').getAttribute('chatid')
socket.emit('userId', usrID);

sendBtn.addEventListener('click',async function(){
    let timeonly = new Date().toLocaleString().split(',')[1].split(':')
    let msges = {
        sender:usrID,
        receiver:frndID,
        msg:messagesTextArea.value,
        chatID:chatID,
        sendtime:(timeonly[0]+':'+timeonly[1]+' '+ timeonly[2].split(' ')[1]),
        senddate:new Date().toLocaleString().split(',')[0],
    }
    console.log(messagesTextArea.value, 'enter')
    await socket.emit('msges', msges);
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(''));
    li.innerHTML = `
    <span class="msgContain">${msges.msg}</span><br>
    <div class="msgTime"></i>Today ${(timeonly[0]+':'+timeonly[1]+' '+ timeonly[2].split(' ')[1])}</div>`
    li.setAttribute('class','msgS');
    chatUl.appendChild(li)
    messagesTextArea.value = ''
    chatUl.scrollBy(0,chatUl.clientHeight);
})


socket.on(usrID, async (newMsg)=>{
    if(newMsg.receiver === usrID && chatID === newMsg.chatID){
        console.log(newMsg, 'msg')
         const li = document.createElement('li')
         li.appendChild(document.createTextNode(''));
         li.innerHTML = `<span class="msgContain">${newMsg.msg}</span><br>
         <span class="msgTime">Today ${newMsg.sendtime}</span>`
         li.setAttribute('class', 'msgR');
         chatUl.appendChild(li);
         chatUl.scrollBy(0,chatUl.clientHeight);
    }
})


socket.on('online', function(online){
    const onlines = online
    console.log(online)
    if(onlines.includes(frndID)){
        document.querySelector('.navStatus').textContent = 'Online'
    } else {
        document.querySelector('.navStatus').textContent = ''
    }
})

chatUl.scrollBy(0,chatUl.clientHeight);








