const data = JSON.parse(localStorage.getItem('projectData'));

console.log(data)

document.getElementById('projectName').innerText = data.projectName
const hero = document.getElementById('heroImage').setAttribute('style', `
background-image: url(${data.projectHero});`)