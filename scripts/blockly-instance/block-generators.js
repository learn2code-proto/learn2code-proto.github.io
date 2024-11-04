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
  const code = `${text_name} = make.largemotor(${text_left}, ${text_right}${directionSnippet})\n`;
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

  const code = `make.until${functionText}\n`;
  return code;
}
