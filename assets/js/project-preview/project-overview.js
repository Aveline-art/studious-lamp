import { createDomObject, loremIpsum } from '../utility.js'

function main() {
    document.addEventListener('DOMContentLoaded', () => {
        const data = JSON.parse(localStorage.getItem('projectFormData'));

        setStatusIndicator(document.getElementById('project-status'), data.status)
        document.getElementById('project-location').innerText = joinArray(loremIpsum(data.location, 2))
        const projectLinksNode = document.getElementById('project-links')
        linkCreator(projectLinksNode, data.links);
        document.getElementById('tools').innerText = loremIpsum(data.tools, 20)
        document.getElementById('languages').innerText = joinArray(loremIpsum(data._noMD.language, 3))
        document.getElementById('technologies').innerText = joinArray(loremIpsum([...data.technologies, ...data._noMD['other-technologies']], 3))
        document.getElementById('project-description').innerText = loremIpsum(data.description, 445)
    })
}

function setStatusIndicator(ele, status) {
    const indicators = {
        'active': 'status-Active',
        'on hold': 'status-On-Hold', // note: this class does not currently exist; the website uses the default yellow color, instead
        'completed': 'status-Completed',
        'rebooting': 'status-Rebooting',
    }

    ele.innerText = loremIpsum(status, 6)
    const parent = ele.parentElement
    parent.classList.add(status ? indicators[status.toLowerCase()] : 'status-Active')
}

function joinArray(arr) {
    arr = arr.filter((i) => i != '');
    if (arr) {
        return arr.sort().join(', ')
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
            const linkNode = createLinkDOM(item);
            ele.append(linkNode, document.createTextNode(", "));
        }
    }

    if (!ele.hasChildNodes()) {
        const linkNode = createLinkDOM({ name: 'Lorem', url: '' });
        ele.append(linkNode, document.createTextNode(", "));
    }
    // Note, this seems inefficient, but the last comma must be removed retroactively because we are unsure when we will create the last link.
    ele.removeChild(ele.lastChild)
}

function createLinkDOM(item) {
    const linkNode = createDomObject('a', {
        'target': '_blank',
        'href': item.url,
    })
    linkNode.innerText = `${item.name}`
    return linkNode
}

main()