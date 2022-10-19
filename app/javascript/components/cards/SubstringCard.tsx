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
    const substring = (outputs[inputs[id].id1] || '').substring(start, end);
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
  };

  return (
    <CardWrapper {...cardProps}>
      {/* <div className="content"></div> */}
      <div className="substring">
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            backgroundColor: 'gray',
            width: 90,
            height: 60,
            borderRadius: 5,
            gridColumnStart: 'c2',
            gridColumnEnd: 'span 1',
            gridRowStart: 'r3',
            gridRowEnd: 'span 1',
          }}
        >{`start index\nend index`}</div>
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            backgroundColor: 'gray',
            width: 110,
            height: 90,
            borderRadius: 5,
            gridColumnStart: 'c4',
            gridColumnEnd: 'span 2',
            gridRowStart: 'r3',
            gridRowEnd: 'span 1',
          }}
        >
          {outputs[id]}
        </div>
      </div>
      <div
        style={{ transform: 'translate(-50%, -25px)' }}
        id={startConId}
        className="input number"
        onClick={handleStartInput}
      />
      <div
        style={{ transform: 'translate(-50%, -5px)' }}
        id={endConId}
        className="input number"
        onClick={handleEndInput}
      />
      <div
        style={{ transform: 'translate(-50%, 40px)' }}
        id={connectorId}
        className="input string"
        onClick={handleInput}
      />
      <div id={id} className="output string" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
