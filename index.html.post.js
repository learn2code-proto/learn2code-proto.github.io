console.info("... post script loaded");

import { toolbox } from "./module-scripts/blocks.js";
import { getTheme } from "./module-scripts/themes.js";

/* ---------------- Mode help text toggle ---------------- */
const helpEl = document.getElementById("mode-help");
const helpCopy = {
  block:
    "For the block coder: Drag blocks from the left-most column into the middle column. A preview of your code will appear on the right.",
  line:
    "For the line coder: Type Python in the editor. Press Enter for a new line and Tab for indentation/autocomplete. Use Copy or Save to export your code."
};
function setModeHelp(mode) {
  if (!helpEl) return;
  helpEl.dataset.mode = mode;
  helpEl.textContent = helpCopy[mode];
}
/* ------------------------------------------------------- */

/* ---------------- Blockly setup ------------------------ */
var workspace = Blockly.inject("blockly-canvas", {
  theme: getTheme(),
  toolbox: toolbox,
});

const supportedEvents = new Set([
  Blockly.Events.BLOCK_CHANGE,
  Blockly.Events.BLOCK_CREATE,
  Blockly.Events.BLOCK_DELETE,
  Blockly.Events.BLOCK_MOVE,
]);

workspace.addChangeListener((event) => {
  if (workspace.isDragging()) return;
  if (!supportedEvents.has(event.type)) return;

  const code = Blockly.Python.workspaceToCode(workspace);
  const codeContainer = document.getElementById("line-preview-text");

  codeContainer.innerHTML = Prism.highlight(
    "import make\n\n" + code,
    Prism.languages.python,
    "python"
  );
});
/* ------------------------------------------------------- */

/* ---------------- Line editor setup -------------------- */
const codeInput = document.getElementById("code-input");
const suggestionBox = document.getElementById("suggestion-box");
const codeEditorContainer = document.querySelector(".code-editor-container");

if (codeEditorContainer && codeInput) {
  codeEditorContainer.addEventListener("click", () => codeInput.focus());
} else {
  console.error("Could not find code editor container or input element.");
}

const keywords = [
  ".wait(", ".wait_until(", ".wait_while(", ".button(", ".pressed(", ".held(",
  ".smallmotor(", ".largemotor(", ".spin(", ".spin_back(", ".stop(",
  ".drivetrain(", ".drive(", ".drive_back(", ".turn(", ".turn_back(",
  ".curve(", ".curve_back(",
];

function applyInitialHighlighting() {
  const code = codeInput.innerText;
  const highlightedCode = Prism.highlight(code, Prism.languages.python, "python");
  codeInput.innerHTML = highlightedCode;
}

document.addEventListener("DOMContentLoaded", () => {
  // Initial UI state: block is visible (no data-closed), line is hidden (has data-closed)
  setModeHelp("block");
  applyInitialHighlighting();
});

/* ---------------- Toggle logic (presence-based) -------- */
function isClosed(el) {
  return el?.hasAttribute("data-closed");
}
function show(el) {
  el?.removeAttribute("data-closed");
}
function hide(el) {
  // presence alone means hidden; value doesn't matter
  el?.setAttribute("data-closed", "");
}

function switchEditor() {
  const blockEditor = document.getElementById("block-editor");
  const lineEditor  = document.getElementById("line-editor");

  const goingToLine = !isClosed(blockEditor); // if block is visible, go to line

  if (goingToLine) {
    hide(blockEditor);
    show(lineEditor);
    setModeHelp("line");
    applyInitialHighlighting();
    requestAnimationFrame(() => {
      codeInput.focus();
      setCaretPosition(codeInput, codeInput.innerText.length);
    });
  } else {
    show(blockEditor);
    hide(lineEditor);
    setModeHelp("block");
  }
}
window.switchEditor = switchEditor;
/* ------------------------------------------------------- */

/* ---------------- Line editor behavior ----------------- */
codeInput.addEventListener("input", () => {
  const caretPosition = getCaretPosition(codeInput);
  const code = codeInput.innerText;
  const highlightedCode = Prism.highlight(code, Prism.languages.python, "python");

  codeInput.innerHTML = highlightedCode;
  setCaretPosition(codeInput, caretPosition);

  const text = codeInput.innerText;
  const { wordAfterDot, caretOffset } = getWordAfterDotAtCaret(text, caretPosition);

  const matchingKeywords = keywords.filter((k) => k.startsWith(`.${wordAfterDot}`));
  if (matchingKeywords.length > 0 && wordAfterDot.length > 0) {
    showSuggestions(matchingKeywords, caretOffset);
  } else {
    hideSuggestions();
  }
});

function getWordAfterDotAtCaret(text, caretPosition) {
  const leftOfCaret = text.slice(0, caretPosition);
  const match = leftOfCaret.match(/\.([a-zA-Z_]*)$/);
  const wordAfterDot = match ? match[1] : "";
  return { wordAfterDot, caretOffset: leftOfCaret.length };
}

function showSuggestions(matches) {
  suggestionBox.innerHTML = "";
  matches.forEach((m) => {
    const div = document.createElement("div");
    div.innerText = m;
    suggestionBox.appendChild(div);
  });

  const sel = window.getSelection();
  if (!sel.rangeCount) return;
  const rect = sel.getRangeAt(0).getBoundingClientRect();

  suggestionBox.style.position = "absolute";
  suggestionBox.style.left = `${rect.left + window.scrollX}px`;
  suggestionBox.style.top = `${rect.bottom + window.scrollY}px`;
  suggestionBox.style.display = "block";

  const boxRect = suggestionBox.getBoundingClientRect();
  if (boxRect.right > window.innerWidth) {
    suggestionBox.style.left = `${window.innerWidth - boxRect.width - 10}px`;
  }
  if (boxRect.bottom > window.innerHeight) {
    suggestionBox.style.top = `${rect.top + window.scrollY - boxRect.height}px`;
  }
}

function hideSuggestions() {
  suggestionBox.style.display = "none";
}

function insertAtCaretText(el, toInsert) {
  const pos = getCaretPosition(el);
  const before = el.innerText.slice(0, pos);
  const after  = el.innerText.slice(pos);
  const updated = before + toInsert + after;

  const highlighted = Prism.highlight(updated, Prism.languages.python, "python");
  el.innerHTML = highlighted;
  setCaretPosition(el, pos + toInsert.length);
}

suggestionBox.addEventListener("click", (e) => {
  const item = e.target.closest("div");
  if (!item) return;
  const suggestion = item.innerText;

  const caretPosition = getCaretPosition(codeInput);
  const text = codeInput.innerText;
  const { wordAfterDot } = getWordAfterDotAtCaret(text, caretPosition);

  const beforeWord = text.slice(0, caretPosition - wordAfterDot.length - 1);
  const afterWord  = text.slice(caretPosition);
  const updated    = beforeWord + suggestion + afterWord;

  const highlighted = Prism.highlight(updated, Prism.languages.python, "python");
  codeInput.innerHTML = highlighted;
  setCaretPosition(codeInput, beforeWord.length + suggestion.length);
  hideSuggestions();
});

codeInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideSuggestions();
    return;
  }
  if (event.key === "Enter") {
    if (suggestionBox.style.display === "block" && suggestionBox.firstChild) {
      event.preventDefault();
      suggestionBox.firstChild.click();
      return;
    }
    event.preventDefault();
    insertAtCaretText(codeInput, "\n");
    hideSuggestions();
    return;
  }
  if (event.key === "Tab") {
    event.preventDefault();
    if (suggestionBox.style.display === "block" && suggestionBox.firstChild) {
      suggestionBox.firstChild.click();
    } else {
      insertAtCaretText(codeInput, "    ");
    }
    return;
  }
}, { capture: true });

/* ---------------- Caret utilities --------------------- */
function getCaretPosition(element) {
  const selection = window.getSelection();
  let position = 0;

  if (selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    position = preCaretRange.toString().length;
  }
  return position;
}

function setCaretPosition(element, position) {
  const range = document.createRange();
  const selection = window.getSelection();
  let currentOffset = 0;

  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let found = false;
  while (walker.nextNode()) {
    const textNode = walker.currentNode;
    const len = textNode.length;

    if (position <= currentOffset + len) {
      range.setStart(textNode, position - currentOffset);
      range.collapse(true);
      found = true;
      break;
    }
    currentOffset += len;
  }

  if (!found) {
    range.selectNodeContents(element);
    range.collapse(false);
  }

  selection.removeAllRanges();
  selection.addRange(range);
}

/* ------------- copy/save helpers (guarded) ------------- */
window.copyText = window.copyText || function (el) {
  const text = (el instanceof HTMLElement) ? el.innerText : String(el);
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
};

window.saveText = window.saveText || function (el) {
  const text = (el instanceof HTMLElement) ? el.innerText : String(el);
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "main.py";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
