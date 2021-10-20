import { createDomObject } from '../utility.js'

const svgLinks = {
    'github': './assets/images/svgs/icon-github-color.svg',
    'slack': './assets/images/svgs/icon-slack-color.svg',
}

const svgDefault = './assets/images/svgs/ionicons_svg_ios-link.svg'

function main() {
    document.addEventListener('DOMContentLoaded', () => {
        const data = JSON.parse(localStorage.getItem('projectFormData'));
        const resourceCardsNode = document.getElementById('resource-cards')
        linkCreator(resourceCardsNode, data.links);
    })
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
                'class': 'resource-link',
            })
            const listNode = createDomObject('li', {
                'class': 'resource-card'
            })

            const imageDivNode = createDomObject('div', {
                'class': 'resource-img',
            })
            const imageNode = createDomObject('img', {
                'src': getDefault(svgLinks, item.name, svgDefault)
            })
            imageDivNode.append(imageNode);

            const titleDivNode = createDomObject('div', {
                'class': 'resource-body',
            })
            const titleNode = createDomObject('h4', {
                'class': 'resource-title'
            })
            titleNode.innerText = item.name
            titleDivNode.append(titleNode)

            listNode.append(imageDivNode, titleDivNode)
            linkNode.append(listNode)
            ele.append(linkNode)
        }
    }
}

function getDefault(dict, field, option) {
    const result = dict[field.toLowerCase()]
    return result ? result : option
}

main()