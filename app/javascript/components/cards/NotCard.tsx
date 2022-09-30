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

  useEffect(() => {
    if (inputs[id].id1 === '') return;
    setOutputs({ ...outputs, [id]: !outputs[inputs[id].id1] });
  }, [outputs[inputs[id].id1]]);

  const cardProps = {
    startPos,
    title: 'Not Operator',
    toConsole,
    log,
    width: null,
    height: null,
  };

  return (
    <CardWrapper {...cardProps}>
      <Button className="operation" variant="contained" color="success">
        {outputs[id].toString()}
      </Button>
      <div id={connectorId} className="connector input center" onClick={handleInput} />
      <div id={id} className="connector output" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
