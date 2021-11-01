// Imports
import { toogleSeries } from '../utility.js';
import { global, projectData, clearData, storeData, loadLocalStorageData } from './state.js';

// Globals
const newRadio = document.getElementById('new-radio');
const existingRadio = document.getElementById('existing-radio');
const localRadio = document.getElementById('local-radio');
const uploadRadio = document.getElementById('upload-radio');
const allRadio = [newRadio, existingRadio, localRadio, uploadRadio]

const newInput = document.getElementById('new-input');
const existingInput = document.getElementById('existing-input');
const localLinks = document.getElementById('local-links');
const uploadData = document.getElementById('upload-data');
const allInput = [newInput, existingInput, localLinks, uploadData]


// main
function main() {
    setFields(global.newOrExisting);
    global.addStateListener('newOrExisting', listenNewOrExisting);
    loadListeners();
}

// loadListeners
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
    const checkedObject = {
        '0': newRadio,
        '1': existingRadio,
        '2': localRadio,
        '3': uploadRadio,
    }

    const showObject = {
        '0': [newInput],
        '1': [existingInput],
        '2': [localLinks],
        '3': [localLinks, uploadData],
    }

    function check(item) {
        for (const radio of allRadio) {
            radio.removeAttribute('checked')
        }
        item.setAttribute('checked', '')
    }

    function hidden(items) {
        for (const input of allInput) {
            if (items.includes(input)) {
                input.removeAttribute('hidden')
            } else {
                input.setAttribute('hidden', '')
            }
        }
    }

    check(checkedObject[val])
    hidden(showObject[val])
}


///////////////////////
/// Event Listeners ///
///////////////////////

function loadNewOrExistingInputListener() {
    for (const ele of allRadio) {
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
            storeItems()
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
    if (val == '0') {
        clearData();
        global.projectFormData.title = document.getElementById('project-name-input').value
        storeData(global.projectFormData)
    } else if (val == '1') {
        clearData();
        const identification = document.getElementById('project-name-select').value;
        storeData(projectData[identification])
    } else if (val == '2') {
        loadLocalStorageData()
    } else if (val == '3') {
        // #39 post MVP, .json or .md parser
    }
}

// main call
main()