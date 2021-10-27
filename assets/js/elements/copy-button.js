function main() {
    document.addEventListener('DOMContentLoaded', () => {
        const copyButton = document.getElementById('copy-button')
        const copyButtonText = document.getElementById('copy-text')
        copyButtonText.innerText = 'Click to copy'
        copyButton.addEventListener('click', () => {
            const text = document.getElementById(copyButton.dataset.target).innerText
            navigator.clipboard.writeText(text)
            copyButtonText.innerText = 'Copied!'
            setTimeout(() => {
                copyButtonText.innerText = 'Click to copy'
            }, 1500);
        })
    })
}

main()