// Import modules
var fs = require("fs");

// Global variables
var github;
var context;

/**
 * Formats the commandline instructions into a template, then posts it to the pull request.
 * @param {Object} g - github object  
 * @param {Object} c - context object 
 */
async function main({ g, c }) {
    github = g;
    context = c;

    console.log(JSON.parse(github))
    console.log(JSON.parse(context))

    const title = github.event.issue.title
    const body = github.event.issue.body
    const issueNum = context.payload.number 

    const newIssueComment = formatComment(title, body)
    postComment(issueNum, newIssueComment);
}

function formatComment(title, body) {
    const path = '/project-card-comment.md'
    const text = fs.readFileSync(path).toString('utf-8');
    const completedInstuctions = text.replace('${title}', title).replace('${body}', body)
    return completedInstuctions
}

async function postComment(issueNum, instructions) {
    try {
        await github.issues.update({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: issueNum,
            body: instructions,
        });
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = main