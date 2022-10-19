import React, { useEffect, useMemo } from 'react';
import PositionType from '@cc-types/position';
import { Button } from '@mui/material';

import '@cc-styles/card_content.scss';
import CardWrapper from '@cc-components/CardWrapper';

export default function NotCard({
  id,
  startPos,
  outputs,
  setOutputs,
  inputs,
  setInputs,
  takeId,
  giveInput,
  toConsole,
}: {
  id: string;
  startPos: PositionType;
  outputs: object;
  setOutputs: React.Dispatch<React.SetStateAction<object>>;
  inputs: object;
  setInputs: React.Dispatch<React.SetStateAction<object>>;
  takeId: (id: string) => void;
  giveInput: (id: string) => string;
  toConsole: (log: string) => void;
}) {
  const log = useMemo(
    () => (typeof outputs[id] !== 'boolean' ? 'invalid state' : outputs[id]),
    [outputs[id]]
  );
  const connectorId = id + '#id0';

  const handleInput = () => {
    const inputId = giveInput(connectorId);
    if (inputId === null || inputId == id) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id1: inputId } });
  };

  // the not operator is bugged when used in loops
  useEffect(() => {
    if (inputs[id].id1 === '') return;
    const inputBool = outputs[inputs[id].id1];
    if (typeof inputBool !== 'boolean') setOutputs({ ...outputs, [id]: false });
    else setOutputs({ ...outputs, [id]: !outputs[inputs[id].id1] });
  }, [outputs[inputs[id].id1], inputs[id].forceRender]);

  const cardProps = {
    startPos,
    title: 'Not Operator',
    toConsole,
    log,
  };

  return (
    <CardWrapper {...cardProps}>
      <Button className="operation" variant="contained" color="success">
        {outputs[id]?.toString() || 'false'}
      </Button>
      <div id={connectorId} className="input center booleanI" onClick={handleInput} />
      <div id={id} className="output booleanO" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
