---
---
// Imports
import { createState, createNestedState, deep } from "../utility.js";

// Globals
var global;
var globalRunner;

const projectData = {
    {% for project in site.projects %}
        {{ project.identification }} : {{ project | jsonify }},
    {% endfor %}
}

var initialState = {
    isNew: true,
    rows: 1,
}

var initialStateNestedProjectFormData = {
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
    status: 'Active',
    'program-area': [],
}

function main() {
    [global, globalRunner] = createState(deep(initialState))
    createNestedState(global, globalRunner, 'projectFormData', deep(initialStateNestedProjectFormData))

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
}

function storeData(data) {
    setProjectFormData(data)
    localStorage.setItem('projectFormData', JSON.stringify(global.projectFormData));
}

function clearData() {
    localStorage.clear();
    console.log('data has been cleared')
    setProjectFormData(deep(initialStateNestedProjectFormData))
    localStorage.setItem('projectFormData', JSON.stringify(global.projectFormData));
}

// Main call
main()

export { global, projectData, clearData, setProjectFormData, storeData };