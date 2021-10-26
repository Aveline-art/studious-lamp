import { toogleSeries } from '../utility.js';
import { global, storeData } from './state.js';


function main() {
    setFields(global.projectFormData)
    global.projectFormData._noMD.addStateListener('image', listenProjectImage)
    global.projectFormData._noMD.addStateListener('image-hero', listenProjectHero)
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


/////////////////////
/// Field Setters ///
/////////////////////

function setFields(data) {
    var ele = document.getElementById('project-image-preview')
    if (data._noMD.image) {
        ele.src = data._noMD.image
    }
    else if (data.image) {
        ele.src = '.' + data.image
    }

    var ele = document.getElementById('project-hero-preview');
    if (data._noMD['image-hero']) {
        ele.src = data._noMD['image-hero']
    } else if (data['image-hero']) {
        ele.src = '.' + data['image-hero']
    }
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

// Figure out how to cache the image promise here instead of below
function listenProjectImage(image) {
    const ele = document.getElementById('project-image-preview')
    ele.src = image
}

function listenProjectHero(image) {
    const ele = document.getElementById('project-hero-preview');
    ele.src = image
}


///////////////////////
/// Other Functions ///
///////////////////////

function storeItems() {
    var data = {
        _noMD: {}
    }

    storeData(data)
}

// main call
main()