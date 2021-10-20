import { createDomObject } from '../utility.js'

function main() {
    document.addEventListener('DOMContentLoaded', () => {
        const data = JSON.parse(localStorage.getItem('projectFormData'));

        document.getElementById('project-status').innerText = data.status
        document.getElementById('project-location').innerText = joinArray(data.locations)
        const projectLinksNode = document.getElementById('project-links')
        linkCreator(projectLinksNode, data.links);
        document.getElementById('tools').innerText = joinArray(data.tools)
        document.getElementById('technologies').innerText = joinArray(data.technologies)
        document.getElementById('project-description').innerText = data.description
    })
}

function joinArray(arr) {
    if (arr) {
        return arr.join(', ')
    } else {
        return ''
    }
}

function linkCreator(ele, links) {
    while (ele.firstChild) {
        ele.removeChild(ele.firstChild);
    }

    for (const item of links) {
        if (item.url) {
            const linkNode = createDomObject('a', {
                'target': '_blank',
                'href': item.url,
            })
            linkNode.innerText = `${item.name}`
            ele.append(linkNode, document.createTextNode(", "))
        }
    }
    // Note, this seems inefficient, but the last comma must be removed retroactively because we are unsure when we will create the last link.
    ele.removeChild(ele.lastChild)
}

main()