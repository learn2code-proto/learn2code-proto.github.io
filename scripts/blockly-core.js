import "./blockly-definitions.js"
import "./blockly-generators.js"

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
            ],
        },
        {
            kind: 'category',
            name: 'Time',
            contents: [

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

    target.innerText = 'import make\n\n' + code;
}

workspace.addChangeListener(updateCode);
