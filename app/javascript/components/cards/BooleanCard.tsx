import React, { useMemo } from 'react';
import { ButtonGroup, Button } from '@mui/material';
import CardWrapper from '@cc-components/CardWrapper';

export default function BooleanCard({ id, startPos, outputs, setOutputs, takeId, toConsole }) {
  const log = useMemo(() => outputs[id].toString(), [outputs[id]]);
  const cardProps = {
    id,
    startPos,
    title: 'Boolean',
    toConsole,
    log,
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
      <div className="connector output" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
