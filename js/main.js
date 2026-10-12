"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Frida Ternström
 */

//skapar element
const form = document.querySelector("#searchform");
const searchButton = document.querySelector("#searchbutton");
const searchInput = document.querySelector("#search");

const recipeSection = document.querySelector("#recipe");
const APIError = document.querySelector(".message");


let searchError = document.querySelector("#error");

/**
 * Validera formulärets inmatning med true/false
 * @returns {boolean}
 */


function validateForm() {

    //rensar felmeddelande inför varje validering av fält
    searchError.innerHTML = "";

    if (searchInput.value.trim() === "") {
        searchError.innerHTML = ("Du måste skriva något i sökfältet");
        return false;
    }
    return true;
}


async function fetchRecipe() {
    try {
        let recipeSearch = searchInput.value.trim();

        const response = await fetch(`https://dummyjson.com/recipes/search?q=${recipeSearch}&limit=1`)
        

        const data = await response.json();
        return data;
    } catch (error) {
        APIError.innerHTML = `Det gick inte bra: ${error}`; //inte detta heller
    }
}

async function showRecipe() {
    let data = await fetchRecipe();
    data.recipes.forEach(recipe => {

//skapar tom lista för ingredienser
let ingredientsList = "";
recipe.ingredients.forEach(ingredient => {  //lägger till ingredienser var för sig, i li-element
    ingredientsList += `<li>${ingredient}`;
});

//skapar tom lista för instruktioner
let instructionList = "";
recipe.instructions.forEach(instruction => {    //lägger till instruktioner var för sig, i li-element
    instructionList += `<li>${instruction}</li>`;
    });

    //skriver ut till DOM
        recipeSection.innerHTML += `
        <article>
        <h3>${recipe.name}</h3> 
        <img src="${recipe.image}" alt="bild på din maträtt">

        <div class="recipe-info">
        <p><strong>Servings:</strong> ${recipe.servings}</p>
        <p><strong>Prep time:</strong> ${recipe.prepTimeMinutes}</p>
        <p><strong>Cooking time:</strong> ${recipe.cookTimeMinutes}</p>
        <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
        </div>

        <h4>Ingredients</h4>
        <ul>${ingredientsList}</ul>

        <h4>Instructions</h4>
        <ol>${instructionList}</ol>
        </article>`;
    }
);}

//Eventlyssnare till knappen för Sök
searchButton.addEventListener("click", function (event) { //vid klick, och stoppa omladdning
    event.preventDefault();
    if (validateForm() === true) {      //kör validering av inmatning 
        fetchRecipe();                  //kör funktioner
        showRecipe();
    }
});




