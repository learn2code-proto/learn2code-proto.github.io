python.pythonGenerator.forBlock['smallmotor'] = function (block) {
    const text_name = block.getFieldValue('name');

    const dropdown_port = block.getFieldValue('port');
    const dropdown_direction = block.getFieldValue('direction');

    const code = `${text_name.replace(' ', '_')} = make.smallmotor(${dropdown_port}, ${dropdown_direction})\n`;
    return code;
}

python.pythonGenerator.forBlock['largemotor'] = function (block) {
    const text_name = block.getFieldValue('name');

    const dropdown_port = block.getFieldValue('port');
    const dropdown_direction = block.getFieldValue('direction');

    const code = `${text_name.replace(' ', '_')} = make.largemotor(${dropdown_port}, ${dropdown_direction})\n`;
    return code;
}

python.pythonGenerator.forBlock['button'] = function (block) {
    const text_name = block.getFieldValue('name');

    const dropdown_port = block.getFieldValue('port');

    const code = `${text_name.replace(' ', '_')} = make.button(${dropdown_port})\n`;
    return code;
}
