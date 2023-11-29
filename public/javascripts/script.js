let times = new Date();


let equalTime = 0;

while (equalTime !== times.getMinutes()) {
    equalTime = times.getMinutes()
    if(times.getHours()> 12){

    
        if((times.getHours()-12)<10){
            if(times.getMinutes()<10){
                document.querySelector('.time').innerHTML =   "0"+(times.getHours()-12) + ":" + "0"+times.getMinutes() + " PM";
            }else{
                document.querySelector('.time').innerHTML =   "0"+(times.getHours()-12) + ":" + times.getMinutes() + " PM";
            }
        } else{
            document.querySelector('.time').innerHTML =  (times.getHours()) + ":" + times.getMinutes() + " PM";
        }
    } else {
        if((times.getHours())<10){
            if(times.getMinutes()<10){
                document.querySelector('.time').innerHTML =   "0"+(times.getHours()-12) + ":" + "0"+times.getMinutes() + " AM";
            }else{
                document.querySelector('.time').innerHTML =   "0"+(times.getHours()-12) + ":" + times.getMinutes() + " AM";
            }
        } else{
            document.querySelector('.time').innerHTML =  (times.getHours()) + ":" + times.getMinutes() + " AM";
        }
    }
}

// onclick="window.open('https://www.google.com', '_parent')"