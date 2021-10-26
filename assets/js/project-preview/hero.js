// Imports
import { loremIpsum } from '../utility.js'

function main() {
    document.addEventListener('DOMContentLoaded', () => {
        const data = JSON.parse(localStorage.getItem('projectFormData'));
        document.getElementById('projectName').innerText = loremIpsum(data.title, 20)
        document.getElementById('heroImage').setAttribute('style', `background-image: url(${determineHero(data) || './assets/images/projects/website-hero.jpg'});`)
    })
}

function determineHero(data) {
    if (data._noMD['image-hero']) {
        return data._noMD['image-hero']
    } else if (data['image-hero']) {
        return '.' + data['image-hero']
    }
}


// main call
main()