import React, { useEffect, useMemo } from 'react';
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
    () => (typeof outputs[id] !== 'string' ? 'invalid state' : outputs[id]),
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
    const concatStr = `${outputs[inputs[id]['id1']] || ''}${outputs[inputs[id]['id2']] || ''}`;
    if (concatStr !== outputs[id]) setOutputs({ ...outputs, [id]: concatStr });
  }, [outputs[inputs[id]['id1']], outputs[inputs[id]['id2']], inputs[id].forceRender]);

  const cardProps = {
    startPos,
    title: 'String Concatenate',
    toConsole,
    log,
  };

  return (
    <CardWrapper {...cardProps}>
      <div className="content">{outputs[id]}</div>
      <div id={connectorOneId} className="input first string" onClick={handleFirstInput} />
      <div id={connectorTwoId} className="input second string" onClick={handleSecondInput} />
      <div id={id} className="output string" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
