// Imports
import { toggleSeries } from '../utility.js';
import { global, storeData } from './state.js';

// Globals
const statusInput = document.getElementById('project-status')
const descriptionInput =document.getElementById('project-description')
const githubInput = document.getElementById('github-url')
const slackInput = document.getElementById('slack-url')
const websiteInput = document.getElementById('website-url')
const wikiInput = document.getElementById('wiki-url')
const toolsInput = document.getElementById('tools')
const locationsInput = document.getElementById('locations')
const programAreasInput = document.getElementById('program-areas')
const technologiesInput  = document.getElementById('technologies')
const otherTechnologiesInput = document.getElementById('other-technologies')


// main
function main() {
    setFields(global.projectFormData);
    global.addStateListener('projectFormData', listenProjectFormData);
    loadListeners();
}

// loadListeners
function loadListeners() {
    document.addEventListener("DOMContentLoaded", function () {
        loadOtherCheckboxListener();
        loadNextButtonListener();
        loadBackButtonListener();
    });
}


/////////////////////
/// Field Setters ///
/////////////////////

function setFields(data) {
    statusInput.value = data.status
    descriptionInput.value = data.description
    githubInput.value = findLink(data.links, 'github')
    slackInput.value = findLink(data.links, 'slack')
    websiteInput.value = findLink(data.links, 'site')
    wikiInput.value = findLink(data.links, 'wiki')
    toolsInput.value = data.tools.replaceAll(', ','\n')
    locationsInput.value = data.location.join('\n')
    setCheckBoxFields(data['program-area'], programAreasInput)
    setCheckBoxFields(data.technologies, technologiesInput)
}


///////////////////////
/// Event Listeners ///
///////////////////////

function loadOtherCheckboxListener() {
    const ele = document.getElementById('other-checkbox');
    ele.addEventListener('change', (e) => {
        toggleTechnologies(e)
    })
}

function loadNextButtonListener() {
    const ele = document.getElementById('next-button-2');
    ele.addEventListener('click', () => {
        storeItems();
        toggleSeries('form-parts', 'form-part-3');
    });
}

function loadBackButtonListener() {
    const ele = document.getElementById('back-button-2');
    ele.addEventListener('click', () => {
        storeItems();
        toggleSeries('form-parts', 'form-part-1');
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

function toggleTechnologies(e) {
    const ele = otherTechnologiesInput.parentElement;
    if (e.target.checked) {
        ele.removeAttribute('hidden');
    } else {
        ele.setAttribute('hidden', '');
    }
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

    data.status = statusInput.value;
    data.description = descriptionInput.value;
    data.links = [
        {
            name: 'Github',
            url: githubInput.value,
        },
        {
            name: 'Slack',
            url: slackInput.value,
        },
        {
            name: 'Website',
            url: websiteInput.value,
        },
        {
            name: 'Wiki',
            url: wikiInput.value,
        }
    ];
    data.technologies = parseCheckboxFields(technologiesInput).filter((v) => v != 'Other');
    data.tools = toolsInput.value.replaceAll('\n', ', ');
    data.location = locationsInput.value.split('\n')
    data['program-area'] = parseCheckboxFields(programAreasInput);
    data._noMD['other-technologies'] = otherTechnologiesInput.value.split('\n')

    const gitHubURL = findLink(data.links, 'github')
    if (gitHubURL) {
        const [owner, repo] = parseGitHubURL(gitHubURL)
        const repoIdPromise = getGHAPIData(`https://api.github.com/repos/${owner}/${repo}`)
        const repoLanguagePromise = getGHAPIData(`https://api.github.com/repos/${owner}/${repo}/languages`)

        Promise.all([repoIdPromise, repoLanguagePromise]).then((results) => {
            data.identification = results[0].id.toString()
            data._noMD.language = Object.keys(results[1])
            storeData(data)
        });
    } else {
        storeData(data)
    }
}

function parseCheckboxFields(ele) {
    const inputs = ele.getElementsByTagName('input');
    var arr = []
    for (const input of inputs) {
        if (input.checked) {
            arr.push(input.value);
        }
    }
    return arr
}

function parseGitHubURL(link) {
    const regexp = /github.com\/(.*?)\/(.*)/i
    const results = link.match(regexp);
    return [results[1].replace('/', ''), results[2].replace('/', '')]
}

function getGHAPIData(apiLink) {
    return new Promise((resolve) => {
        try {
            fetch(apiLink)
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


// Main call
main()