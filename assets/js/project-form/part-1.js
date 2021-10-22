// Imports
import { toogleSeries } from '../utility.js';
import { global, projectData, clearData, storeData } from './state.js';


function main() {
    setFields(global.isNew)
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


/////////////////////
/// Field Setters ///
/////////////////////

function setFields(val) {
    const newInput = document.getElementById('new-input');
    const existingInput = document.getElementById('existing-input');
    const newRadio = document.getElementById('new-radio');
    const existingRadio = document.getElementById('existing-radio')

    if (val) {
        newInput.removeAttribute('hidden');
        existingInput.setAttribute('hidden', '');
        newRadio.setAttribute('checked', '')
        existingRadio.removeAttribute('checked')
    } else {
        newInput.setAttribute('hidden', '');
        existingInput.removeAttribute('hidden');
        newRadio.removeAttribute('checked')
        existingRadio.setAttribute('checked', '')
    }
}


///////////////////////
/// Event Listeners ///
///////////////////////

function loadNewOrExistingInputListener() {
    const newRadio = document.getElementById('new-radio');
    const existingRadio = document.getElementById('existing-radio');
    for (const ele of [newRadio, existingRadio]) {
        ele.addEventListener('click', (e) => {
            setIsNew(e.target.value);
        });
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


///////////////////////
/// State Listeners ///
///////////////////////

function listenIsNew(val) {
    setFields(val)
}


/////////////////////
/// State Setters ///
/////////////////////

function setIsNew(val) {
    global.isNew = val == 'true';
}


///////////////////////
/// Other Functions ///
///////////////////////

function storeItems() {
    if (global.isNew) {
        clearData()
        global.projectFormData.title = document.getElementById('project-name-input').value
        storeData(global.projectFormData)
    } else {
        const identification = document.getElementById('project-name-select').value;
        storeData(projectData[identification])
    }
    // TODO remove once I am done
    /*
    for (const item in global.projectFormData) {
        console.log(item, ':', global.projectFormData[item])
    }*/
}

// Main call
main()