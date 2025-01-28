export { toolbox };

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Definitions
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const smallmotor = {
  init: function () {
    this.appendDummyInput('name')
      .appendField(new Blockly.FieldTextInput('name'), 'name')
      .appendField('is a smallmotor on port')
      .appendField(new Blockly.FieldDropdown([
        ['3', '3'],
        ['4', '4'],
        ['5', '5'],
        ['6', '6'],
        ['9', '9'],
        ['10', '10'],
        ['11', '11'],
        ['12', '12'],
        ['13', '13']
      ]), 'port');
    this.appendDummyInput('meta')
      .appendField('in direction')
      .appendField(new Blockly.FieldDropdown([
        ['clockwise', '1'],
        ['counter-clockwise', '-1']
      ]), 'direction');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Creates a smallmotor');
    this.setHelpUrl('');
    this.setColour(0);
  }
};

Blockly.common.defineBlocks({ smallmotor: smallmotor });

const largemotor = {
  init: function () {
    this.appendDummyInput('name')
      .appendField(new Blockly.FieldTextInput('name'), 'name')
      .appendField('is a largemotor on port')
      .appendField(new Blockly.FieldDropdown([
        ['7', '7'],
        ['8', '8']
      ]), 'port');
    this.appendDummyInput('meta')
      .appendField('in direction')
      .appendField(new Blockly.FieldDropdown([
        ['clockwise', '1'],
        ['counter-clockwise', '-1']
      ]), 'direction');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Creates a largemotor');
    this.setHelpUrl('');
    this.setColour(0);
  }
};

Blockly.common.defineBlocks({ largemotor: largemotor });

const spin = {
  init: function () {
    this.appendDummyInput('action')
      .appendField('Spin')
      .appendField(new Blockly.FieldTextInput('name'), 'name')
      .appendField('at')
      .appendField(new Blockly.FieldNumber(100, -100, 100, 0.1), 'power')
      .appendField('power');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Spins the motor at a power until stopped.');
    this.setHelpUrl('');
    this.setColour(0);
  }
};

Blockly.common.defineBlocks({ spin: spin });

const spinForTime = {
  init: function () {
    this.appendDummyInput('action')
      .appendField('Spin')
      .appendField(new Blockly.FieldTextInput('name'), 'name')
      .appendField('at')
      .appendField(new Blockly.FieldNumber(100, -100, 100, 0.1), 'power')
      .appendField('power for')
      .appendField(new Blockly.FieldNumber(0, 0, Infinity, 0.01), 'time')
      .appendField('seconds');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Spins the motor at a power for a time.');
    this.setHelpUrl('');
    this.setColour(0);
  }
};

Blockly.common.defineBlocks({ spinForTime: spinForTime });

const stop = {
  init: function () {
    this.appendDummyInput('action')
      .appendField('Stop')
      .appendField(new Blockly.FieldTextInput('name'), 'name');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Stops the motor/drivetrain.');
    this.setHelpUrl('');
    this.setColour(0);
  }
};

Blockly.common.defineBlocks({ stop: stop });

const drivetrain = {
  init: function () {
    this.appendDummyInput('name')
      .appendField(new Blockly.FieldTextInput('name'), 'name')
      .appendField('is a drivetrain from motors')
      .appendField(new Blockly.FieldTextInput('left'), 'left')
      .appendField('and')
      .appendField(new Blockly.FieldTextInput('right'), 'right')
    this.appendDummyInput('meta')
      .appendField('in direction')
      .appendField(new Blockly.FieldDropdown([
        ['clockwise', '1'],
        ['counter-clockwise', '-1']
      ]), 'direction');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Creates a drivetrain');
    this.setHelpUrl('');
    this.setColour(0);
  }
};

Blockly.common.defineBlocks({ drivetrain: drivetrain });

const drive = {
  init: function () {
    this.appendDummyInput('action')
      .appendField('Drive')
      .appendField(new Blockly.FieldTextInput('name'), 'name')
      .appendField('at')
      .appendField(new Blockly.FieldNumber(100, -100, 100, 0.1), 'power')
      .appendField('power');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Drives the drivetrain at a power until stopped.');
    this.setHelpUrl('');
    this.setColour(0);
  }
};

Blockly.common.defineBlocks({ drive: drive });

const driveForTime = {
  init: function () {
    this.appendDummyInput('action')
      .appendField('Drive')
      .appendField(new Blockly.FieldTextInput('name'), 'name')
      .appendField('at')
      .appendField(new Blockly.FieldNumber(100, -100, 100, 0.1), 'power')
      .appendField('power for')
      .appendField(new Blockly.FieldNumber(0, 0, Infinity, 0.01), 'time')
      .appendField('seconds');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Drives the drivetrain at a power for a time.');
    this.setHelpUrl('');
    this.setColour(0);
  }
};

Blockly.common.defineBlocks({ driveForTime: driveForTime });

const curve = {
  init: function () {
    this.appendDummyInput('action')
      .appendField('Curve')
      .appendField(new Blockly.FieldTextInput('name'), 'name')
      .appendField('at')
      .appendField(new Blockly.FieldNumber(100, -100, 100, 0.1), 'left')
      .appendField('left power and')
      .appendField(new Blockly.FieldNumber(100, -100, 100, 0.1), 'right')
      .appendField('right power');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Curves the drivetrain at two different powers until stopped.');
    this.setHelpUrl('');
    this.setColour(0);
  }
};

Blockly.common.defineBlocks({ curve: curve });

const curveForTime = {
  init: function () {
    this.appendDummyInput('action')
      .appendField('Curve')
      .appendField(new Blockly.FieldTextInput('name'), 'name')
      .appendField('at')
      .appendField(new Blockly.FieldNumber(100, -100, 100, 0.1), 'left')
      .appendField('left power and')
      .appendField(new Blockly.FieldNumber(100, -100, 100, 0.1), 'right')
      .appendField('right power for')
      .appendField(new Blockly.FieldNumber(0, 0, Infinity, 0.01), 'time')
      .appendField('seconds');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Curves the drivetrain at two different powers for a time.');
    this.setHelpUrl('');
    this.setColour(0);
  }
};

Blockly.common.defineBlocks({ curveForTime: curveForTime });

const turn = {
  init: function () {
    this.appendDummyInput('action')
      .appendField('Turn')
      .appendField(new Blockly.FieldTextInput('name'), 'name')
      .appendField('at')
      .appendField(new Blockly.FieldNumber(100, -100, 100, 0.1), 'power')
      .appendField('power');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Turn the drivetrain at a power until stopped.');
    this.setHelpUrl('');
    this.setColour(0);
  }
};

Blockly.common.defineBlocks({ turn: turn });

const turnForTime = {
  init: function () {
    this.appendDummyInput('action')
      .appendField('Turn')
      .appendField(new Blockly.FieldTextInput('name'), 'name')
      .appendField('at')
      .appendField(new Blockly.FieldNumber(100, -100, 100, 0.1), 'power')
      .appendField('power for')
      .appendField(new Blockly.FieldNumber(0, 0, Infinity, 0.01), 'time')
      .appendField('seconds');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Drives the drivetrain at a power for a time.');
    this.setHelpUrl('');
    this.setColour(0);
  }
};

Blockly.common.defineBlocks({ turnForTime: turnForTime });

const button = {
  init: function () {
    this.appendDummyInput('name')
      .appendField(new Blockly.FieldTextInput('name'), 'name')
      .appendField('is a button on port')
      .appendField(new Blockly.FieldDropdown([
        ['1', '1'],
        ['2', '2'],
        ['9', '9'],
        ['10', '10'],
        ['11', '11'],
        ['12', '12'],
        ['13', '13']
      ]), 'port')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Creates a button');
    this.setHelpUrl('');
    this.setColour(120);
  }
};

Blockly.common.defineBlocks({ button: button });

const isPressed = {
  init: function () {
    this.appendDummyInput('name')
      .appendField(new Blockly.FieldTextInput('name'), 'name')
      .appendField('is pressed?');
    this.setOutput(true, 'Boolean');
    this.setTooltip('Returns whether or not the button is pressed.');
    this.setHelpUrl('');
    this.setColour(120);
  }
};

Blockly.common.defineBlocks({ isPressed: isPressed });

const wait = {
  init: function () {
    this.appendDummyInput('name')
      .appendField('wait')
      .appendField(new Blockly.FieldNumber(0, 0, Infinity, 0.01), 'time')
      .appendField('seconds');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Waits for the number of seconds.');
    this.setHelpUrl('');
    this.setColour(240);
  }
};

Blockly.common.defineBlocks({ wait: wait });

const until = {
  init: function () {
    this.appendValueInput('function')
      .setCheck('Boolean')
      .appendField('wait until');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Waits until the given action is true.');
    this.setHelpUrl('');
    this.setColour(240);
  }
};

Blockly.common.defineBlocks({ until: until });

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Generators
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

python.pythonGenerator.forBlock['smallmotor'] = function (block) {
  const text_name = block.getFieldValue('name').replace(' ', '_');

  const dropdown_port = block.getFieldValue('port');
  const dropdown_direction = block.getFieldValue('direction');

  const directionSnippet = (dropdown_direction == 1) ? '' : ', direction=-1';
  const code = `${text_name} = make.smallmotor(port=${dropdown_port}${directionSnippet})\n`;
  return code;
}

python.pythonGenerator.forBlock['largemotor'] = function (block) {
  const text_name = block.getFieldValue('name').replace(' ', '_');

  const dropdown_port = block.getFieldValue('port');
  const dropdown_direction = block.getFieldValue('direction');

  const directionSnippet = (dropdown_direction == 1) ? '' : ', direction=-1';
  const code = `${text_name} = make.largemotor(port=${dropdown_port}${directionSnippet})\n`;
  return code;
}

python.pythonGenerator.forBlock['spin'] = function (block) {
  const text_name = block.getFieldValue('name').replace(' ', '_');
  const number_power = block.getFieldValue('power');

  const code = `${text_name}.spin(power=${number_power})\n`;
  return code;
}

python.pythonGenerator.forBlock['spinForTime'] = function (block) {
  const text_name = block.getFieldValue('name').replace(' ', '_');
  const number_power = block.getFieldValue('power');
  const number_time = block.getFieldValue('time');

  const code = `${text_name}.spin(power=${number_power}, seconds=${number_time})\n`;
  return code;
}

python.pythonGenerator.forBlock['stop'] = function (block) {
  const text_name = block.getFieldValue('name').replace(' ', '_');

  const code = `${text_name}.stop()\n`;
  return code;
}

python.pythonGenerator.forBlock['drivetrain'] = function (block) {
  const text_name = block.getFieldValue('name').replace(' ', '_');

  const text_left = block.getFieldValue('left').replace(' ', '_');
  const text_right = block.getFieldValue('right').replace(' ', '_');
  const dropdown_direction = block.getFieldValue('direction');

  const directionSnippet = (dropdown_direction == 1) ? '' : ', direction=-1';
  const code = `${text_name} = make.drivetrain(${text_left}, ${text_right}${directionSnippet})\n`;
  return code;
}

python.pythonGenerator.forBlock['drive'] = function (block) {
  const text_name = block.getFieldValue('name').replace(' ', '_');
  const number_power = block.getFieldValue('power');

  const code = `${text_name}.drive(power=${number_power})\n`;
  return code;
}

python.pythonGenerator.forBlock['driveForTime'] = function (block) {
  const text_name = block.getFieldValue('name').replace(' ', '_');
  const number_power = block.getFieldValue('power');
  const number_time = block.getFieldValue('time');

  const code = `${text_name}.drive(power=${number_power}, seconds=${number_time})\n`;
  return code;
}

python.pythonGenerator.forBlock['curve'] = function (block) {
  const text_name = block.getFieldValue('name').replace(' ', '_');
  const number_left = block.getFieldValue('left');
  const number_right = block.getFieldValue('right');

  const code = `${text_name}.curve(left_power=${number_left}, right_power=${number_right})\n`;
  return code;
}

python.pythonGenerator.forBlock['curveForTime'] = function (block) {
  const text_name = block.getFieldValue('name').replace(' ', '_');
  const number_left = block.getFieldValue('left');
  const number_right = block.getFieldValue('right');
  const number_time = block.getFieldValue('time');

  const code = `${text_name}.curve(left_power=${number_left}, right_power=${number_right}, seconds=${number_time})\n`;
  return code;
}

python.pythonGenerator.forBlock['turn'] = function (block) {
  const text_name = block.getFieldValue('name').replace(' ', '_');
  const number_power = block.getFieldValue('power');

  const code = `${text_name}.turn(power=${number_power})\n`;
  return code;
}

python.pythonGenerator.forBlock['turnForTime'] = function (block) {
  const text_name = block.getFieldValue('name').replace(' ', '_');
  const number_power = block.getFieldValue('power');
  const number_time = block.getFieldValue('time');

  const code = `${text_name}.turn(power=${number_power}, seconds=${number_time})\n`;
  return code;
}

python.pythonGenerator.forBlock['button'] = function (block) {
  const text_name = block.getFieldValue('name').replace(' ', '_');

  const dropdown_port = block.getFieldValue('port');

  const code = `${text_name} = make.button(port=${dropdown_port})\n`;
  return code;
}

python.pythonGenerator.forBlock['isPressed'] = function (block) {
  const text_name = block.getFieldValue('name').replace(' ', '_');

  const code = `${text_name}.pressed()`;
  return [code, python.Order.NONE];
}

python.pythonGenerator.forBlock['wait'] = function (block) {
  const number_time = block.getFieldValue('time');

  const code = `make.wait(seconds=${number_time})\n`;
  return code;
}

python.pythonGenerator.forBlock['until'] = function (block) {
  var value_function = python.pythonGenerator.valueToCode
    ( block
    , 'function'
    , python.Order.ATOMIC
    );

  let len = value_function.length;
  let functionText;

  if (len < 4)
    functionText = '()';
  else if (value_function[len - 3] == '(' && value_function[len - 2] == ')')
    functionText = value_function.replace('()', '');
  else
    functionText = `(lambda: ${value_function})`

  const code = `make.wait_until${functionText}\n`;
  return code;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Toolbox
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Motors',
      colour: '#cc4444',
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
      name: 'Drivetrain',
      colour: '#cc4444',
      contents: [
        {
          kind: 'block',
          type: 'drivetrain',
        },
        {
          kind: 'block',
          type: 'drive',
        },
        {
          kind: 'block',
          type: 'driveForTime',
        },
        {
          kind: 'block',
          type: 'curve',
        },
        {
          kind: 'block',
          type: 'curveForTime',
        },
        {
          kind: 'block',
          type: 'turn',
        },
        {
          kind: 'block',
          type: 'turnForTime',
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
      colour: '#44cc44',
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
      colour: '#4444cc',
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
    //   colour: ''#4'CC',
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
      colour: '#cc44cc',
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
