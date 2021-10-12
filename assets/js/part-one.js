// Imports
import { createState } from './utility.js';

// Globals
var global;
var initialState = {
    isNew: true,
}
const stateRunner = {
    isNew: (val) => { listenIsNew(val) },
}
var projectData;


function main() {
    global = createState(initialState, stateRunner);
    const data = localStorage.getItem('projectData');
    projectData = data ? JSON.parse(data) : {}
    loadListeners();
}

function loadListeners() {
    loadNewOrExistingInputListener()
    loadNextButtonListener()
}

///////////////////////
/// Event Listeners ///
///////////////////////

function loadNewOrExistingInputListener() {
    var ele = document.getElementById('new-or-existing');
    var children = ele.childNodes;
    for (const child of children) {
        if (child.className == 'form-check') {
            child.getElementsByTagName('input')[0].addEventListener('click', toogleNew);
        }
    }
}

function loadNextButtonListener() {
    var ele = document.getElementById('next-button');
    ele.addEventListener('click', () => {
        storeItems();
        moveToNextPage();
    })
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

function toogleNew(event) {
    const eventVal = event.target.value;
    global.isNew = eventVal == 'true';
}

function storeItems() {
    const projectName = document.getElementById('project-name-input').value;
    projectData.projectName = projectName;
}

function moveToNextPage() {
    localStorage.setItem('projectData', JSON.stringify(projectData));
    const item = localStorage.getItem('projectData');
    console.log(JSON.parse(item));
    window.location.href = './about'
}

main()