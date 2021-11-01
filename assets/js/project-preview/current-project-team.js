import { createDomObject, loremIpsum } from '../utility.js'

function main() {
    document.addEventListener('DOMContentLoaded', () => {
        const data = JSON.parse(localStorage.getItem('projectFormData'));
        const leaderCardsNode = document.getElementById('leader-cards');
        linkCreator(leaderCardsNode, data.leadership)
    })
}

function linkCreator(ele, args) {
    while (ele.firstChild) {
        ele.removeChild(ele.firstChild);
    }

    for (const item of args) {
        const leaderNode = createDomObject('div', {
            'class': 'leader-card',
        })

        const leaderGitHubNode = createDomObject('a', {
            'href': item.links.github || 'https://github.com/elizabethhonest',
            'target': '_blank',
            'title': 'GitHub Profile',
        })
        const leaderImgNode = createDomObject('img', {
            'class': 'leader-img',
            'src': item.picture || 'https://avatars.githubusercontent.com/elizabethhonest',
        })

        const leaderDivNode = createDomObject('div', {
            'class': 'leader-description',
        })

        const leaderNamePNode = createDomObject('p', {
            'class': 'leader-description-field',
        })
        const leaderNameStrongNode = createDomObject('strong', {})
        leaderNameStrongNode.innerText = 'Name: '
        const leaderSlackNode = createDomObject('a', {
            'target': 'blank',
            'title': 'Slack Direct Message'
        })
        leaderSlackNode.innerText = loremIpsum(item.name, 11)

        const leaderRolePNode = createDomObject('p', {
            'class': 'leader-description-field',
        })
        const leaderRoleStrongNode = createDomObject('strong', {})
        leaderRoleStrongNode.innerText = 'Role: '

        leaderGitHubNode.append(leaderImgNode);
        leaderNamePNode.append(leaderNameStrongNode, leaderSlackNode)
        leaderRolePNode.append(leaderRoleStrongNode, document.createTextNode(`${loremIpsum(item.role, 11)}`))
        leaderDivNode.append(leaderNamePNode, leaderRolePNode)

        leaderNode.append(leaderGitHubNode, leaderDivNode)
        ele.append(leaderNode)
    }
}

main()