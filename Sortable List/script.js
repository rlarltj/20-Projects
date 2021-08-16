const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Elon Musk',
    'Jeff Bezos',
    'Bernard Arnault & family',
    'Bill Gates',
    'Mark Zuckerberg',
    'Zhong Shanshan',
    'Larry Ellison',
    'Waren Buffett',
    'Larry Page',
    'Sergey Brin',
    'Sergey Brin'
];

// Store list items
const listItems = [];

let dragStartIndex;

// Insert list items into DOM
function createList(){
    [...richestPeople]
        .map(a => ({value: a, sort:Math.random()}))
        .sort(function(a,b){
            return a.sort - b.sort;
        })
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);
            listItem.innerHTML= `
            <span class="number">${index+1}</span>
            <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
          
            </div>
            `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        });

        addEventListener();
}

createList();

// Check the order of list items
function checkOrder(){
    listItems.forEach((listItem, index)=>{
        const personName = listItem.querySelector('.draggable')
        .innerText.trim();

        if(personName !== richestPeople[index]){
            listItem.classList.add('wrong');
        }else{
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}

function addEventListener(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable =>{
        draggable.addEventListener('dragstart', dragStart);
    }) 
    
    dragListItems.forEach(item =>{
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}


function dragOver(e){
    e.preventDefault();
}

function dragStart(){
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
}

function dragDrop(){
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swapItems(from, to){
    const itemOne = listItems[from].querySelector('.draggable');
    const itemTwo = listItems[to].querySelector('.draggable');

    listItems[from].appendChild(itemTwo);
    listItems[to].appendChild(itemOne);
}

function dragEnter(){
    this.classList.add('over');
}

function dragLeave(){
    this.classList.remove('over');

}

check.addEventListener('click', checkOrder);
