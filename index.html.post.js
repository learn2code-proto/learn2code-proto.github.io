console.info('... post script loaded');

import { toolbox } from './module-scripts/blocks.js';
import { getTheme } from './module-scripts/themes.js';

var workspace = Blockly.inject('blockly-canvas', {
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
  if (workspace.isDragging())
    return;
  if (!supportedEvents.has(event.type))
    return;

  const code = python.pythonGenerator.workspaceToCode(workspace);
  const codeContainer = document.getElementById('line-preview-text');

  codeContainer.innerHTML = Prism.highlight
    ('import make\n\n' + code
      , Prism.languages.python
      , 'python'
    );
});
