let dpTxt = document.querySelectorAll('.dpTxt');
const socket = io();
const usrID = document.querySelector("#idContain").getAttribute('ids')
socket.emit('userId', usrID)
function colorChange() {

    return dpTxt.forEach(function (elem) {
        let ran = Math.floor(Math.random() * 10);
        if (ran === 1) {
            elem.style.background = `linear-gradient(to right top, #554DDE, #59D3FC, #554DDE)`
            elem.style.color = "#505050"
        } else if (ran === 2) {
            elem.style.background = `linear-gradient(to right top, #991CD1, #D4307A, #991CD1)`
            elem.style.color = "aqua"
        } else if (ran === 3) {
            elem.style.background = `linear-gradient(to right top, #124699, #D4307A, #124699)`
            elem.style.color = "yellow"
        } else if (ran === 4) {
            elem.style.background = `linear-gradient(to right top, #ffafbd, #ffc3a0, #ffafbd)`
        } else if (ran === 5) {
            elem.style.background = `linear-gradient(to right top, #2193b0, #6dd5ed, #2193b0)`
        } else if (ran === 6) {
            elem.style.background = `linear-gradient(to right top, #ee9ca7, #ffdde1, #ee9ca7)`
        } else if (ran === 7) {
            elem.style.background = `linear-gradient(to right top, #2c3e50, #bdc3c7, #2c3e50)`
            elem.style.color = "yellow"
        } else if (ran === 8) {
            elem.style.background = `linear-gradient(to right top, #de6262, #ffb88c, #de6262)`
        } else if (ran === 9) {
            elem.style.background = `linear-gradient(to right top, #48b1bf, #06beb6, #48b1bf)`
            elem.style.color = "#fff"
        }

    })
}

colorChange();

let menu = document.querySelector('.menu');
let option = document.querySelector('.options');
let closeD = document.querySelector('.closeD');

menu.addEventListener("click", function () {
    option.style.left = "0%"
})
closeD.addEventListener('click', function () {
    option.style.left = "-100%"

})

let chats = document.querySelector(".chats")
let stories = document.querySelector(".stories")
let chatList = document.querySelector("#chatList")
let storyDiv = document.querySelector("#storyDiv")
let pencil = document.querySelector(".pencil")
try {
    chats.addEventListener("click", function(){
        chats.style.color = '#fff'
        chats.style.fontWeight = '500'
        stories.style.fontWeight = '100'
        stories.style.color = '#404040'
        // chatList.style.visibility = "visible"
        chatList.setAttribute('class','chatList')
        storyDiv.setAttribute('class','storyDiv')
        pencil.innerHTML = `<a href="/frnd"><i class="ri-chat-new-line"></i></a>`
    }) 
    stories.addEventListener("click", function(){
        chats.style.color = '#404040'
        stories.style.color = '#fff'
        chats.style.fontWeight = '100'
        stories.style.fontWeight = '500'
        chatList.setAttribute('class','storyDiv')
        storyDiv.setAttribute('class','chatList')
        pencil.innerHTML = `<a href="/storyUpload"><i class="ri-image-add-fill"></i></a>`
    })
} catch (error) {
    
}


let addArrow = document.querySelector('.addArrow');
let profileULList = document.querySelector('.profileULList');
let arrowCheck = 0;
addArrow.addEventListener('click', function(){
    if(arrowCheck === 0){
        addArrow.style.transform = "rotate(180deg)" ;
        profileULList.style.height = "fit-content"
        arrowCheck = 1;
        } else{
            addArrow.style.transform = "rotate(0deg)"
            profileULList.style.height = "0px"
            arrowCheck = 0;
    }
})

const allLi = document.querySelectorAll('.chatLI')
socket.on('online',function(online){
    const onlines = online;
    allLi.forEach(function(isOn){
        if(onlines.includes(isOn.getAttribute('chatusr'))){
            isOn.querySelector('.online').setAttribute('class', 'online true')
        } else {
            isOn.querySelector('.online').setAttribute('class', 'online')
        }
    })
})

socket.on(usrID, async (newMsg)=>{
    allLi.forEach(function(msg){
        if(newMsg.sender === msg.getAttribute('chatusr')){
            msg.querySelector('.sepmsg').textContent = newMsg.msg
            msg.querySelector('.sepmsg').style.color = 'royalblue';
            msg.style.background = '#00FFFF';
            msg.querySelector('.tik').innerHTML = ''
            msg.querySelector('.msgRece').style.display = 'flex'
        }
    })
})




// const dialog = document.querySelector("dialog");
const showButton = document.querySelectorAll('.storyLi');
// const closeButton = document.querySelector(".closed");

// "Show the dialog" button opens the dialog modally
showButton.forEach(function(elem){
    elem.addEventListener("click", () => {
    //   dialog.showModal();
      elem.querySelector('dialog').showModal();
      elem.querySelector('.closed').addEventListener("click", () => {
        console.log('close')
        elem.querySelector('dialog').close();
    });
    });
})

// "Close" button closes the dialog
