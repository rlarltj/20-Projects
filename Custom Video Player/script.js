const video = document.getElementById("video");
const play = document.getElementById("play");
const stopbtn = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// Play & pause video 
function toggleVideoStatus(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

// Update the play/pause icon
function updatePlayIcon(){
   if(video.paused){
       play.innerHTML = '<i class ="fa fa-play fa-2x"></i>';
   }else{
    play.innerHTML = '<i class= "fa fa-pause fa-2x"></i>';
   }
}

// Update the progress & timestamp
function updateProgress(){
    progress.value = (video.currentTime / video.duration) * 100;

    // Get mins, secs  
    let mins = Math.floor(video.currentTime / 60);
    let secs = Math.floor(video.currentTime % 60);
    if(mins < 10){
        mins = '0' + String(mins);
    }
    if(secs< 10){
        secs = '0' + String(secs);
    }


    timestamp.innerText = `${mins}:${secs}`
}

// Stop video
function stopVideo(){
    video.currentTime = 0;
    video.pause();
}
//  Set video time to progress
function setVideoProgress(){
    video.currentTime = (progress.value * video.duration) /100;
}



// Event listener
video.addEventListener("click", toggleVideoStatus)
video.addEventListener("pause", updatePlayIcon)
video.addEventListener("play", updatePlayIcon)
video.addEventListener("timeupdate", updateProgress)

play.addEventListener("click", toggleVideoStatus)
stopbtn.addEventListener("click", stopVideo)
progress.addEventListener("change", setVideoProgress)
