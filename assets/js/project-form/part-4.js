// Imports
import { toggleSeries } from '../utility.js';
import { global, storeData } from './state.js';

// Globals
const projectImagePreview = document.getElementById('project-image-preview');
const projectHeroPreview = document.getElementById('project-hero-preview');
const projectImageAlt = document.getElementById('project-image-alt');
const projectHeroAlt = document.getElementById('project-hero-alt');

// main
function main() {
    setFields(global.projectFormData)
    global.projectFormData._noMD.addStateListener('image', listenProjectUploadImage)
    global.projectFormData._noMD.addStateListener('image-hero', listenProjectUploadHero)
    global.addStateListener('projectFormData', listenProjectFormData)
    loadListeners();
}

// loadListeners
function loadListeners() {
    document.addEventListener("DOMContentLoaded", function () {
        loadBackButtonListener();
        loadSubmitButtonListener()
        loadImageUploadListener();
        loadHeroUploadListener();
    });
}


/////////////////////
/// Field Setters ///
/////////////////////

function setFields(data) {
    projectImagePreview.src = imageToDisplay(data._noMD.image, data.image)
    projectHeroPreview.src = imageToDisplay(data._noMD['image-hero'], data['image-hero'])

    projectImageAlt.value = data.alt
    projectHeroAlt.value = data['alt-hero']
}


///////////////////////
/// Event Listeners ///
///////////////////////

function loadBackButtonListener() {
    const ele = document.getElementById('back-button-4');
    ele.addEventListener('click', () => {
        storeItems();
        toggleSeries('form-parts', 'form-part-3');
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
    const image = this.files[0]
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        global.projectFormData._noMD.image = reader.result;
    }, false);

    if (image) {
        reader.readAsDataURL(image);
    }
}

function setHeroImage() {
    const image = this.files[0]
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        global.projectFormData._noMD['image-hero'] = reader.result;
    }, false);

    if (image) {
        reader.readAsDataURL(image);
    }
}


///////////////////////
/// State Listeners ///
///////////////////////

function listenProjectFormData(data) {
    setFields(data)
}

function listenProjectUploadImage(image) {
    projectImagePreview.src = imageToDisplay(image, global.projectFormData.image)
}

function listenProjectUploadHero(image) {
    projectHeroPreview.src = imageToDisplay(image, global.projectFormData['image-hero'])
}


///////////////////////
/// Other Functions ///
///////////////////////

function storeItems() {
    var data = {
        _noMD: {}
    }

    data.alt = projectImageAlt.value
    data['alt-hero'] = projectHeroAlt.value

    storeData(data)
}

function imageToDisplay(primary, other) {
    return primary || '.' + other
}

// main call
main()