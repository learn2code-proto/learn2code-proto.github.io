import "./blockly-core.js";

console.log("prinsessasi on eri linnassa");

const copyCodeButton = document.getElementById('save-code');
copyCodeButton.addEventListener('click', copyCodeToClipboard);

// Copy all text in `code-container` to the clipboard and displays a message in
// the snackbar.
function copyCodeToClipboard() {
    const codeContainer = document.getElementById('code-container');
    const snackbar = document.getElementById('snackbar');

    navigator.clipboard.writeText(codeContainer.innerText);

    snackbar.innerText = 'Copied code to clipboard!';
    snackbar.className = 'view';

    setTimeout(function () {
        snackbar.className = snackbar.className.replace('view', '');
        snackbar.innerText = '';
    }, 4500);
}
