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
}

var global = createState(initialState)

export { global };