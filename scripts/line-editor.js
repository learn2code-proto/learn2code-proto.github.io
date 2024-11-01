const codeInput = document.getElementById('code-input');
const keywords = [
  ".wait(",
  ".until(",
  ".button(",
  ".pressed()",
  ".smallmotor(",
  ".largemotor(",
  ".spin(",
  ".stop()",
  ".drive(",
  ".drivetrain(",
  ".turn(",
  ".curve("
];

// Create autocomplete suggestion box
const suggestionBox = document.createElement('div');
suggestionBox.id = 'suggestion-box';
suggestionBox.style.position = 'absolute';
suggestionBox.style.backgroundColor = '#f9f9f9';
suggestionBox.style.border = '1px solid #ccc';
suggestionBox.style.zIndex = '1000';
suggestionBox.style.display = 'none';
suggestionBox.style.padding = '5px';
suggestionBox.style.maxWidth = '300px';
suggestionBox.style.fontFamily = 'monospace';
document.body.appendChild(suggestionBox);

// Syncing the typed input with Prism.js highlighting
codeInput.addEventListener('input', () => {
  const caretPosition = getCaretPosition(codeInput);
  const code = codeInput.innerText;
  const highlightedCode = Prism.highlight(code, Prism.languages.python, 'python');
  codeInput.innerHTML = highlightedCode;
  setCaretPosition(codeInput, caretPosition);

  const text = codeInput.innerText;
  const caretWordInfo = getWordAfterDotAtCaret(text, caretPosition);
  const { wordAfterDot, caretOffset } = caretWordInfo;

  const matchingKeywords = keywords.filter(keyword => keyword.startsWith(`.${wordAfterDot}`));
  if (matchingKeywords.length > 0 && wordAfterDot.length > 0) {
    showSuggestions(matchingKeywords, caretOffset);
  } else {
    hideSuggestions();
  }
});

// Autocomplete functionality
function getWordAfterDotAtCaret(text, caretPosition) {
  const leftOfCaret = text.slice(0, caretPosition);
  const match = leftOfCaret.match(/\.([a-zA-Z_]*)$/);
  const wordAfterDot = match ? match[1] : '';
  return {
    wordAfterDot,
    caretOffset: leftOfCaret.length
  };
}

function showSuggestions(matches, caretOffset) {
  suggestionBox.innerHTML = '';
  matches.forEach(match => {
    const suggestion = document.createElement('div');
    suggestion.innerText = match;
    suggestionBox.appendChild(suggestion);
  });

  const rect = codeInput.getBoundingClientRect();
  suggestionBox.style.left = `${rect.left + window.scrollX}px`;
  suggestionBox.style.top = `${rect.bottom + window.scrollY}px`;
  suggestionBox.style.display = 'block';
}

function hideSuggestions() {
  suggestionBox.style.display = 'none';
}

// Handling key events
codeInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.execCommand('insertLineBreak');  // TODO: Deprecated function
  }

  if (event.key === 'Tab') {
    if (suggestionBox.style.display === 'block') {
      event.preventDefault();
      const suggestion = suggestionBox.firstChild ? suggestionBox.firstChild.innerText : null;
      if (suggestion) {
        const caretPosition = getCaretPosition(codeInput);
        const text = codeInput.innerText;
        const caretWordInfo = getWordAfterDotAtCaret(text, caretPosition);
        const { wordAfterDot } = caretWordInfo;

        const beforeWord = text.slice(0, caretPosition - wordAfterDot.length - 1);
        const afterWord = text.slice(caretPosition);
        const updatedText = beforeWord + suggestion + afterWord;

        codeInput.innerText = updatedText;
        const highlightedCode = Prism.highlight(updatedText, Prism.languages.python, 'python');
        codeInput.innerHTML = highlightedCode;

        const newCaretPosition = beforeWord.length + suggestion.length;
        setCaretPosition(codeInput, newCaretPosition);
        hideSuggestions();
      }
    } else {
      event.preventDefault();
      const tabSpan = document.createElement('span');
      tabSpan.className = 'tab-space';
      tabSpan.innerHTML = '&nbsp;&nbsp';
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      range.insertNode(tabSpan);
      range.setStartAfter(tabSpan);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  if (event.key === 'Backspace') {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (range.startContainer.nodeType === Node.TEXT_NODE && range.startOffset === 0) {
        const previousNode = range.startContainer.previousSibling;
        if (previousNode && previousNode.classList && previousNode.classList.contains('tab-space')) {
          event.preventDefault();
          previousNode.remove();
        }
      } else if (range.startContainer.nodeType === Node.ELEMENT_NODE) {
        const previousNode = range.startContainer.childNodes[range.startOffset - 1];
        if (previousNode && previousNode.classList && previousNode.classList.contains('tab-space')) {
          event.preventDefault();
          previousNode.remove();
        }
      }
    }
  }
});

// Functions to get/set the caret position
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
  let currentNode = element;
  let currentOffset = 0;

  const nodeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
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
