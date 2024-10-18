export { root, displayOnSnackbar };

const root = document.querySelector(':root');
const darkmodeButton = document.getElementById('darkmode-button');
const snackbar = document.getElementById('snackbar');

function displayOnSnackbar(text) {
  // Displays the given text on the snackbar for a time.
  snackbar.innerText = text;
  snackbar.classList.add('view');

  setTimeout(function () {
    snackbar.innerText = '';
    snackbar.classList.remove('view');
  }, 3250);
}

darkmodeButton.addEventListener('click', toggleDarkmode);

function toggleDarkmode() {
  // Toggles dark and light mode.
  root.classList.toggle('darkmode');
}
