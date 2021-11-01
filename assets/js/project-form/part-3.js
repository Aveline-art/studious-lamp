// Imports
import { toggleSeries, createDomObject } from '../utility.js';
import { global, storeData } from './state.js';

// Globals
const gitHubURLBase = 'https://github.com/';
const gitHubAvatarURLBase = 'https://avatars.githubusercontent.com/';
const numLeadsInput = document.getElementById('num-leads');
const leaderShipRowsInput = document.getElementById('leadership-rows');

// main
function main() {
    setFields(global.projectFormData)
    global.addStateListener('rows', listenRows)
    global.projectFormData.addStateListener('leadership', listenLeaders)
    loadListeners();
}

// loadListeners
function loadListeners() {
    document.addEventListener("DOMContentLoaded", function () {
        loadNextButtonListener();
        loadBackButtonListener();
        loadNumLeadsInputListener();
    });
}


/////////////////////
/// Field Setters ///
/////////////////////

function setFields(leaders) {
    var num = leaders.length
    if (num < 1) {
        num = 1
    } else if (num > 10) {
        num = 10
    }

    constructLeadershipRows(num, leaders)
    numLeadsInput.value = num
}


///////////////////////
/// Event Listeners ///
///////////////////////

function loadNumLeadsInputListener() {
    numLeadsInput.addEventListener('input', (e) => {
        setRows(e.target.value)
    });
}

function loadNextButtonListener() {
    const ele = document.getElementById('next-button-3');
    ele.addEventListener('click', () => {
        storeItems();
        toggleSeries('form-parts', 'form-part-4');
    });
}

function loadBackButtonListener() {
    var ele = document.getElementById('back-button-3');
    ele.addEventListener('click', () => {
        storeItems();
        toggleSeries('form-parts', 'form-part-2');
    });
}

/////////////////////
/// State Setters ///
/////////////////////

function setRows(val) {
    if (val >= 1 & val <= 10) {
        global.rows = val;
    }
}


///////////////////////
/// State Listeners ///
///////////////////////

function listenRows(num) {
    const leadershipRows = leaderShipRowsInput
    var currentLen = leadershipRows.children.length

    while (currentLen < num) {
        leadershipRows.append(createRow(currentLen + 1));
        currentLen++
    }

    while (currentLen > num) {
        leadershipRows.removeChild(leadershipRows.lastChild)
        currentLen--
    }
}

function listenLeaders(data) {
    setFields(data)
}

///////////////////////
/// Other Functions ///
///////////////////////

function constructLeadershipRows(rows, leadership=[]) {
    const leadershipRows = leaderShipRowsInput
    while (leadershipRows.firstChild) {
        leadershipRows.removeChild(leadershipRows.firstChild);
    }

    for (let i = 0; i < rows; i++) {
        const rowNode = createRow(i+1, leadership[i])
        leadershipRows.append(rowNode);
    }
}

function createRow(rowNum, leader = null) {
    const rowNode = createDomObject('div', {
        'class': 'row mb-1',
        'id': `leader-${rowNum}`,
    })

    const col1 = createDomObject('div', { 'class': 'col-1' });
    const child1 = document.createTextNode(`${rowNum}`);
    col1.appendChild(child1);

    const col2 = createDomObject('div', { 'class': 'col-4' });
    const child2 = createDomObject('input', {
        'type': 'text',
        'class': 'form-control',
        'name': 'leaderName',
    });
    col2.append(child2);

    const col3 = createDomObject('div', { 'class': 'col-3' });
    const child3 = createDomObject('input', {
        'type': 'text',
        'class': 'form-control',
        'name': 'leaderRole',
    });
    col3.append(child3);

    const col4 = createDomObject('div', { 'class': 'col-4' });
    const child4 = createDomObject('input', {
        'type': 'text',
        'class': 'form-control',
        'name': 'leaderGithub',
    });
    col4.append(child4);

    if (leader) {
        child2.value = leader.name
        child3.value = leader.role
        child4.value = parseGitHubToUser(leader.links.github)
    } else {
        child2.value = ''
        child3.value = ''
        child4.value = ''
    }

    rowNode.append(col1, col2, col3, col4);
    return rowNode
}

function parseGitHubToUser(link) {
    const regexp = /github.com\/(.*)/i
    const results = link.match(regexp)
    if (results) {
        return results[1]
    }
}

function storeItems() {
    var data = {}
    data.leadership = gatherLeaders();
    storeData(data);
}

function gatherLeaders() {
    const leaderShipInfoObj = {
        'leaderName': 'name',
        'leaderRole': 'role',
        'leaderGithub':'github',
    }

    var children = leaderShipRowsInput.childNodes;
    var leaders = []
    for (const child of children) {
        var leader = {}
        leader.links = {}

        const inputs = child.getElementsByTagName('input');
        for (const input of inputs) {
            const value = input.value

            if (input.name == 'leaderGithub') {
                leader['links'][leaderShipInfoObj[input.name]] = value ? `${gitHubURLBase}${value}` : ''
                leader['picture'] = value ? `${gitHubAvatarURLBase}${value}` : ''
            } else {
                leader[leaderShipInfoObj[input.name]] = value;
            }
        }
        leaders.push(leader);
    }
    return leaders
}

// main call
main()