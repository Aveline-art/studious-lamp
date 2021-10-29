---
---
// Imports
import { createState, deep } from "../utility.js";

// Globals
var global;

const projectData = {
    {% for project in site.projects %}
        {{ project.identification }} : {{ project | jsonify }},
    {% endfor %}
}

var initialState = {
    newOrExisting: '1',
    rows: 1,
    projectFormData: {
        identification: '',
        title: '',
        description: '',
        image: '',
        alt: '',
        'image-hero': '',
        'alt-hero': '',
        leadership: [],
        links: [],
        looking: [],
        technologies: [],
        tools: '',
        location: [],
        partner: '',
        visible: true,
        'program-area': [],
        status: 'Active',
        _noMD: {
            language: [],
            image: '',
            'image-hero': ''
        }
    }
}

function main() {
    global = createState(initialState)
    const data = localStorage.getItem('projectFormData')
    var parsedData = data ? JSON.parse(data) : {}
    if (parsedData) {
        storeData(parsedData)
    } else {
        localStorage.setItem('projectFormData', global.projectFormData)
    }
}

//////////////////////////////////
/// State Management Functions ///
//////////////////////////////////

/**
 * Adds, rather than replace, the data into projectFormData
 * @param {Object} data 
 */
function setProjectFormData(data) {
    Object.assign(global.projectFormData, data)
    global.runStateListener('projectFormData', global.projectFormData)
}

function storeData(data) {
    setProjectFormData(data)
    localStorage.setItem('projectFormData', JSON.stringify(global.projectFormData));
}

function clearData() {
    localStorage.clear();
    console.log('data has been cleared')
    setProjectFormData(deep(initialState.projectFormData))
    localStorage.setItem('projectFormData', JSON.stringify(global.projectFormData));
}

function loadAndStoreData() {
    const data = JSON.parse(localStorage.getItem('projectFormData'));
    storeData(data)
}

// Main call
main()

export { global, projectData, clearData, storeData, loadAndStoreData };