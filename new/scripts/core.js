export  { root
        , displayOnSnackbar
        , c_fg1,      c_fg2
        , c_bg1,      c_bg2
        , c_primary,  c_secondary,  c_tertiary
        , c_red,      c_green,      c_blue
        , c_cyan,     c_yellow,     c_magenta
        , updateColors
        };

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

// Colors.
var c_fg1;
var c_fg2;
var c_bg1;
var c_bg2;
var c_primary;
var c_secondary;
var c_tertiary;
var c_red;
var c_green;
var c_blue;
var c_cyan;
var c_yellow;
var c_magenta;

updateColors();

function updateColors() {
  // Updates colors to match the current root style.
  let rootStyles = getComputedStyle(root);
  let getColor = color => rootStyles.getPropertyValue(color);
  c_fg1 = getColor('--fg-1');
  c_fg2 = getColor('--fg-2');
  c_bg1 = getColor('--bg-1');
  c_bg2 = getColor('--bg-2');
  c_primary = getColor('--primary');
  c_secondary = getColor('--secondary');
  c_tertiary = getColor('--tertiary');
  c_red = getColor('--red');
  c_green = getColor('--green');
  c_blue = getColor('--blue');
  c_cyan = getColor('--cyan');
  c_yellow = getColor('--yellow');
  c_magenta = getColor('--magenta');  
}
