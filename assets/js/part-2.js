import { createState, toogleSeries } from './utility.js';

// Globals
var global;

// Sets initial state
var initialState = {}

// key-val pairs where keys are the state (see initialState), and the vals are the functions to run on state change
const stateRunner = {}
var projectData;


function main() {
    global = createState(initialState, stateRunner);
    const data = localStorage.getItem('projectData');
    projectData = data ? JSON.parse(data) : {}
    loadListeners();
}

function loadListeners() {
    document.addEventListener("DOMContentLoaded", function () {
        loadNextButtonListener()
    });
}

///////////////////////
/// Event Listeners ///
///////////////////////

function loadNextButtonListener() {
    var ele = document.getElementById('next-button-2');
    ele.addEventListener('click', () => {
        storeItems();
        toogleSeries('form-parts', 'form-part-3');
    });
}

///////////////////////
/// State Listeners ///
///////////////////////

///////////////////////
/// Other Functions ///
///////////////////////

function storeItems() {
    projectData.projectStatus = document.getElementById('project-status').value;
    projectData.projectDescription = document.getElementById('project-status').value;
    projectData.githubURL = document.getElementById('github-url').value;
    projectData.slackURL = document.getElementById('slack-url').value;
    projectData.technologies = document.getElementById('technologies').value.split('\n');
    projectData.tools = document.getElementById('tools').value.split('\n');
}

// Main call
main()