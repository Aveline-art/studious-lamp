// Imports
import { toogleSeries } from '../utility.js';
import { global } from './state.js';


function main() {
    // TODO remove this once testing is done
    localStorage.clear();
    global.addStateListener('isNew', listenIsNew);
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
    const ele = document.getElementById('new-or-existing');
    const children = ele.children;
    for (const child of children) {
        if (child.className == 'form-check') {
            child.getElementsByTagName('input')[0].addEventListener('click', setIsNew);
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

function setIsNew(event) {
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
    const data = localStorage.getItem('projectData');
    var projectData = data ? JSON.parse(data) : {}

    projectData.projectName = document.getElementById('project-name-input').value;
    localStorage.setItem('projectData', JSON.stringify(projectData));
}

// Main call
main()