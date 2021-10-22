// Imports
import { loremIpsum } from '../utility.js'

function main() {
    document.addEventListener('DOMContentLoaded', () => {
        const data = JSON.parse(localStorage.getItem('projectFormData'));
        document.getElementById('projectName').innerText = loremIpsum(data.title, 20)
        document.getElementById('heroImage').setAttribute('style', `background-image: url(${data.projectHero || './assets/images/projects/website-hero.jpg'});`)
    })
}


// main call
main()