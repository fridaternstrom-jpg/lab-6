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



async function fetchRecipes() {
const response = await fetch('https://dummyjson.com/recipes/search')
const data = await response.json();
return data;
}

async function showRecipe() {
    let data = await fetchRecipes();
    data.recipes.forEach(recipe => {
        console.log(recipe.name);
    });
}







searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (validateForm() === true) {
        showInput(); //för test
    }
});


//bara för test
function showInput(){
    console.log(searchInput.value);
}

