import { dataToMarkdown } from "./project-md.js";

const labels = ['project card update'].join(',')

function main() {
    document.addEventListener('DOMContentLoaded', () => {
        const data = JSON.parse(localStorage.getItem('projectFormData'));
        const markdownText = dataToMarkdown(data)
        // const issueText = markdownToIssue(data, markdownText)
        // document.getElementById('data-markdown').innerText = issueText
        document.getElementById('new-issue-link').href = encodeURI(`https://github.com/Aveline-art/studious-lamp/issues/new?title=Project Card Update: ${data.title}&body=${markdownText}&labels=${labels}`)
    })
}

///////////////////////
/// Event Listeners ///
///////////////////////

// unused for now
function markdownToIssue(data, markdown) {
    const text = `
### Overview

As a developer on the website, we have to make sure that the projects of our organization is up to date for our visitors. For this issue we will update the project card for ${data.title}

### Action Items

- [ ] Locate the project's markdown file, if it exists. Otherwise, create it.
- [ ] Verify that all required fields are there.
- [ ] Replace the file with the markdown located in the Instructions/Resources section below.

### Instructions/Resources

<details>
<summary>New markdown for ${data.title}</summary>
<br>
<pre>
${markdown}
</pre>
<br>
</details>
    `.trim()

    return text
}


// main call
main()