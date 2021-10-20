// Imports
import { toogleSeries } from '../utility.js';
import { global, projectData } from './state.js';


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
            child.getElementsByTagName('input')[0].addEventListener('click', (e) => {
                setIsNew(e.target.value);
            });
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

function setIsNew(val) {
    global.isNew = val == 'true';
}

function setProjectFormData(data) {
    global.projectFormData = data
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
    const data = localStorage.getItem('projectFormData');
    var projectFormData = data ? JSON.parse(data) : {}
    if (global.isNew) {
        projectFormData.title = document.getElementById('project-name-input').value
    } else {
        const identification = document.getElementById('project-name-select').value;
        projectFormData = projectData[identification]
    }
    localStorage.setItem('projectFormData', JSON.stringify(projectFormData));
    setProjectFormData(projectFormData);
    // TODO remove once everythins is done with
    for (const item in global.projectFormData) {
        console.log(item, ':', global.projectFormData[item])
    }
}

// Main call
main()