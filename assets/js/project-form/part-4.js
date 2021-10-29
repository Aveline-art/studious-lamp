import { toogleSeries } from '../utility.js';
import { global, storeData } from './state.js';


function main() {
    setFields(global.projectFormData)
    global.projectFormData._noMD.addStateListener('image', listenProjectUploadImage)
    global.projectFormData._noMD.addStateListener('image-hero', listenProjectUploadHero)
    //global.projectFormData.addStateListener('image', listenProjectImage)
    //global.projectFormData.addStateListener('image-hero', listenProjectHero)
    global.addStateListener('projectFormData', listenProjectFormData)
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

    document.getElementById('project-image-alt').value = data.alt
    document.getElementById('project-hero-alt').value = data['alt-hero']
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

function listenProjectFormData(data) {
    setFields(data)
}

// TODO refactor this to remove redundant code
function listenProjectImage(image) {
    const ele = document.getElementById('project-image-preview')
    ele.src = global.projectFormData._noMD.image || '.' + image
}

function listenProjectHero(image) {
    const ele = document.getElementById('project-hero-preview');
    ele.src = global.projectFormData._noMD['image-hero'] || '.' + image
}

function listenProjectUploadImage(image) {
    const ele = document.getElementById('project-image-preview')
    ele.src = image || '.' + global.projectFormData.image
}

function listenProjectUploadHero(image) {
    const ele = document.getElementById('project-hero-preview');
    ele.src = image || '.' + global.projectFormData['image-hero']
}


///////////////////////
/// Other Functions ///
///////////////////////

function storeItems() {
    var data = {
        _noMD: {}
    }

    data.alt = document.getElementById('project-image-alt').value
    data['alt-hero'] = document.getElementById('project-hero-alt').value

    storeData(data)
}

// main call
main()