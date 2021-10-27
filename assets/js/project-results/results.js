import { dataToMarkdown } from "./project-md.js";

function main() {
    document.addEventListener('DOMContentLoaded', () => {
        const data = JSON.parse(localStorage.getItem('projectFormData'));
        document.getElementById('data-markdown').innerText = dataToMarkdown(data)
    })
}

function dataMarkdownButton() {
    
}


// main call
main()