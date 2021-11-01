import { dataToMarkdown } from "./project-md.js";

const labels = ['project card update'].join(',')

function main() {
    document.addEventListener('DOMContentLoaded', () => {
        const data = JSON.parse(localStorage.getItem('projectFormData'));
        const markdownText = dataToMarkdown(data)
        document.getElementById('new-issue-link').href = encodeURI(`https://github.com/Aveline-art/studious-lamp/issues/new?title=Project Card Update: ${data.title}&body=${markdownText}&labels=${labels}`)
    })
}

// main call
main()