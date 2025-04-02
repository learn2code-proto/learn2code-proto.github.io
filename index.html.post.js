console.info("... post script loaded");

import { toolbox } from "./module-scripts/blocks.js";
import { getTheme } from "./module-scripts/themes.js";

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

  const code = python.pythonGenerator.workspaceToCode(workspace);
  const codeContainer = document.getElementById("line-preview-text");

  codeContainer.innerHTML = Prism.highlight(
    "import make\n\n" + code,
    Prism.languages.python,
    "python"
  );
});

// Initialize the line editor
const codeInput = document.getElementById("code-input");
const suggestionBox = document.getElementById("suggestion-box");
const codeEditorContainer = document.querySelector(".code-editor-container");

// Make the entire code editor pane clickable
if (codeEditorContainer && codeInput) {
  codeEditorContainer.addEventListener("click", () => {
    codeInput.focus(); // Focus the contenteditable div
  });
} else {
  console.error("Could not find code editor container or input element.");
}

// Define keywords for autocomplete
const keywords = [
  ".component()",
  ".wait()",
  ".until()",
  ".action()",
  ".button()",
  ".pressed()",
  ".smallmotor()",
  ".largemotor()",
  ".spin()",
  ".stop()",
  ".drive()",
  ".drivetrain()",
  ".turn()",
  ".curve()",
];

let indentationLevel = 0;
let inIndentMode = false;

// Add this right after initializing codeInput
function applyInitialHighlighting() {
  const code = codeInput.innerText;
  const highlightedCode = Prism.highlight(
    code,
    Prism.languages.python,
    "python"
  );
  codeInput.innerHTML = highlightedCode;
}

// Call it when page loads and when switching to line editor
document.addEventListener("DOMContentLoaded", applyInitialHighlighting);

// Update switchEditor function
function switchEditor() {
  const blockEditor = document.getElementById("block-editor");
  const lineEditor = document.getElementById("line-editor");

  if (blockEditor.getAttribute("data-closed") === "") {
    blockEditor.setAttribute("data-closed", "true");
    lineEditor.setAttribute("data-closed", "");
    applyInitialHighlighting();
  } else {
    blockEditor.setAttribute("data-closed", "");
    lineEditor.setAttribute("data-closed", "true");
  }
}

// Copy Code Button
function copyTextFromLineEditor() {
  const code = codeInput.innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert("Code copied to clipboard!");
  });
}

// Save code Button
function saveTextFromLineEditor() {
  const code = codeInput.innerText;
  const blob = new Blob([code], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "main.py";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

codeInput.addEventListener("input", () => {
  const caretPosition = getCaretPosition(codeInput);
  const code = codeInput.innerText;
  const highlightedCode = Prism.highlight(
    code,
    Prism.languages.python,
    "python"
  );

  codeInput.innerHTML = highlightedCode;
  setCaretPosition(codeInput, caretPosition);

  const text = codeInput.innerText;
  const caretWordInfo = getWordAfterDotAtCaret(text, caretPosition);
  const { wordAfterDot, caretOffset } = caretWordInfo;

  const matchingKeywords = keywords.filter((keyword) =>
    keyword.startsWith(`.${wordAfterDot}`)
  );
  if (matchingKeywords.length > 0 && wordAfterDot.length > 0) {
    showSuggestions(matchingKeywords, caretOffset);
  } else {
    hideSuggestions();
  }
});

// get words after dot(.) apperance(for checking keywords)
function getWordAfterDotAtCaret(text, caretPosition) {
  const leftOfCaret = text.slice(0, caretPosition);
  const match = leftOfCaret.match(/\.([a-zA-Z_]*)$/);
  const wordAfterDot = match ? match[1] : "";
  return { wordAfterDot, caretOffset: leftOfCaret.length };
}

function showSuggestions(matches, caretOffset) {
  suggestionBox.innerHTML = "";
  matches.forEach((match) => {
    const suggestion = document.createElement("div");
    suggestion.innerText = match;
    suggestionBox.appendChild(suggestion);
  });

  // Get the current cursor position
  const range = window.getSelection().getRangeAt(0);
  const rect = range.getBoundingClientRect();

  // Position the suggestion box near the cursor
  suggestionBox.style.position = "absolute";
  suggestionBox.style.left = `${rect.left + window.scrollX}px`;
  suggestionBox.style.top = `${rect.bottom + window.scrollY}px`;
  suggestionBox.style.display = "block";

  // Ensure the box stays visible if near window edge
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

codeInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideSuggestions();
  } else if (event.key === "Enter") {
    event.preventDefault();
    if (inIndentMode) {
      document.execCommand("insertLineBreak");
      for (let i = 0; i < indentationLevel; i++) {
        const indentSpan = document.createElement("span");
        indentSpan.className = "indent-space";
        indentSpan.innerHTML = "&nbsp;&nbsp;&nbsp;";
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        range.insertNode(indentSpan);
        range.setStartAfter(indentSpan);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } else {
      document.execCommand("insertLineBreak");
    }
  }

  if (event.key === "Tab") {
    if (suggestionBox.style.display === "block") {
      event.preventDefault();
      const suggestion = suggestionBox.firstChild
        ? suggestionBox.firstChild.innerText
        : null;
      if (suggestion) {
        const caretPosition = getCaretPosition(codeInput);
        const text = codeInput.innerText;
        const caretWordInfo = getWordAfterDotAtCaret(text, caretPosition);
        const { wordAfterDot } = caretWordInfo;

        const beforeWord = text.slice(
          0,
          caretPosition - wordAfterDot.length - 1
        );
        const afterWord = text.slice(caretPosition);
        const updatedText = beforeWord + suggestion + afterWord;

        codeInput.innerText = updatedText;
        const highlightedCode = Prism.highlight(
          updatedText,
          Prism.languages.python,
          "python"
        );
        codeInput.innerHTML = highlightedCode;

        const newCaretPosition = beforeWord.length + suggestion.length;
        setCaretPosition(codeInput, newCaretPosition);
        hideSuggestions();
      }
    } else {
      event.preventDefault();
      inIndentMode = true;
      indentationLevel++;
      const indentSpan = document.createElement("span");
      indentSpan.className = "indent-space";
      indentSpan.innerHTML = "&nbsp;&nbsp;&nbsp;";
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      range.insertNode(indentSpan);
      range.setStartAfter(indentSpan);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  if (event.key === "Backspace") {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (
        range.startContainer.nodeType === Node.TEXT_NODE &&
        range.startOffset === 0
      ) {
        const previousNode = range.startContainer.previousSibling;
        if (
          previousNode &&
          previousNode.classList &&
          previousNode.classList.contains("indent-space")
        ) {
          event.preventDefault();
          previousNode.remove();
          indentationLevel--;
          if (indentationLevel === 0) inIndentMode = false;
        }
      } else if (range.startContainer.nodeType === Node.ELEMENT_NODE) {
        const previousNode =
          range.startContainer.childNodes[range.startOffset - 1];
        if (
          previousNode &&
          previousNode.classList &&
          previousNode.classList.contains("indent-space")
        ) {
          event.preventDefault();
          previousNode.remove();
          indentationLevel--;
          if (indentationLevel === 0) inIndentMode = false;
        }
      }
    }
  }
});

//Get's cursor position
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

//Set's cursor position
function setCaretPosition(element, position) {
  const range = document.createRange();
  const selection = window.getSelection();
  let currentNode = element;
  let currentOffset = 0;

  const nodeWalker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  while (nodeWalker.nextNode()) {
    const textNode = nodeWalker.currentNode;
    const nodeLength = textNode.length;

    if (position <= currentOffset + nodeLength) {
      range.setStart(textNode, position - currentOffset);
      range.collapse(true);
      break;
    }

    currentOffset += nodeLength;
  }

  selection.removeAllRanges();
  selection.addRange(range);
}
