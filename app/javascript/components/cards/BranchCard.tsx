import React, { useMemo, useEffect, useState } from 'react';
import CardWrapper from '@cc-components/CardWrapper';

export default function BranchCard({
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
  const log = useMemo(() => {
    if (outputs[id] === undefined) {
      return 'undefined';
    }
    if (outputs[id] === null) {
      return 'null';
    }
    return outputs[id].hasOwnProperty('toString') ? 'invalid state' : outputs[id].toString();
  }, [outputs[id]]);
  const connectorId = id + '#id1';
  const trueConId = id + '#id2';
  const falseConId = id + '#id3';

  const handleInput = () => {
    const inputId = giveInput(connectorId);
    if (inputId === null || inputId == id) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id1: inputId } });
  };

  const handleTrueInput = () => {
    const inputId = giveInput(trueConId);
    if (inputId === null || inputId == id) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id2: inputId } });
  };

  const handleFalseInput = () => {
    const inputId = giveInput(falseConId);
    if (inputId === null || inputId == id) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id3: inputId } });
  };

  useEffect(() => {
    if (inputs[id].id1 === '') return;
    const trueOutput = inputs[id].id2 === '' ? null : outputs[inputs[id].id2];
    const falseOutput = inputs[id].id3 === '' ? null : outputs[inputs[id].id3];
    const booleanSwitch = inputs[id].id1 === '' ? true : outputs[inputs[id].id1];
    setOutputs({ ...outputs, [id]: booleanSwitch ? trueOutput : falseOutput });
  }, [
    outputs[inputs[id]['id1']],
    outputs[inputs[id]['id2']],
    outputs[inputs[id]['id3']],
    inputs[id].forceRender,
  ]);

  const cardProps = {
    startPos,
    title: 'If Else',
    toConsole,
    log,
  };

  return (
    <CardWrapper {...cardProps}>
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
        >{`true output\nfalse output`}</div>
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
        id={trueConId}
        className="connector input minor"
        onClick={handleTrueInput}
      />
      <div
        style={{ transform: 'translate(-50%, -5px)' }}
        id={falseConId}
        className="connector input minor"
        onClick={handleFalseInput}
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
