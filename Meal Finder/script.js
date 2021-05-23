const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEL = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEL = document.getElementById("single-meal");


// Fetch meal by ID
function getMealById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0]
        addMealToDom(meal);    
    });
}
// Add meal to DOM
function addMealToDom(meal){
    const ingredients = [];

    for(i=1; i <= 20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }else{
            break;
        }
    }

    single_mealEL.innerHTML =  `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}
mealsEL.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
    if(item.classList){
        return item.classList.contains('meal-info')
    }else{
        return false;
    }});
    console.log(mealInfo);

    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }
})

function randomMeal(){
    // Clear meals and headings
    mealsEL.innerHTML = '';
    resultHeading.innerHTML= '';

    
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        addMealToDom(meal);
    });
}

// Event listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', randomMeal);

// Search meal and fetch from API
function searchMeal(e){
    e.preventDefault();

    // Clear single meal
    single_mealEL.innerHTML='';

    // Get search term
    const term = search.value;

    // Check for empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data =>{ 
            console.log(data)
            resultHeading.innerHTML= `<h2>Search result fot '${term}': <h2>`;
            if(data.meals == null){
                resultHeading.innerHTML = `<p>There are no search result. Try again!</p>`
            }else{
                mealsEL.innerHTML = data.meals.map(meal => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="meal-info" data-mealID="${meal.idMeal}"><h3>${meal.strMeal}</h3></div>
                </div>`).join('');
            }});
            
            // Clear search text
            search.value = '';
        
    }else{
        alert('please enter a search term');
    }
}


