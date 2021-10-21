import { toogleSeries } from '../utility.js';
import { global, storeData } from './state.js';


function main() {
    global.addStateListener('projectFormData', listenProjectFormData);
    loadListeners();
    constructFields(global.projectFormData)
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

///////////////////////
/// State Listeners ///
///////////////////////

function listenProjectFormData(data) {
    constructFields(data)
}


///////////////////////
/// Other Functions ///
///////////////////////

function constructFields(data) {
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

function findLink(links, website) {
    for (const link of links) {
        if (link.name.toLowerCase() == website.toLowerCase()) {
            return link.url
        }
    }
    return null
}

function storeItems() {
    var data = {}

    data.status = document.getElementById('project-status').value;
    data.description = document.getElementById('project-description').value;
    data.links = [
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
    data.technologies = document.getElementById('technologies').value.split('\n');
    data.tools = document.getElementById('tools').value.replaceAll('\n', ', ');
    data.location = document.getElementById('locations').value.split('\n')
    data['program-area'] = parseProgramAreas();

    // TODO this needs to be skipped if identification is retrieved from existing data, or if no GH link is given
    getGitHubRepoId(findLink(data.links, 'github')).then((results) => {
        if (results) {
            data.identification = results.id.toString()
        }
        storeData(data)
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
    return arr.join(', ')
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
    const regexp = /github.com\/(.*?)\/(.*)/i
    const results = link.match(regexp);
    return [results[1].replace('/', ''), results[2].replace('/', '')]
}

// Main call
main()