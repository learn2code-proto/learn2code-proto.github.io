import "./definitions.js"
import "./generators.js"

const toolbox = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category',
            name: 'Motors',
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
            contents: [
                {
                    kind: 'block',
                    type: 'wait',
                },
            ],
        },
        // {
        //     kind: 'category',
        //     name: 'Conditions',
        //     contents: [
        //         {
        //             kind: 'block',
        //             type: 'controls_if',
        //         },
        //         {
        //             kind: 'block',
        //             type: 'logic_compare',
        //         },
        //         {
        //             kind: 'block',
        //             type: 'logic_operation',
        //         },
        //         {
        //             kind: 'block',
        //             type: 'logic_negate',
        //         },
        //         {
        //             kind: 'block',
        //             type: 'logic_boolean',
        //         },
        //     ],
        // },
        {
            kind: 'category',
            name: 'Flow',
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
        //     kind: 'category',
        //     name: 'Math',
        //     contents: [
        //         {
        //             kind: 'block',
        //             type: 'math_number',
        //             fields: {
        //                 NUM: 123,
        //             },
        //         },
        //         {
        //             kind: 'block',
        //             type: 'math_arithmetic',
        //         },
        //         {
        //             kind: 'block',
        //             type: 'math_single',
        //         },
        //     ],
        // },
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
    // Updates the code displayed in `code-container`.
    if (workspace.isDragging())
        return;
    if (!supportedEvents.has(event.type))
        return;

    const code = python.pythonGenerator.workspaceToCode(workspace);
    const target = document.getElementById('code-container');

    target.innerHTML = Prism.highlight('import make\n\n' + code,
                                       Prism.languages.python,
                                       'python');
}

workspace.addChangeListener(updateCode);
