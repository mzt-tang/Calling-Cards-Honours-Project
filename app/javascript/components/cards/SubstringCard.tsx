import React, { useMemo, useEffect, useState } from 'react';
import CardWrapper from '@cc-components/CardWrapper';

export default function SubstringCard({
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
    () => (typeof outputs[id] !== 'string' ? 'invalid state' : outputs[id].toString()),
    [outputs[id]]
  );
  const connectorId = id + '#id1';
  const startConId = id + '#id2';
  const endConId = id + '#id3';

  const handleInput = () => {
    const inputId = giveInput(connectorId);
    if (inputId === null || inputId == id) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id1: inputId } });
  };

  const handleStartInput = () => {
    const inputId = giveInput(startConId);
    if (inputId === null || inputId == id) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id2: inputId } });
  };

  const handleEndInput = () => {
    const inputId = giveInput(endConId);
    if (inputId === null || inputId == id) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id3: inputId } });
  };

  useEffect(() => {
    if (inputs[id].id1 === '') return;
    const start = inputs[id].id2 === '' ? 0 : outputs[inputs[id].id2];
    const end = inputs[id].id3 === '' ? outputs[inputs[id].id1].length : outputs[inputs[id].id3];
    const substring = outputs[inputs[id].id1].substring(start, end);
    if (substring !== outputs[id]) setOutputs({ ...outputs, [id]: substring });
  }, [
    outputs[inputs[id]['id1']],
    outputs[inputs[id]['id2']],
    outputs[inputs[id]['id3']],
    inputs[id].forceRender,
  ]);

  const cardProps = {
    startPos,
    title: 'Substring',
    toConsole,
    log,
    width: null,
    height: null,
  };

  return (
    <CardWrapper {...cardProps}>
      <div className="content">{outputs[id]}</div>
      <div
        style={{ transform: 'translate(-50%, -30px)' }}
        id={startConId}
        className="connector input minor"
        onClick={handleStartInput}
      />
      <div
        style={{ transform: 'translate(-50%, -10px)' }}
        id={endConId}
        className="connector input minor"
        onClick={handleEndInput}
      />
      <div
        style={{ transform: 'translate(-50%, 40px)' }}
        id={connectorId}
        className="connector input"
        onClick={handleInput}
      />
      <div id={id} className="connector output" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
