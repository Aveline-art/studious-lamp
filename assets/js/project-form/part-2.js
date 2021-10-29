import { toogleSeries } from '../utility.js';
import { global, storeData } from './state.js';


function main() {
    setFields(global.projectFormData);
    global.addStateListener('projectFormData', listenProjectFormData);
    loadListeners();
}

function loadListeners() {
    document.addEventListener("DOMContentLoaded", function () {
        loadNextButtonListener();
        loadBackButtonListener();
    });
}


/////////////////////
/// Field Setters ///
/////////////////////

function setFields(data) {
    document.getElementById('project-status').value = data.status
    document.getElementById('project-description').value = data.description
    document.getElementById('github-url').value = findLink(data.links, 'github')
    document.getElementById('slack-url').value = findLink(data.links, 'slack')
    document.getElementById('website-url').value = findLink(data.links, 'site')
    document.getElementById('wiki-url').value = findLink(data.links, 'wiki')
    document.getElementById('tools').value = data.tools.replaceAll(', ','\n')
    document.getElementById('locations').value = data.location.join('\n')
    setCheckBoxFields(data['program-area'], document.getElementById('program-areas'))
    setCheckBoxFields(data.technologies, document.getElementById('technologies'))
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
    setFields(data)
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

function setCheckBoxFields(arr, element) {
    arr = arr.map(name => name.toLowerCase());
    const inputs = element.getElementsByTagName('input');
    for (const input of inputs) {
        input.checked = false
        if (arr.includes(input.value.toLowerCase())) {
            input.checked = true
        }
    }
}

function storeItems() {
    var data = {
        _noMD: {}
    }

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
    data['program-area'] = parseProgramArea();

    // TODO this needs to be skipped if identification is retrieved from existing data, or if no GH link is given
    const gitHubURL = findLink(data.links, 'github')
    if (gitHubURL) {
        const [owner, repo] = parseGitHubURL(gitHubURL)
        const repoIdPromise = getGitHubRepoId(owner, repo)
        const repoLanguagePromise = getGitHubRepoLanguage(owner, repo)

        Promise.all([repoIdPromise, repoLanguagePromise]).then((results) => {
            data.identification = results[0].id.toString()
            data._noMD.language = Object.keys(results[1])
            storeData(data)
        });
    } else {
        storeData(data)
    }
}

function parseProgramArea() {
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

function getGitHubRepoId(owner, repo) {
    return new Promise((resolve) => {
        try {
            fetch(`https://api.github.com/repos/${owner}/${repo}`)
                .then(response => { 
                    if (response.status == 200) {
                        resolve(response.json()) 
                    } else {
                        resolve(null)
                    }
                })
        }
        catch {
            resolve('')
        }
    });
}

function getGitHubRepoLanguage(owner, repo) {
    return new Promise((resolve) => {
        try {
            fetch(`https://api.github.com/repos/${owner}/${repo}/languages`)
                .then(response => { 
                    if (response.status == 200) {
                        resolve(response.json()) 
                    } else {
                        resolve(null)
                    }
                })
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