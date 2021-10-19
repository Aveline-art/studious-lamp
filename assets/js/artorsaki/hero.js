function main() {
    document.addEventListener('DOMContentLoaded', () => {
        const data = JSON.parse(localStorage.getItem('projectFormData'));
        document.getElementById('projectName').innerText = data.projectName
        document.getElementById('heroImage').setAttribute('style', `background-image: url(${data.projectHero});`)
    })
}


// main call
main()