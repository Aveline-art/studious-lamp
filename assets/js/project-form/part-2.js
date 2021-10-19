import { toogleSeries } from '../utility.js';
import { global } from './state.js';


function main() {
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

// TODO set the state of all the components from global.projectFormData, make sure to control for emptiness


///////////////////////
/// State Listeners ///
///////////////////////


///////////////////////
/// Other Functions ///
///////////////////////

// TODO, store  global.projectFormData whole sale into local storage
function storeItems() {
    const data = localStorage.getItem('projectFormData');
    var projectFormData = data ? JSON.parse(data) : {}

    projectFormData.projectStatus = document.getElementById('project-status').value;
    projectFormData.projectDescription = document.getElementById('project-description').value;
    projectFormData.githubURL = {
        name: 'Github',
        link: document.getElementById('github-url').value,
    };
    projectFormData.slackURL = {
        name: 'Slack',
        link: document.getElementById('slack-url').value,
    };
    projectFormData.websiteURL = {
        name: 'Website',
        link: document.getElementById('website-url').value,
    };
    projectFormData.wikiURL = {
        name: 'Wiki',
        link: document.getElementById('wiki-url').value,
    };
    projectFormData.technologies = document.getElementById('technologies').value.split('\n');
    projectFormData.tools = document.getElementById('tools').value.split('\n');
    projectFormData.locations = document.getElementById('locations').value.split('\n')
    projectFormData.programAreas = parseProgramAreas();

    getGitHubRepoId(projectFormData.githubURL).then((data) => {
        projectFormData.identification = data.id
        localStorage.setItem('projectFormData', JSON.stringify(projectFormData));
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