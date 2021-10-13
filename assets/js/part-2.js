import { createState, toogleSeries } from './utility.js';
// Globals
var global;

// Sets initial state
var initialState = {
    isNew: true,
}

// key-val pairs where keys are the state (see initialState), and the vals is the function to run on state change
const stateRunner = {
    isNew: (isNew) => { listenIsNew(isNew) },
}

function main() {
    global = createState(initialState, stateRunner);
    loadListeners();
}

function loadListeners() {
    document.addEventListener("DOMContentLoaded", function () {
        loadNextButtonListener();
        loadBackButtonListener();
    });
}


///////////////////////
/// Event Listeners ///
///////////////////////

function loadNextButtonListener() {
    const ele = document.getElementById('next-button-2');
    ele.addEventListener('click', () => {
        storeItems();
        toogleSeries('form-parts', 'form-part-3');
    });
}

function loadBackButtonListener() {
    const ele = document.getElementById('back-button-2');
    ele.addEventListener('click', () => {
        storeItems();
        toogleSeries('form-parts', 'form-part-1');
    });
}


/////////////////////
/// State Setters ///
/////////////////////

function setIsNewExport(val) {
    global.isNew = val;
}


///////////////////////
/// State Listeners ///
///////////////////////

function listenIsNew(val) {
    console.log('comming in from part2')
    console.log(val)
}


///////////////////////
/// Other Functions ///
///////////////////////

function storeItems() {
    const data = localStorage.getItem('projectData');
    var projectData = data ? JSON.parse(data) : {}

    projectData.projectStatus = document.getElementById('project-status').value;
    projectData.projectDescription = document.getElementById('project-description').value;
    projectData.githubURL = document.getElementById('github-url').value;
    projectData.slackURL = document.getElementById('slack-url').value;
    projectData.technologies = document.getElementById('technologies').value.split('\n');
    projectData.tools = document.getElementById('tools').value.split('\n');
    projectData.programAreas = parseProgramAreas();
    localStorage.setItem('projectData', JSON.stringify(projectData));
}

function parseProgramAreas() {
    const programAreas = document.getElementById('program-areas');
    const inputs = programAreas.getElementsByTagName('input');
    var arr = []
    for (const input of inputs) {
        if (input.checked) {
            arr.push(input.value);
        }
    }
    return arr
}

// Main call
main()

export { setIsNewExport };