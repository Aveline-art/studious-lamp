// Imports
import { toogleSeries } from '../utility.js';
import { global, projectData, clearData, storeData, loadAndStoreData } from './state.js';


function main() {
    setFields(global.newOrExisting)
    global.addStateListener('newOrExisting', listenNewOrExisting);
    loadListeners();
}

function loadListeners() {
    document.addEventListener("DOMContentLoaded", function () {
        loadNewOrExistingInputListener()
        loadClearButtonListener()
        loadNextButtonListener()
    });
}


/////////////////////
/// Field Setters ///
/////////////////////

function setFields(val) {
    const newInput = document.getElementById('new-input');
    const existingInput = document.getElementById('existing-input');
    const newRadio = document.getElementById('new-radio');
    const existingRadio = document.getElementById('existing-radio');
    const localRadio = document.getElementById('local-radio');


    if (val == '1') {
        newInput.removeAttribute('hidden');
        existingInput.setAttribute('hidden', '');
        newRadio.setAttribute('checked', '');
        existingRadio.removeAttribute('checked');
        localRadio.removeAttribute('checked');
    } else if (val == '2') {
        newInput.setAttribute('hidden', '');
        existingInput.removeAttribute('hidden');
        newRadio.removeAttribute('checked');
        existingRadio.setAttribute('checked', '');
        localRadio.removeAttribute('checked');
    } else {
        newInput.setAttribute('hidden', '');
        existingInput.setAttribute('hidden', '');
        newRadio.removeAttribute('checked');
        existingRadio.removeAttribute('checked');
        localRadio.setAttribute('checked', '');
    }
}


///////////////////////
/// Event Listeners ///
///////////////////////

function loadNewOrExistingInputListener() {
    const newRadio = document.getElementById('new-radio');
    const existingRadio = document.getElementById('existing-radio');
    const localRadio = document.getElementById('local-radio');
    for (const ele of [newRadio, existingRadio, localRadio]) {
        ele.addEventListener('click', (e) => {
            setNewOrExisting(e.target.value);
        });
    }
}

// TODO remove once mvp is reached
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


///////////////////////
/// State Listeners ///
///////////////////////

function listenNewOrExisting(val) {
    setFields(val)
}


/////////////////////
/// State Setters ///
/////////////////////

function setNewOrExisting(val) {
    global.newOrExisting = val;
}


///////////////////////
/// Other Functions ///
///////////////////////

function storeItems() {
    const val = global.newOrExisting
    if (val == '1') {
        clearData(); // TODO, this should not happen on click of next, only when the clear data is clicked, this should happen or if a new title is entered
        global.projectFormData.title = document.getElementById('project-name-input').value
        storeData(global.projectFormData)
    } else if (val == '2') {
        clearData();
        const identification = document.getElementById('project-name-select').value;
        storeData(projectData[identification])
    } else if (val == '3') {
        loadAndStoreData()
    }
}

// Main call
main()