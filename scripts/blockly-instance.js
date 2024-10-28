import  "./definitions.js"
import  "./generators.js"
import  { root
        , c_red, c_green, c_blue, c_magenta
        , updateColors } from './core.js';
import  { theme, updateTheme } from './themes.js';

const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Motors',
      colour: c_red,
      contents: [
        {
          kind: 'block',
          type: 'smallmotor',
        },
        {
          kind: 'block',
          type: 'largemotor',
        },
        {
          kind: 'block',
          type: 'spin',
        },
        {
          kind: 'block',
          type: 'spinForTime',
        },
        {
          kind: 'block',
          type: 'stop',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Sensors',
      colour: c_green,
      contents: [
        {
          kind: 'block',
          type: 'button',
        },
        {
          kind: 'block',
          type: 'isPressed',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Time',
      colour: c_blue,
      contents: [
        {
          kind: 'block',
          type: 'wait',
        },
        {
          kind: 'block',
          type: 'until',
        },
      ],
    },
    // {
    //   kind: 'category',
    //   name: 'Conditions',
    //   colour: '#4CC',
    //   contents: [
    //     {
    //       kind: 'block',
    //       type: 'controls_if',
    //     },
    //     {
    //       kind: 'block',
    //       type: 'logic_compare',
    //     },
    //     {
    //       kind: 'block',
    //       type: 'logic_operation',
    //     },
    //     {
    //       kind: 'block',
    //       type: 'logic_negate',
    //     },
    //     {
    //       kind: 'block',
    //       type: 'logic_boolean',
    //     },
    //   ],
    // },
    {
      kind: 'category',
      name: 'Flow',
      colour: c_magenta,
      contents: [
        {
          kind: 'block',
          type: 'controls_if',
        },
        {
          kind: 'block',
          type: 'logic_negate',
        },
        {
          kind: 'block',
          type: 'controls_repeat_ext',
          inputs: {
            TIMES: {
              block: {
                type: 'math_number',
                fields: {
                  NUM: 10,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'controls_whileUntil',
        },
      ],
    },
    // {
    //   kind: 'category',
    //   name: 'Math',
    //   colour: '#C4C',
    //   contents: [
    //     {
    //       kind: 'block',
    //       type: 'math_number',
    //       fields: {
    //         NUM: 123,
    //       },
    //     },
    //     {
    //       kind: 'block',
    //       type: 'math_arithmetic',
    //     },
    //   ],
    // },
  ],
};

var workspace = Blockly.inject('editor', {
  theme: theme,
  toolbox: toolbox,
});

const supportedEvents = new Set([
  Blockly.Events.BLOCK_CHANGE,
  Blockly.Events.BLOCK_CREATE,
  Blockly.Events.BLOCK_DELETE,
  Blockly.Events.BLOCK_MOVE,
]);

workspace.addChangeListener(updateCode);

function updateCode(event) {
  // Updates the code displayed in `code-container`.
  if (workspace.isDragging())
    return;
  if (!supportedEvents.has(event.type))
    return;

  const code = python.pythonGenerator.workspaceToCode(workspace);
  const codeContainer = document.getElementById('code-container');

  codeContainer.innerHTML = Prism.highlight
    ( 'import make\n\n' + code
    , Prism.languages.python
    , 'python'
    );
}

const rootObserver = new MutationObserver(mutations => {
  // Watches for changes in the class list of `:root` so that the blockly
  // instance retains the accurate theme colors.
  mutations.forEach(mutation => {
    // If the change is to an attribute and that attribute is a class:
    //  1. Update colors to reflect root
    //  2. Update theme to include accurate colors
    //  3. Set theme
    if (mutation.type != 'attributes' || mutation.attributeName != 'class')
      return;
    updateColors();
    updateTheme();
    workspace.setTheme(theme);
  });
});

rootObserver.observe(root, { attributes: true });
