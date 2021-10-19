import { createDomObject } from '../utility.js'

const gitHubURLBase = 'https://github.com/';
const gitHubAvatarURLBase = 'https://avatars.githubusercontent.com/';

function main() {
    document.addEventListener('DOMContentLoaded', () => {
        const data = JSON.parse(localStorage.getItem('projectFormData'));
        const leaderCardsNode = document.getElementById('leader-cards');
        linkCreator(leaderCardsNode, data.projectLeaders)
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
            'href': `${gitHubURLBase}${item.leaderGithub}`,
            'target': '_blank',
            'title': 'GitHub Profile',
        })
        const leaderImgNode = createDomObject('img', {
            'class': 'leader-img',
            'src': `${gitHubAvatarURLBase}${item.leaderGithub}`,
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
        leaderSlackNode.innerText = item.leaderName

        const leaderRolePNode = createDomObject('p', {
            'class': 'leader-description-field',
        })
        const leaderRoleStrongNode = createDomObject('strong', {})
        leaderRoleStrongNode.innerText = 'Role: '

        leaderGitHubNode.append(leaderImgNode);
        leaderNamePNode.append(leaderNameStrongNode, leaderSlackNode)
        leaderRolePNode.append(leaderRoleStrongNode, document.createTextNode(`${item.leaderRole}`))
        leaderDivNode.append(leaderNamePNode, leaderRolePNode)

        leaderNode.append(leaderGitHubNode, leaderDivNode)
        ele.append(leaderNode)
    }
}

main()