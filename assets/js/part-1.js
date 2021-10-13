// Imports
import { createState, toogleSeries } from './utility.js';

// Globals
var global;

// Sets initial state
var initialState = {
    isNew: true,
}

// key-val pairs where keys are the state (see initialState), and the vals are the functions to run on state change
const stateRunner = {
    isNew: (val) => { listenIsNew(val) },
}
var projectData;


function main() {
    // TODO remove this once testing is done
    localStorage.clear();
    global = createState(initialState, stateRunner);
    const data = localStorage.getItem('projectData');
    projectData = data ? JSON.parse(data) : {}
    loadListeners();
}

function loadListeners() {
    document.addEventListener("DOMContentLoaded", function () {
        loadNewOrExistingInputListener()
        loadNextButtonListener()
    });
}

///////////////////////
/// Event Listeners ///
///////////////////////

function loadNewOrExistingInputListener() {
    var ele = document.getElementById('new-or-existing');
    var children = ele.children;
    for (const child of children) {
        if (child.className == 'form-check') {
            child.getElementsByTagName('input')[0].addEventListener('click', setNew);
        }
    }
}

function loadNextButtonListener() {
    var ele = document.getElementById('next-button-1');
    ele.addEventListener('click', () => {
        storeItems();
        toogleSeries('form-parts', 'form-part-2');
    });
}

/////////////////////
/// State Setters ///
/////////////////////

function setNew(event) {
    const eventVal = event.target.value;
    global.isNew = eventVal == 'true';
}

///////////////////////
/// State Listeners ///
///////////////////////

function listenIsNew(val) {
    const newInput = document.getElementById('new-input');
    const existingInput = document.getElementById('existing-input');
    if (val) {
        newInput.removeAttribute('hidden');
        existingInput.setAttribute('hidden', '');
    } else {
        newInput.setAttribute('hidden', '');
        existingInput.removeAttribute('hidden');
    }
}

///////////////////////
/// Other Functions ///
///////////////////////

function storeItems() {
    const projectName = document.getElementById('project-name-input').value;
    projectData.projectName = projectName;
    localStorage.setItem('projectData', JSON.stringify(projectData));
}

// Main call
main()