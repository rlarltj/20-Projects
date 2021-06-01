const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const currentYear = new Date().getFullYear();
const loading = document.getElementById('loading');
const newYearTime = new Date(`January 01 ${currentYear+1} 00:00:00`);

// Update countdown time
function updateCountDown(){
    const currentTime = new Date();
    const diff = newYearTime - currentTime;
    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;


   // Add values to DOM 
    days.innerHTML = d;
    hours.innerHTML = h > 10? h: '0' +h;
    minutes.innerHTML = m > 10 ? m : '0'+m;
    seconds.innerHTML = s> 10? s: '0'+s;
}

// Set background year
year.innerText  = currentYear + 1;

// Show spinner before countdown
setTimeout(()=>{
    loading.remove();
    countdown.style.display = 'flex';
}, 1000)

// Run every second
setInterval(updateCountDown, 1000);
