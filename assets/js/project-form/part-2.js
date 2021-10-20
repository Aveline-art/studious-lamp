import { toogleSeries } from '../utility.js';
import { global } from './state.js';


function main() {
    global.addStateListener('projectFormData', listenProjectFormData);
    loadListeners();
}

function loadListeners() {
    document.addEventListener("DOMContentLoaded", function () {
        loadNextButtonListener();
        loadBackButtonListener();
    });
}


///////////////////////
/// Event Listeners ///
///////////////////////

function loadNextButtonListener() {
    const ele = document.getElementById('next-button-2');
    ele.addEventListener('click', () => {
        storeItems();
        toogleSeries('form-parts', 'form-part-3');
    });
}

function loadBackButtonListener() {
    const ele = document.getElementById('back-button-2');
    ele.addEventListener('click', () => {
        storeItems();
        toogleSeries('form-parts', 'form-part-1');
    });
}


/////////////////////
/// State Setters ///
/////////////////////

function setProjectFormData(data) {
    global.projectFormData = data
}

///////////////////////
/// State Listeners ///
///////////////////////

// TODO set the listens of all the components from global.projectFormData, make sure to control for emptiness. When part 1 sets the projectFormdata, this function will populate the form

function listenProjectFormData(data) {
    document.getElementById('project-status').value = data.status
    document.getElementById('project-description').value = data.description
    document.getElementById('github-url').value = findLink(data.links, 'github')
    document.getElementById('slack-url').value = findLink(data.links, 'slack')
    document.getElementById('website-url').value = findLink(data.links, 'site')
    document.getElementById('wiki-url').value = findLink(data.links, 'wiki')
    document.getElementById('technologies').value = data.technologies.join('\n')
    document.getElementById('tools').value = data.tools.replaceAll(', ','\n')
    document.getElementById('locations').value = data.location.join('\n')
}


///////////////////////
/// Other Functions ///
///////////////////////

function findLink(links, website) {
    for (const link of links) {
        if (link.name.toLowerCase() == website.toLowerCase()) {
            return link.url
        }
    }
    return null
}

// TODO, store  global.projectFormData whole sale into local storage
function storeItems() {
    const data = localStorage.getItem('projectFormData');
    var projectFormData = data ? JSON.parse(data) : {}

    projectFormData.status = document.getElementById('project-status').value;
    projectFormData.description = document.getElementById('project-description').value;
    projectFormData.links = [
        {
            name: 'Github',
            url: document.getElementById('github-url').value,
        },
        {
            name: 'Slack',
            url: document.getElementById('slack-url').value,
        },
        {
            name: 'Website',
            url: document.getElementById('website-url').value,
        },
        {
            name: 'Wiki',
            url: document.getElementById('wiki-url').value,
        }
    ];
    projectFormData.technologies = document.getElementById('technologies').value.split('\n');
    projectFormData.tools = document.getElementById('tools').value.replaceAll('\n', ', ');
    projectFormData.locations = document.getElementById('locations').value.split('\n')
    projectFormData.programAreas = parseProgramAreas();

    getGitHubRepoId(projectFormData.githubURL).then((data) => {
        projectFormData.identification = data.id
        localStorage.setItem('projectFormData', JSON.stringify(projectFormData));
        setProjectFormData(projectFormData)
    });

    // second promise for repo languages
}

function parseProgramAreas() {
    const programAreas = document.getElementById('program-areas');
    const inputs = programAreas.getElementsByTagName('input');
    var arr = []
    for (const input of inputs) {
        if (input.checked) {
            arr.push(input.value);
        }
    }
    return arr
}

function getGitHubRepoId(link) {

    return new Promise((resolve) => {
        try {
            const [owner, repo] = parseGitHubURL(link)
            fetch(`https://api.github.com/repos/${owner}/${repo}`).then(response => resolve(response.json()))
        }
        catch {
            resolve('')
        }
    });
}

function parseGitHubURL(link) {
    const regexp = /github.com\/(.*)\/(.*)/i
    const results = link.match(regexp);
    return [results[1], results[2]]
}

// Main call
main()