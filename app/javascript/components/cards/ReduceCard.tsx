import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import '@cc-styles/card_content.scss';
import CardWrapper from '@cc-components/CardWrapper';

export default function ReduceCard({
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
    () => (typeof outputs[id] !== 'string' ? 'invalid state' : outputs[id]),
    [outputs[id]]
  );
  const connectorId = id + '#id1';

  const eleId = id + '#elem';
  const sumId = id + '#sum';
  const eleConnectorId = eleId + '#id1';
  const startConnectorId = id + '#START';

  const [currentElem, setCurrentElem] = useState(0);

  const handleStartSumInput = () => {
    const inputId = giveInput(startConnectorId);
    if (inputId === null) return;
    // set the output to the sum and reset the loop
    const newOutputs = {
      ...outputs,
      [id]: outputs[inputId],
      [sumId]: outputs[inputId],
      [inputs[eleId].id1]: null,
      [eleId]: outputs[outputs[inputs[id].id1][0]], // todo: this is dangerous when the input id is not connected yet.
    };
    setCurrentElem(0);

    setOutputs(newOutputs);
    setInputs({ ...inputs, [id]: { ...inputs[id], start: inputId } });
  };

  const handleLoopInput = () => {
    const inputId = giveInput(eleConnectorId);
    if (inputId === null || inputId == id || inputId == eleId) return;
    setInputs({ ...inputs, [eleId]: { ...inputs[eleId], id1: inputId } });
  };

  const handleActualInput = () => {
    const inputId = giveInput(connectorId);
    if (inputId === null) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id1: inputId } });
  };

  // When the input array changes. Do a reset essentially.
  useEffect(() => {
    if (inputs[id].id1 === '') return;

    // delete all outputs objects that use the id from the outputs[id] array and empty the array from outputs[id]
    const newOutputs = {
      ...outputs,
      [id]: outputs[inputs[id].start],
      [sumId]: outputs[inputs[id].start],
      [inputs[eleId].id1]: null,
      [eleId]: outputs[outputs[inputs[id].id1][0]], // todo: this is dangerous when the input id is not connected yet.
    };
    setCurrentElem(0);

    // clean up outputs if output is an array
    if (Array.isArray(outputs[id])) {
      outputs[id].forEach((element) => {
        delete newOutputs[element];
      });
    }

    setOutputs(newOutputs);
  }, [outputs[inputs[id].id1], outputs[inputs[id].start], inputs[id].forceRender]);

  // When first connected
  useEffect(() => {
    if (inputs[eleId] === undefined || inputs[eleId].id1 === '') return;

    // force a render of the element's input
    if (outputs[inputs[eleId].id1] === null) {
      setInputs({
        ...inputs,
        [inputs[eleId].id1]: {
          ...inputs[inputs[eleId].id1],
          forceRender: !inputs[inputs[eleId].id1].forceRender,
        },
      });
      return;
    }

    const newElem = outputs[inputs[eleId].id1];
    const newOutputs = { ...outputs, [id]: newElem };

    if (currentElem < outputs[inputs[id].id1].length - 1) {
      newOutputs[eleId] = outputs[outputs[inputs[id].id1][currentElem + 1]];
      newOutputs[sumId] = newElem;
      newOutputs[inputs[eleId].id1] = null; // force the element's output to be null
      setCurrentElem(currentElem + 1);
    }

    setOutputs(newOutputs);
  }, [outputs[inputs[eleId].id1], inputs[eleId].forceRender]);

  const cardProps = {
    startPos,
    title: 'Reduce',
    toConsole,
    log,
    width: 400,
    height: 100,
  };

  // a start sum node
  // a sum input node
  // a element input node
  // a element output node
  return (
    <CardWrapper {...cardProps}>
      <div className="loop">
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            backgroundColor: 'gray',
            width: 140,
            height: 40,
            borderRadius: 5,
            gridColumnStart: 'c2',
            gridColumnEnd: 'span 1',
            gridRowStart: 'r2',
            gridRowEnd: 'span 1',
          }}
        >
          ST | SUM | ELEM
        </div>
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            backgroundColor: 'gray',
            width: 140,
            height: 40,
            borderRadius: 5,
            gridColumnStart: 'c4',
            gridColumnEnd: 'span 1',
            gridRowStart: 'r2',
            gridRowEnd: 'span 1',
          }}
        >
          ELEMENT IN
        </div>
      </div>
      <div id={connectorId} className="input center list" onClick={handleActualInput} />
      <div
        id={startConnectorId}
        style={{ transform: 'translate(-160px, -50%)' }}
        className="element in unknown"
        onClick={handleStartSumInput}
      />
      <div
        id={sumId}
        style={{ transform: 'translate(-120px, -50%)' }}
        className="element out unknown"
        onClick={() => takeId(sumId)} // A 'limit' output sum to be stopped updating when the element reaches max.
      />
      <div
        id={eleId}
        style={{ transform: 'translate(-80px, -50%)' }}
        className="element out unknown"
        onClick={() => {
          takeId(eleId);
        }}
      />
      <div
        id={eleConnectorId}
        style={{ transform: 'translate(100px, -50%)' }}
        className="element inNT unknown"
        onClick={handleLoopInput}
      />
      <div id={id} className="output unknown" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
