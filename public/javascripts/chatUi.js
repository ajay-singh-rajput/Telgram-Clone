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
const usrID = document.querySelector('#idContainer').getAttribute('usrid')
const frndID = document.querySelector('#idContainer').getAttribute('frndid')
const chatID = document.querySelector('#idContainer').getAttribute('chatid')
socket.emit('userId', usrID);

sendBtn.addEventListener('click',async function(){
    let msges = {
        sender:usrID,
        receiver:frndID,
        msg:messagesTextArea.textContent,
        chatID:chatID
    }
    await socket.emit('msges', msges);
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(''));
    li.innerHTML = `
    <span class="msgContain">${msges.msg}</span><br>
    <div class="msgTime"><i class="ri-check-double-fill"></i>${new Date().toLocaleTimeString()}</div>`
    li.setAttribute('class','msgS');
    chatUl.appendChild(li)
    messagesTextArea.textContent = ''
    chatUl.scrollBy(0,chatUl.clientHeight);
})


socket.on(usrID, async (newMsg)=>{
    if(newMsg.receiver === usrID && chatID === newMsg.chatID){
         const li = document.createElement('li')
         li.appendChild(document.createTextNode(''));
         li.innerHTML = `<span class="msgContain">${newMsg.msg}</span><br>
         <span class="msgTime">${new Date().toLocaleTimeString()}</span>`
         li.setAttribute('class', 'msgR');
         chatUl.appendChild(li);
         chatUl.scrollBy(0,chatUl.clientHeight);
    }
})







