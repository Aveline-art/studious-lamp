---
---
import { createState } from "../utility.js";

const projectData = {
    {% for project in site.projects %}
    {{ project.identification }} : {{ project | jsonify }},
    {% endfor %}
}

var initialState = {
    isNew: true,
    rows: 1,
    projectFormData: {
        title: '',
        status: 'Active',
        description: '',
        links: [],
        technologies: [],
        tools: '',
        location: [],
        'program-area': [],
    },
}

function clearData() {
    localStorage.clear()
    console.log('local storage has been cleaned')
    setProjectFormData({...initialState.projectFormData})
    localStorage.setItem('projectFormData', JSON.stringify(global.projectFormData));
}

function storeData(data) {
    setProjectFormData(data)
    localStorage.setItem('projectFormData', JSON.stringify(global.projectFormData));
}

function setProjectFormData(data) {
    global.projectFormData = data
}

var global = createState({...initialState})
const data = localStorage.getItem('projectFormData')
if (data) {
    storeData(data)
} else {
    localStorage.setItem('projectFormData', global.projectFormData)
}

export { global, projectData, clearData, setProjectFormData, storeData };