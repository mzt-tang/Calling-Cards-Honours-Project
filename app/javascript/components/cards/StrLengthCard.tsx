import React, { useMemo, useEffect } from 'react';
import CardWrapper from '@cc-components/CardWrapper';

export default function StrLengthCard({
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
    () => (typeof outputs[id] !== 'number' ? 'invalid state' : outputs[id].toString()),
    [outputs[id]]
  );
  const connectorId = id + '#id1';

  const handleInput = () => {
    const inputId = giveInput(connectorId);
    if (inputId === null || inputId == id) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id1: inputId } });
  };

  useEffect(() => {
    if (inputs[id].id1 === '') return;
    const strLength = (outputs[inputs[id].id1] || '').length;
    if (strLength !== outputs[id]) setOutputs({ ...outputs, [id]: strLength });
  }, [outputs[inputs[id]['id1']], inputs[id].forceRender]);

  const cardProps = {
    startPos,
    title: 'String Length',
    toConsole,
    log,
    width: 200,
    height: 100,
  };

  return (
    <CardWrapper {...cardProps}>
      <div className="content small">{outputs[id]}</div>
      <div id={connectorId} className="input center stringI" onClick={handleInput} />
      <div id={id} className="output numberO" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
