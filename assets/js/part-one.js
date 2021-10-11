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

function main() {
    global = createState(initialState, stateRunner);
    loadListeners();
}

function loadListeners() {
    loadNewOrExistingInputListener()
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

main()