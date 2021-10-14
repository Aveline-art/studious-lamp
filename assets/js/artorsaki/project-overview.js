function main() {
    document.addEventListener('DOMContentLoaded', () => {
        const data = JSON.parse(localStorage.getItem('projectData'));

        document.getElementById('project-status').innerText = data.projectStatus
        document.getElementById('project-location').innerText = joinArray(data.locations)

        // TODO, complex creator
        document.getElementById('project-links').innerText

        document.getElementById('tools').innerText = joinArray(data.tools)
        document.getElementById('technologies').innerText = joinArray(data.technologies)
        document.getElementById('project-description').innerText = data.projectDescription
        
    })
}

function joinArray(arr) {
    if (arr) {
        return arr.join(', ')
    } else {
        return ''
    }
}

main()