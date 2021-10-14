function main() {
    document.addEventListener('DOMContentLoaded', () => {
        const data = JSON.parse(localStorage.getItem('projectData'));

        document.getElementById('project-status').innerText = data.projectStatus
        document.getElementById('project-location').innerText = data.projectLocation

        // TODO, complex creator
        document.getElementById('project-links').innerText

        // TODO, array and error catch if none
        document.getElementById('tools').innerText

        // TODO, array and error catch if none
        document.getElementById('technologies').innerText

        document.getElementById('project-description').innerText = data.projectDescription
        
    })
}

main()