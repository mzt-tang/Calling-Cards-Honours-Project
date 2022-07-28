import React, { useEffect } from 'react';
import PositionType from '@cc-types/position';

import '@cc-styles/card_content.scss';
import CardWrapper from '@cc-components/CardWrapper';

export default function SubstractCard({
  id,
  startPos,
  outputs,
  setOutputs,
  inputs,
  setInputs,
  takeId,
  giveInput,
}: {
  id: string;
  startPos: PositionType;
  outputs: object;
  setOutputs: React.Dispatch<React.SetStateAction<object>>;
  inputs: object;
  setInputs: React.Dispatch<React.SetStateAction<object>>;
  takeId: (id: string) => void;
  giveInput: (id: string) => string;
}) {
  const connectorOneId = id + '#id1';
  const connectorTwoId = id + '#id2';

  const handleFirstInput = () => {
    const inputId = giveInput(connectorOneId);
    if (inputId === null) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id1: inputId } });
  };

  const handleSecondInput = () => {
    const inputId = giveInput(connectorTwoId);
    if (inputId === null) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id2: inputId } });
  };

  useEffect(() => {
    const subtract = (outputs[inputs[id]['id1']] || 0) - (outputs[inputs[id]['id2']] || 0);
    if (subtract !== outputs[id]) setOutputs({ ...outputs, [id]: subtract });
  }, [outputs[inputs[id]['id1']], outputs[inputs[id]['id2']]]);

  const cardProps = {
    id,
    startPos,
    title: 'Subtraction',
  };

  return (
    <CardWrapper {...cardProps}>
      <div className="content">{outputs[id]}</div>
      <div id={connectorOneId} className="connector input first" onClick={handleFirstInput} />
      <div id={connectorTwoId} className="connector input second" onClick={handleSecondInput} />
      <div className="connector output" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
