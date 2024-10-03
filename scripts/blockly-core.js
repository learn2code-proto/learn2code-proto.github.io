import "./blockly-definitions.js"
import "./blockly-generators.js"

const toolbox = {
    kind: 'flyoutToolbox',
    contents: [
        {
            kind: 'block',
            type: 'smallmotor',
        },
        {
            kind: 'block',
            type: 'largemotor',
        },
    ],
};

var workspace = Blockly.inject('editor', {
    toolbox: toolbox,
});

const supportedEvents = new Set([
    Blockly.Events.BLOCK_CHANGE,
    Blockly.Events.BLOCK_CREATE,
    Blockly.Events.BLOCK_DELETE,
    Blockly.Events.BLOCK_MOVE,
]);

function updateCode(event) {
    if (workspace.isDragging()) return;
    if (!supportedEvents.has(event.type)) return;

    const code = python.pythonGenerator.workspaceToCode(workspace);
    const target = document.getElementById('code-container');

    target.innerHTML = 'import make\n\n' + code;
}

workspace.addChangeListener(updateCode);
