import React, { useEffect } from 'react';
import PositionType from '@cc-types/position';

import '@cc-styles/card_content.scss';
import CardWrapper from '@cc-components/CardWrapper';

export default function StringConcatCard({
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
  const connectorOneId = id + '#i1';
  const connectorTwoId = id + '#i2';

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
    const concatStr = `${outputs[inputs[id]['id1']] || ''}${outputs[inputs[id]['id2']] || ''}`;
    if (concatStr !== outputs[id]) setOutputs({ ...outputs, [id]: concatStr });
  }, [outputs[inputs[id]['id1']], outputs[inputs[id]['id2']]]);

  const cardProps = {
    id,
    startPos,
    title: 'String Concatenate',
  };

  return (
    <CardWrapper {...cardProps}>
      <div className="box content">{outputs[id]}</div>
      <div id={connectorOneId} className="connector input first" onClick={handleFirstInput} />
      <div id={connectorTwoId} className="connector input second" onClick={handleSecondInput} />
      <div className="connector output" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
