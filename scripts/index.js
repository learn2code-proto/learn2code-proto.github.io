import "./blockly-instance.js";
import { displayOnSnackbar } from './core.js';

const copyCodeButton = document.getElementById('copy-code-button');
const codeContainer = document.getElementById('code-container');

copyCodeButton.addEventListener('click', copyCodeToClipboard);

function copyCodeToClipboard() {
  // Copy all text in `code-container` to the clipboard and display a
  // message in the snackbar.
  navigator.clipboard.writeText(codeContainer.innerText);

  displayOnSnackbar('Copied code to clipboard!');
}
