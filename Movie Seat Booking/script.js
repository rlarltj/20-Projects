const container = document.querySelector(".container");
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;
// +는 parseInt와 마찬가지로 string을 int로 변환한다.

populateUI();

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


// Update total & count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatsCount = selectedSeats.length
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount*ticketPrice;

    // Copy selected seats into array
    // Map through array
    // return a new array index
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    // map은 새로운 변수의 선언이 필요하며 foreach와 다르게 배열을 반환한다.
    console.log(seatsIndex);

}

// movie click event
movieSelect.addEventListener('change', e =>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})


// Seat click event
container.addEventListener('click', (e) =>{
   if (e.target.classList.contains('seat') &&
    (!e.target.classList.contains('occupied'))){
       e.target.classList.toggle('selected');
       updateSelectedCount(e);
   }  
})

//Get data from localstorage and populate UI 
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== 'null' && selectedSeats.length > 0){
        seats.forEach((seat, index) =>{
            if(selectedSeats.indexOf(index)> -1){
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Initial count and total set
updateSelectedCount();