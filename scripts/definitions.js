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
    this.setTooltip('Stops the motor.');
    this.setHelpUrl('');
    this.setColour(0);
  }
};

Blockly.common.defineBlocks({ stop: stop });

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
