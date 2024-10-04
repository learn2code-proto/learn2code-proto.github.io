import "./blockly-core.js";

console.log("prinsessasi on eri linnassa");

const copyCodeButton = document.getElementById('copy-code-button');
const codeContainer = document.getElementById('code-container');
const snackbar = document.getElementById('snackbar');

function displayOnSnackbar(text) {
    // Displays the given text on the snackbar for a time.
    snackbar.innerText = text;
    snackbar.className = 'view';

    setTimeout(function () {
        snackbar.className = snackbar.className.replace('view', '');
        snackbar.innerText = '';
    }, 4500);
}

copyCodeButton.addEventListener('click', copyCodeToClipboard);

function copyCodeToClipboard() {
    // Copy all text in `code-container` to the clipboard and displays a
    // message in the snackbar.
    navigator.clipboard.writeText(codeContainer.innerText);

    displayOnSnackbar('Copied code to clipboard!');
}
