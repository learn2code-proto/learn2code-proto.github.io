python.pythonGenerator.forBlock['smallmotor'] = function (block) {
  const text_name = block.getFieldValue('name');

  const dropdown_port = block.getFieldValue('port');
  const dropdown_direction = block.getFieldValue('direction');

  const directionSnippet = (dropdown_direction == 1) ? '' : ', direction=-1';
  const code = `${text_name.replace(' ', '_')} = make.smallmotor(port=${dropdown_port}${directionSnippet})\n`;
  return code;
}

python.pythonGenerator.forBlock['largemotor'] = function (block) {
  const text_name = block.getFieldValue('name');

  const dropdown_port = block.getFieldValue('port');
  const dropdown_direction = block.getFieldValue('direction');

  const directionSnippet = (dropdown_direction == 1) ? '' : ', direction=-1';
  const code = `${text_name.replace(' ', '_')} = make.largemotor(port=${dropdown_port}${directionSnippet})\n`;
  return code;
}

python.pythonGenerator.forBlock['spin'] = function (block) {
  const text_name = block.getFieldValue('name');
  const number_power = block.getFieldValue('power');

  const code = `${text_name.replace(' ', '_')}.spin(power=${number_power})\n`;
  return code;
}

python.pythonGenerator.forBlock['spinForTime'] = function (block) {
  const text_name = block.getFieldValue('name');
  const number_power = block.getFieldValue('power');
  const number_time = block.getFieldValue('time');

  const code = `${text_name.replace(' ', '_')}.spin(power=${number_power}, seconds=${number_time})\n`;
  return code;
}

python.pythonGenerator.forBlock['stop'] = function (block) {
  const text_name = block.getFieldValue('name');

  const code = `${text_name.replace(' ', '_')}.stop()\n`;
  return code;
}

python.pythonGenerator.forBlock['button'] = function (block) {
  const text_name = block.getFieldValue('name');

  const dropdown_port = block.getFieldValue('port');

  const code = `${text_name.replace(' ', '_')} = make.button(port=${dropdown_port})\n`;
  return code;
}

python.pythonGenerator.forBlock['isPressed'] = function (block) {
  const text_name = block.getFieldValue('name');

  const code = `${text_name.replace(' ', '_')}.pressed()`;
  // TODO: Change Order.NONE to the correct operator precedence strength
  return [code, python.Order.NONE];
}

python.pythonGenerator.forBlock['wait'] = function (block) {
  const number_time = block.getFieldValue('time');

  const code = `make.wait(seconds=${number_time})\n`;
  return code;
}
