import { createState, toogleSeries } from '../utility.js';

// Globals
var global;

// Sets initial state
var initialState = {}

// key-val pairs where keys are the state (see initialState), and the vals are the functions to run on state change
const stateRunner = {
    projectImage: (projectImage) => listenProjectImage(projectImage),
    projectHero: (projectHero) => listenProjectHero(projectHero),
}

function main() {
    global = createState(initialState, stateRunner);
    loadListeners();
}

function loadListeners() {
    document.addEventListener("DOMContentLoaded", function () {
        loadBackButtonListener();
        loadImageUploadListener();
        loadHeroUploadListener();
    });
}


///////////////////////
/// Event Listeners ///
///////////////////////

function loadBackButtonListener() {
    const ele = document.getElementById('back-button-4');
    ele.addEventListener('click', () => {
        storeItems();
        toogleSeries('form-parts', 'form-part-3');
    });
}

function loadImageUploadListener() {
    const ele = document.getElementById('project-image');
    ele.addEventListener('change', setProjectImage, false);
}

function loadHeroUploadListener() {
    const ele = document.getElementById('project-hero');
    ele.addEventListener('change', setHeroImage, false);
}


/////////////////////
/// State Setters ///
/////////////////////

function setProjectImage() {
    const fileList = this.files
    global.projectImage = fileList[0]
}

function setHeroImage() {
    const fileList = this.files
    global.projectHero = fileList[0]
}


///////////////////////
/// State Listeners ///
///////////////////////

function listenProjectImage(image) {
    const ele = document.getElementById('project-image-preview')
    ele.file = image
    const reader = new FileReader();
    reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(ele);
    reader.readAsDataURL(image);
}

function listenProjectHero(image) {
    const ele = document.getElementById('project-hero-preview');
    ele.file = image
    const reader = new FileReader();
    reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(ele);
    reader.readAsDataURL(image);
}


///////////////////////
/// Other Functions ///
///////////////////////

function storeItems() {
    const data = localStorage.getItem('projectData');
    var projectData = data ? JSON.parse(data) : {}

    projectData.projectImage = document.getElementById('project-image-preview').file
    projectData.projectHero = document.getElementById('project-hero-preview').file
    localStorage.setItem('projectData', JSON.stringify(projectData));
}


// main call
main()