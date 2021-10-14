import { createState, toogleSeries, createDomObject } from '../utility.js';

// Globals
var global;

// Sets initial state
var initialState = {
    rows: 1,
}

// key-val pairs where keys are the state (see initialState), and the vals are the functions to run on state change
const stateRunner = {
    rows: (rows) => { listenRows(rows) }
}

function main() {
    global = createState(initialState, stateRunner);
    loadListeners();
}

function loadListeners() {
    document.addEventListener("DOMContentLoaded", function () {
        loadNextButtonListener();
        loadBackButtonListener();
        loadNumLeadsInputListener();
        constructLeadershipRows(global.rows);
    });
}

///////////////////////
/// Event Listeners ///
///////////////////////

function loadNumLeadsInputListener() {
    const ele = document.getElementById('num-leads')
    ele.addEventListener('input', setRows);
}

function loadNextButtonListener() {
    const ele = document.getElementById('next-button-3');
    ele.addEventListener('click', () => {
        storeItems();
        toogleSeries('form-parts', 'form-part-4');
    });
}

function loadBackButtonListener() {
    var ele = document.getElementById('back-button-3');
    ele.addEventListener('click', () => {
        storeItems();
        toogleSeries('form-parts', 'form-part-2');
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

    for (let i = 0; i < rows; i++) {
        const rowNode = createDomObject('div', {
            'class': 'row mb-1',
            'id': `leader-${i + 1}`,
        })

        const col1 = createDomObject('div', { 'class': 'col-1' });
        const child1 = document.createTextNode(`${i + 1}`);
        col1.appendChild(child1);

        const col2 = createDomObject('div', { 'class': 'col-4' });
        const child2 = createDomObject('input', {
            'type': 'text',
            'class': 'form-control',
            'name': 'leaderName',
        });
        col2.append(child2);

        const col3 = createDomObject('div', { 'class': 'col-3' });
        const child3 = createDomObject('input', {
            'type': 'text',
            'class': 'form-control',
            'name': 'leaderRole',
        });
        col3.append(child3);

        const col4 = createDomObject('div', { 'class': 'col-4' });
        const child4 = createDomObject('input', {
            'type': 'text',
            'class': 'form-control',
            'name': 'leaderGithub',
        });
        col4.append(child4);

        rowNode.append(col1, col2, col3, col4);
        leadershipRows.append(rowNode);
    }
}

function storeItems() {
    const data = localStorage.getItem('projectData');
    var projectData = data ? JSON.parse(data) : {}

    projectData.projectLeaders = gatherLeaders();
    localStorage.setItem('projectData', JSON.stringify(projectData));
}

function gatherLeaders() {
    var ele = document.getElementById('leadership-rows');
    var children = ele.childNodes;
    var leaders = []
    for (const child of children) {
        var leader = {}

        const inputs = child.getElementsByTagName('input');
        for (const input of inputs) {
            leader[input.name] = input.value;
        }
        leaders.push(leader);
    }
    return leaders
}

// Main call
main()