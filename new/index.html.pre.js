console.info('... pre script loaded');

function copyText(element) {
  window.navigator.clipboard.writeText(element.innerText);
}

function switchEditor() {
  document.getElementById('line-editor').toggleAttribute('data-closed');
  document.getElementById('block-editor').toggleAttribute('data-closed');
}
