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
        loadNextButtonListener();
        document.getElementById('num-leads').addEventListener('input', loadXMLDoc);
        loadXMLDoc();
    });
}

///////////////////////
/// Event Listeners ///
///////////////////////

function loadNextButtonListener() {
    var ele = document.getElementById('next-button-3');
    ele.addEventListener('click', () => {
        storeItems();
        toogleSeries('form-parts', 'form-part-4');
    });
}

///////////////////////
/// State Listeners ///
///////////////////////

///////////////////////
/// Other Functions ///
///////////////////////

function loadXMLDoc() {
    const value = document.getElementById('num-leads').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("leadership-rows").innerHTML =
            //    constructInnerHTML(this.responseText, value);
        }
    };
    xhttp.open("GET", "./assets/html/leadership-rows.html", true);
    xhttp.send();
}

function constructInnerHTML(text, num) {
    var arr = []
    for (let i = 0; i < num; i++) {
        arr.push(text.replaceAll('${insertId}', `${i + 1}`));
    }
    return arr.join('\n')
}

function storeItems() { }

// Main call
main()