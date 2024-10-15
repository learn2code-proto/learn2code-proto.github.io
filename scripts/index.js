import "./blockly-instance.js";

console.log("prinsessasi on eri linnassa");

const darkmodeButton = document.getElementById('darkmode-button');
const copyCodeButton = document.getElementById('copy-code-button');
const codeContainer = document.getElementById('code-container');
const snackbar = document.getElementById('snackbar');

function displayOnSnackbar(text) {
  // Displays the given text on the snackbar for a time.
  snackbar.innerText = text;
  snackbar.className += ' view';

  setTimeout(function () {
    snackbar.innerText = '';
    snackbar.className = snackbar.className.replace(' view', '');
  }, 4250);
}

copyCodeButton.addEventListener('click', copyCodeToClipboard);

function copyCodeToClipboard() {
  // Copy all text in `code-container` to the clipboard and display a
  // message in the snackbar.
  navigator.clipboard.writeText(codeContainer.innerText);

  displayOnSnackbar('Copied code to clipboard!');
}

darkmodeButton.addEventListener('click', toggleDarkmode);

function toggleDarkmode() {
  // Toggles dark and light mode.
  if (darkmodeButton.innerText == 'Dark Mode') {
    document.body.className += ' darkmode';
    darkmodeButton.innerText = 'Light Mode';
  } else {
    document.body.className = document.body.className.replace(' darkmode', '');
    darkmodeButton.innerText = 'Dark Mode';
  }
}
