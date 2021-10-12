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
        loadNextButtonListener()
    });
}

///////////////////////
/// Event Listeners ///
///////////////////////

function loadNextButtonListener() {
    var ele = document.getElementById('next-button-3');
    ele.addEventListener('click', () => {
        storeItems();
        toogleSeries('form-parts', 'form-part-4');
    });
}

///////////////////////
/// State Listeners ///
///////////////////////

///////////////////////
/// Other Functions ///
///////////////////////

function storeItems() {}

// Main call
main()