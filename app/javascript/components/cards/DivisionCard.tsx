import React, { useEffect, useMemo } from 'react';
import PositionType from '@cc-types/position';

import '@cc-styles/card_content.scss';
import CardWrapper from '@cc-components/CardWrapper';

export default function DivisionCard({
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
    () => (typeof outputs[id] !== 'number' ? 'invalid state' : outputs[id].toString()),
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

  useEffect(() => {
    const subtract = (outputs[inputs[id]['id1']] || 0) / (outputs[inputs[id]['id2']] || 1);
    if (subtract !== outputs[id]) setOutputs({ ...outputs, [id]: subtract });
  }, [outputs[inputs[id]['id1']], outputs[inputs[id]['id2']], inputs[id].forceRender]);

  const cardProps = {
    startPos,
    title: 'Division',
    toConsole,
    log,
    width: 200,
    height: 100,
  };

  return (
    <CardWrapper {...cardProps}>
      <div className="content small">{outputs[id]}</div>
      <div id={connectorOneId} className="input number" onClick={handleFirstInput} />
      <div id={connectorTwoId} className="input number" onClick={handleSecondInput} />
      <div id={id} className="output number" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
