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

        const response = await fetch(`https://dummyjson.com/recipes/search?q=${recipeSearch}&limit=1`);

        if (!response.ok) {
            throw new Error("Något gick fel!"); //det här funkar inte än
        }

        const data = await response.json();
        return data;
    } catch (error) {
        APIError.innerHTML = `Det gick inte bra: ${error}`; //inte detta heller
    }
}

async function showRecipe() {
    let data = await fetchRecipe();
    data.recipes.forEach(recipe => {
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
        <ul>
        </ul>

        
    
        
        
        
        
        
        
        </article>`;
    });
}







searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (validateForm() === true) {
        fetchRecipe();
        showRecipe();
    }
});




