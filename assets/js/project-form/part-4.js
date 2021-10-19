import { toogleSeries } from '../utility.js';
import { global } from './state.js';


function main() {
    global.addStateListener('projectImage', listenProjectImage)
    global.addStateListener('projectHero', listenProjectHero)
    loadListeners();
}

function loadListeners() {
    document.addEventListener("DOMContentLoaded", function () {
        loadBackButtonListener();
        loadSubmitButtonListener()
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

function loadSubmitButtonListener() {
    const ele = document.getElementById('submit-button');
    ele.addEventListener('click', () => {
        storeItems();
    })
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

// Figure out how to cache the image promise here instead of below
function listenProjectImage(image) {
    const ele = document.getElementById('project-image-preview')
    ele.file = image
    const reader = new FileReader();
    reader.onload = (function (ele) { return function (e) { ele.src = e.target.result; }; })(ele);
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
    const data = localStorage.getItem('projectFormData');
    var projectFormData = data ? JSON.parse(data) : {}

    const imagePromise = getImageURL(global.projectImage)
    const heroPromise = getImageURL(global.projectHero)

    Promise.all([imagePromise, heroPromise]).then((data) => {
        projectFormData.projectImage = data[0]
        projectFormData.projectHero = data[1]
        localStorage.setItem('projectFormData', JSON.stringify(projectFormData));
    });
}

function getImageURL(image) {
    return new Promise(function (resolve, reject) {
        try {
            var reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(image);
        }
        catch {
            resolve('');
        }
    });
}


// main call
main()