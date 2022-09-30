import React, { useMemo } from 'react';
import { ButtonGroup, Button } from '@mui/material';
import CardWrapper from '@cc-components/CardWrapper';

export default function BooleanCard({ id, startPos, outputs, setOutputs, takeId, toConsole }) {
  const log = useMemo(
    () => (typeof outputs[id] !== 'boolean' ? 'invalid state' : outputs[id].toString()),
    [outputs[id]]
  );
  const cardProps = {
    startPos,
    title: 'Boolean',
    toConsole,
    log,
    width: 400,
    height: 130,
  };

  const handleTrueSwitch = () => {
    if (!outputs[id]) setOutputs({ ...outputs, [id]: true });
  };

  const handleFalseSwitch = () => {
    if (outputs[id]) setOutputs({ ...outputs, [id]: false });
  };

  return (
    <CardWrapper {...cardProps}>
      <ButtonGroup className="operation" color="success">
        <Button onClick={handleTrueSwitch} variant={outputs[id] ? 'contained' : 'outlined'}>
          True
        </Button>
        <Button onClick={handleFalseSwitch} variant={!outputs[id] ? 'contained' : 'outlined'}>
          False
        </Button>
      </ButtonGroup>
      <div id={id} className="connector output" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
