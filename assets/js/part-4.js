import { createState, toogleSeries } from './utility.js';

// Globals
var global;

// Sets initial state
var initialState = {}

// key-val pairs where keys are the state (see initialState), and the vals are the functions to run on state change
const stateRunner = {}
var projectData;


function main() {
    global = createState(initialState, stateRunner);
    const data = localStorage.getItem('projectData');
    projectData = data ? JSON.parse(data) : {}
    loadListeners();
}

function loadListeners() {
    document.addEventListener("DOMContentLoaded", function () {
        loadBackButtonListener();
    });
}

///////////////////////
/// Event Listeners ///
///////////////////////

function loadBackButtonListener() {
    var ele = document.getElementById('back-button-4');
    ele.addEventListener('click', () => {
        storeItems();
        toogleSeries('form-parts', 'form-part-3');
    });
}


/////////////////////
/// State Setters ///
/////////////////////


///////////////////////
/// State Listeners ///
///////////////////////


///////////////////////
/// Other Functions ///
///////////////////////

function storeItems() {}


// main call
main()