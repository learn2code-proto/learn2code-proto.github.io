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
                ['forward', '1'],
                ['backward', '-1']
            ]), 'direction');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Creates a smallmotor');
        this.setHelpUrl('');
        this.setColour(225);
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
                ['forward', '1'],
                ['backward', '-1']
            ]), 'direction');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Creates a largemotor');
        this.setHelpUrl('');
        this.setColour(225);
    }
};

Blockly.common.defineBlocks({ largemotor: largemotor });

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
        this.setColour(225);
    }
};

Blockly.common.defineBlocks({ button: button });
