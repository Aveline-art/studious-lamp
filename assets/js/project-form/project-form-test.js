// TODO, remove this file from project-form.html to remove tests
// TODO, a way to perform tests on load, and then once tests are done, reverse all actions

document.addEventListener("DOMContentLoaded", function () {
    loadDummyData()
});

function loadDummyData() {
    addValue('project-name-input', 'Civic Tech Jobs');
    addValue('project-description', 'This is the description.');
    addValue('github-url', 'https://github.com/hackforla/CivicTechJobs');
    addValue('slack-url', 'https://slack.com/');
    addValue('website-url', 'https://aveline-art.github.io/studious-lamp/');
    addValue('wiki-url', 'https://github.com/Aveline-art/studious-lamp/wiki');
    addValue('technologies', 'Django\nReact\nFigma');
    addValue('tools', 'Wooden Rods\nRope\nPulleys');
    addValue('locations', 'Hippo\nMajordomo\nBestia');
}

function addValue(id, value) {
    document.getElementById(id).value = value
}