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
        loadSkipLinkListener()
        loadNextButtonListener()
    });
}


/////////////////////
/// Field Setters ///
/////////////////////

function setFields(val) {
    const newInput = document.getElementById('new-input');
    const existingInput = document.getElementById('existing-input');
    const localLinks = document.getElementById('local-links');
    const uploadData = document.getElementById('upload-data');

    const newRadio = document.getElementById('new-radio');
    const existingRadio = document.getElementById('existing-radio');
    const localRadio = document.getElementById('local-radio');
    const uploadRadio = document.getElementById('upload-radio');


    if (val == '1') {
        newInput.removeAttribute('hidden');
        existingInput.setAttribute('hidden', '');
        localLinks.setAttribute('hidden', '');
        uploadData.setAttribute('hidden', '');

        newRadio.setAttribute('checked', '');
        existingRadio.removeAttribute('checked');
        localRadio.removeAttribute('checked');
        uploadRadio.removeAttribute('checked');
    } else if (val == '2') {
        newInput.setAttribute('hidden', '');
        existingInput.removeAttribute('hidden');
        localLinks.setAttribute('hidden', '');
        uploadData.setAttribute('hidden', '');

        newRadio.removeAttribute('checked');
        existingRadio.setAttribute('checked', '');
        localRadio.removeAttribute('checked');
        uploadRadio.removeAttribute('checked');
    } else if (val == '3') {
        newInput.setAttribute('hidden', '');
        existingInput.setAttribute('hidden', '');
        localLinks.removeAttribute('hidden');
        uploadData.setAttribute('hidden', '');

        newRadio.removeAttribute('checked');
        existingRadio.removeAttribute('checked');
        localRadio.setAttribute('checked', '');
        uploadRadio.removeAttribute('checked');
    } else {
        newInput.setAttribute('hidden', '');
        existingInput.setAttribute('hidden', '');
        localLinks.removeAttribute('hidden');
        uploadData.removeAttribute('hidden');

        newRadio.removeAttribute('checked');
        existingRadio.removeAttribute('checked');
        localRadio.removeAttribute('checked');
        uploadRadio.setAttribute('checked', '');
    }
}


///////////////////////
/// Event Listeners ///
///////////////////////

function loadNewOrExistingInputListener() {
    const newRadio = document.getElementById('new-radio');
    const existingRadio = document.getElementById('existing-radio');
    const localRadio = document.getElementById('local-radio');
    const uploadRadio = document.getElementById('upload-radio');
    for (const ele of [newRadio, existingRadio, localRadio, uploadRadio]) {
        ele.addEventListener('click', (e) => {
            setNewOrExisting(e.target.value);
        });
    }
}

function loadSkipLinkListener() {
    var ele1 = document.getElementById('preview-skip-link');
    var ele2 = document.getElementById('results-skip-link');
    [ele1, ele2].forEach(item => {
        item.addEventListener('click', () => {
            loadAndStoreData()
        });
    });
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
        clearData();
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