function dataToMarkdown(data) {
    var projectMdTemplate = `
    ---
identification: ${data.identification}
title: ${data.title}
description: ${data.description}
image: ${data._noMD.image ? 'see new image in post' : data.image}
alt: ${data.alt}
image-hero: ${data._noMD.image ? 'see new image in post' : data['image-hero']}
alt-hero: ${data['alt-hero']}
leadership: ${formatLeadership(data.leadership).join('')}
links: ${formatLinks(data.links).join('')}
looking: ${formatLooking(data.looking).join('')}
technologies: ${'\n  -' + data.technologies.join('\n  -')}
tools: ${data.tools}
location: ${'\n  -' + data.location.join('\n  -')}
visible: ${data.visible}
status: ${data.status}
program-area: ${'\n  -' + data['program-area'].join('\n  -')}
---
`

    return projectMdTemplate.trim()
}

function formatLeadership(data) {
    var arr = []
    for (const obj of data) {
        var formatText = `
  - name: ${obj.name}
    role: ${obj.role}
    links:
      slack: ${obj.links.slack}
      github: ${obj.links.github}
    picture: ${obj.picture}`
        
        arr.push(formatText)
    }

    return arr
}

function formatLinks(data) {
    var arr = []
    for (const obj of data) {
        var formatText = `
  - name: ${obj.name}
    url: ${obj.url}`
        
        arr.push(formatText)
    }

    return arr
}

function formatLooking(data) {
    var arr = []
    for (const obj of data) {
        var formatText = `
  - category: ${obj.category}
    skill: ${obj.skill}`
        
        arr.push(formatText)
    }

    return arr
}

export { dataToMarkdown };