import { createState, toogleSeries, createDomObject } from './utility.js';

// Globals
var global;

// Sets initial state
var initialState = {
    rows: 1,
}

// key-val pairs where keys are the state (see initialState), and the vals are the functions to run on state change
const stateRunner = {
    rows: (num) => { listenRows(num) }
}
var projectData;


function main() {
    global = createState(initialState, stateRunner);
    const data = localStorage.getItem('projectData');
    projectData = data ? JSON.parse(data) : {}
    loadListeners();
}

function loadListeners() {
    document.addEventListener("DOMContentLoaded", function () {
        loadNextButtonListener();
        loadNumLeadsInputListener();
        constructLeadershipRows(global.rows);
    });
}

///////////////////////
/// Event Listeners ///
///////////////////////

function loadNumLeadsInputListener() {
    var ele = document.getElementById('num-leads')
    ele.addEventListener('input', setRows);
}

function loadNextButtonListener() {
    var ele = document.getElementById('next-button-3');
    ele.addEventListener('click', () => {
        storeItems();
        toogleSeries('form-parts', 'form-part-4');
    });
}

/////////////////////
/// State Setters ///
/////////////////////

function setRows(event) {
    const eventVal = event.target.value;
    if (eventVal >= 1 & eventVal <= 10) {
        global.rows = eventVal;
    }
}

///////////////////////
/// State Listeners ///
///////////////////////

function listenRows(num) {
    constructLeadershipRows(num);
}

///////////////////////
/// Other Functions ///
///////////////////////

function constructLeadershipRows(rows) {
    const leadershipRows = document.getElementById('leadership-rows');
    while (leadershipRows.firstChild) {
        leadershipRows.removeChild(leadershipRows.firstChild);
    }

    const inputNode = createDomObject('input', {
        'type': 'text',
        'class': 'form-control',
    });
    for (let i = 0; i < rows; i++) {
        const rowNode = createDomObject('div', {
            'class': 'row mb-1',
            'id': `leader-${i + 1}`,
        })

        const col1 = createDomObject('div', { 'class': 'col-1' })
        col1.appendChild(document.createTextNode(`${i + 1}`));
        const col2 = createDomObject('div', { 'class': 'col-4' })
        col2.append(inputNode.cloneNode());
        const col3 = createDomObject('div', { 'class': 'col-3' })
        col3.append(inputNode.cloneNode());
        const col4 = createDomObject('div', { 'class': 'col-4' })
        col4.append(inputNode.cloneNode());

        rowNode.append(col1, col2, col3, col4);

        leadershipRows.append(rowNode);
    }
}

function storeItems() { }

// Main call
main()