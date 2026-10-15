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
const APIError = document.querySelector("#message");

let searchError = document.querySelector("#error");

/**
 * Validera formulärets inmatning med true/false
 * @returns {boolean}
 */


function validateForm() {

    //rensar felmeddelande inför varje validering av fält
    searchError.innerHTML = "";

    if (searchInput.value.trim() === "") { //Om användaren inte matar in något i sökfältet
        searchError.innerHTML = ("Du måste skriva något i sökfältet");
        return false;
    }
    return true;
}

//funktion för att hämta recept från rest-API
async function fetchRecipe() {

    APIError.innerHTML = ""; //rensa tidigare felmeddelanden

    try {
        let recipeSearch = searchInput.value.trim(); //skapar variabel för användarens inmatning

        const response = await fetch(
            `https://dummyjson.com/recipes/search?q=${recipeSearch}&limit=1`//hämtar recept efter användarens inmatning, max 1
        );

        if (!response.ok) {
            throw new Error("Något gick fel vid inhämtning av data. Försök igen senare");
        }

        const data = await response.json(); //omvandlar datan till json

        if (data.recipes.length === 0) {          //om data kommer tillbaka och inget recept hittats
            throw new Error("Det fanns inga recept som matchade din sökning");
        }

        return data;
    } catch (error) {
        if (error.message === "Något gick fel vid inhämtning av data. Försök igen senare") { //Skriver ut olika felmeddelanden, beroende på vad som hänt
        APIError.innerHTML = `${error.message}`; //lägger till felmeddelande i DOM
        } else if (error.message === "Det fanns inga recept som matchade din sökning") {
            APIError.innerHTML = `${error.message}`;
        } else
            APIError.innerHTML = "Någonting oväntat gick fel. Försök igen senare."; //oväntade fel
        console.log(error); //loggas i konsollen
    }
}

async function showRecipe() { //funktion för att visa receptet som hittades på sidan

    recipeSection.innerHTML = ""; //rensa inför nästa sökning

    let data = await fetchRecipe(); //inväntar att vi hittar ett recept

    if (data === undefined) {  //förhindra felmeddelande i konsollen om inget recept hittades
        console.log("Kör inte resten av koden om inget recept hittades");
        return;
    }


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
    );
}

//Eventlyssnare till knappen för Sök
searchButton.addEventListener("click", function (event) { //vid klick, och stoppa omladdning
    event.preventDefault();
    if (validateForm() === true) {      //kör funktion för validering av inmatning             
        showRecipe(); //kör funktion
    }
});




