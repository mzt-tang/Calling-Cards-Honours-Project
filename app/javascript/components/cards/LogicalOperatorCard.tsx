import React, { useEffect, useMemo, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import '@cc-styles/card_content.scss';
import CardWrapper from '@cc-components/CardWrapper';

export default function LogicalOperatorCard({
  id,
  startPos,
  outputs,
  setOutputs,
  inputs,
  setInputs,
  takeId,
  giveInput,
  toConsole,
}) {
  const log = useMemo(
    () => (typeof outputs[id] !== 'boolean' ? 'invalid state' : outputs[id].toString()),
    [outputs[id]]
  );
  const connectorOneId = id + '#id1';
  const connectorTwoId = id + '#id2';

  const handleFirstInput = () => {
    const inputId = giveInput(connectorOneId);
    if (inputId === null || inputId == id) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id1: inputId } });
  };

  const handleSecondInput = () => {
    const inputId = giveInput(connectorTwoId);
    if (inputId === null || inputId == id) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id2: inputId } });
  };

  const [operator, setOperator] = useState('&&');

  const handleOperatorChange = (event) => {
    setOperator(event.target.value);
  };

  useEffect(() => {
    if (inputs[id].id1 === '' || inputs[id].id2 === '') {
      setOutputs({ ...outputs, [id]: false });
      return;
    }

    switch (operator) {
      case '&&': {
        setOutputs({ ...outputs, [id]: outputs[inputs[id].id1] && outputs[inputs[id].id2] });
        break;
      }
      case '||': {
        setOutputs({ ...outputs, [id]: outputs[inputs[id].id1] || outputs[inputs[id].id2] });
        break;
      }
      default: {
        setOutputs({ ...outputs, [id]: false });
      }
    }
  }, [operator, outputs[inputs[id].id1], outputs[inputs[id].id2], inputs[id].forceRender]);

  const cardProps = {
    startPos,
    title: 'Logical Operator',
    toConsole,
    log,
  };

  return (
    <CardWrapper {...cardProps}>
      <FormControl
        className="operation"
        variant="filled"
        color="success"
        required
        sx={{ mt: 1, borderRadius: 1, minWidth: 180 }}
      >
        <InputLabel>Operator</InputLabel>
        <Select value={operator} label="operator" onChange={handleOperatorChange}>
          <MenuItem value="&&">And</MenuItem>
          <MenuItem value="||">Or</MenuItem>
        </Select>
      </FormControl>
      <div id={connectorOneId} className="input first boolean" onClick={handleFirstInput} />
      <div id={connectorTwoId} className="input second boolean" onClick={handleSecondInput} />
      <div id={id} className="output boolean" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
