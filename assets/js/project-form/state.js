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
    newOrExisting: '0',
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
            'image-hero': '',
            'other-technologies': []
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
 * Adds, rather than replace, the data into the global proxy. This will preserve the proxy object.
 * @param {Object} data
 */
function setProjectFormData(data) {
    Object.assign(global.projectFormData, data)
    global.runStateListener('projectFormData', global.projectFormData)
}

/**
 * Stores data into both the global Proxy and localStorage.
 * @param {Object} data
 */
function storeData(data) {
    setProjectFormData(data)
    localStorage.setItem('projectFormData', JSON.stringify(global.projectFormData));
}

/**
 * Clears information in both the global Proxy and localStorage.
 */
function clearData() {
    localStorage.clear();
    console.log('data has been cleared')
    storeData(deep(initialState.projectFormData))
}


/**
 * Takes information from localStorage and places it into the global Proxy.
 */
function loadLocalStorageData() {
    const data = JSON.parse(localStorage.getItem('projectFormData'));
    storeData(data)
}

// Main call
main()

export { global, projectData, clearData, storeData, loadLocalStorageData };