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

function showInput(){
    console.log(searchInput.value);
}








searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (validateForm() === true) {
        showInput();
    }
});



