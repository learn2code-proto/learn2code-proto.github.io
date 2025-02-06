console.info('... pre script loaded');

function copyText(element) {
  window.navigator.clipboard.writeText(element.innerText);
}
