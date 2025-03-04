console.info('... pre script loaded');

function copyText(element) {
  window.navigator.clipboard.writeText(element.innerText);
}

function saveText(element) {
  const encoding = btoa(element.innerText);
  const dummyLink = document.createElement('a');

  dummyLink.download = 'main.py';
  dummyLink.href = 'data:text/python;base64,' + encoding;
  dummyLink.dispatchEvent(new MouseEvent('click'));
}

function switchEditor() {
  document.getElementById('line-editor').toggleAttribute('data-closed');
  document.getElementById('block-editor').toggleAttribute('data-closed');
}
