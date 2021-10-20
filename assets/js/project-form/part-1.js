// Imports
import { toogleSeries } from '../utility.js';
import { global, projectData, clearData, setProjectFormData } from './state.js';


function main() {
    global.addStateListener('isNew', listenIsNew);
    loadListeners();
}

function loadListeners() {
    document.addEventListener("DOMContentLoaded", function () {
        loadNewOrExistingInputListener()
        loadClearButtonListener()
        loadNextButtonListener()
    });
}

///////////////////////
/// Event Listeners ///
///////////////////////

function loadNewOrExistingInputListener() {
    const ele = document.getElementById('new-or-existing');
    const children = ele.children;
    for (const child of children) {
        if (child.className == 'form-check') {
            child.getElementsByTagName('input')[0].addEventListener('click', (e) => {
                setIsNew(e.target.value);
            });
        }
    }
}

function loadClearButtonListener() {
    var ele = document.getElementById('clear-button');
    ele.addEventListener('click', () => {
        clearData()
    })
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

function setIsNew(val) {
    global.isNew = val == 'true';
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
    if (global.isNew) {
        clearData()
        global.projectFormData.title = document.getElementById('project-name-input').value
    } else {
        const identification = document.getElementById('project-name-select').value;
        const result = {...global.projectFormData, ...projectData[identification]}
        setProjectFormData(result)
    }
    localStorage.setItem('projectFormData', JSON.stringify(global.projectFormData));
    for (const item in global.projectFormData) {
        console.log(item, ':', global.projectFormData[item])
    }
}

// Main call
main()