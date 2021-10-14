import { createDomObject } from '../utility.js'

function main() {
    document.addEventListener('DOMContentLoaded', () => {
        const data = JSON.parse(localStorage.getItem('projectData'));

        document.getElementById('project-status').innerText = data.projectStatus
        document.getElementById('project-location').innerText = joinArray(data.locations)
        const projectLinksNode = document.getElementById('project-links')
        linkCreator(projectLinksNode, data.githubURL, data.slackURL, data.websiteURL, data.wikiURL);
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

function linkCreator(ele, ...args) {
    while (ele.firstChild) {
        ele.removeChild(ele.firstChild);
    }

    for (const item of args) {
        if (item.link) {
            const linkNode = createDomObject('a', {
                'target': '_blank',
                'href': item.link,
            })
            linkNode.innerText = `${item.name}`
            ele.append(linkNode, document.createTextNode(", "))
        }
    }
    // Note, this seems inefficient, but the last comma must be removed retroactively because we are unsure when we will create the last link.
    ele.removeChild(ele.lastChild)
}

main()