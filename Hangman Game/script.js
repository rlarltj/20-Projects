const wordEL = document.getElementById('word');
const wrongLetterEL = document.getElementById('wrong-letter');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll(".figure-part");
const words =  ['application', 'programming', 'interface', 'kiseo', 'lynn', 'wizard', 'happiness', 'starbucks', 'coffee', 'cellphone', 'airpod', 'javascript'];

let selectedWord = words[Math.floor(Math.random() * words.length)]
const correctLetters = [];
const wrongLetters = [];

async function getRandomWords(){
    const res = await fetch('https://random-word-api.herokuapp.com/word?number=50');
    const data = await res.json();
    data.forEach(word => {
        words.push(word)
    });
}
getRandomWords();


// Show hidden word
function displayWord(){
wordEL.innerHTML = `
    ${selectedWord
    .split('')
    .map(letter =>`<span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
    </span>`).join('')}
    `;
    const innerWord = wordEL.innerText.replace(/\n/g, '')

    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations! You won! :)';
        popup.style.display = 'flex';
    }
}
displayWord();

// Update the wrong letters
function updateWrongLettersEL(){
    // Display wrong letters
    wrongLetterEL.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong<p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        
        if(index< errors){
            part.style.display = 'block';
        }else{
            part.style.display = 'none';
        }
    })

    // Check if lost
    if(wrongLetters.length  === figureParts.length){
        finalMessage.innerText = 'Unfortunately you lost ;(';
        popup.style.display = 'flex';
    }


}

// Show notification
function showNotification(){
   notification.classList.add('show'); 

   setTimeout(() => {
    notification.classList.remove('show');
   },2000);
}



// Keydown letter press
window.addEventListener('keydown', e =>{
    // console.log(e.code); keyCode는 deprecated되어 이용하지 않았다.
    if(e.code.includes('Key') ){
        const letter = e.key;
    
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            }else{
                showNotification();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                
                updateWrongLettersEL();
            }else{
                showNotification();
            }
        }

    }else{
        
    }
})

// Restart game and play again
playAgainBtn.addEventListener('click', ()=>{
    // Empty the array
    correctLetters.splice(0);
    wrongLetters.splice(0);
    
    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLettersEL();
    popup.style.display ='none';
})