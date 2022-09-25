import React, { useEffect, useMemo, useState } from 'react';
import PositionType from '@cc-types/position';
import { v4 as uuid } from 'uuid';

import '@cc-styles/card_content.scss';
import CardWrapper from '@cc-components/CardWrapper';

export default function ForEachCard({
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
  const log = useMemo(() => outputs[id].map((eId) => outputs[eId]).join(', '), [outputs[id]]);
  const connectorId = id + '#id1';

  const eleId = id + '#elem';
  const eleConnectorId = eleId + '#id1';

  const [currentElem, setCurrentElem] = useState(0);

  const handleLoopInput = () => {
    const inputId = giveInput(eleConnectorId);
    console.log('HELLO');
    if (inputId === null || inputId == id || inputId == eleId) return;
    console.log('HELLO2');
    setInputs({ ...inputs, [eleId]: { ...inputs[eleId], id1: inputId } });
  };

  const handleActualInput = () => {
    const inputId = giveInput(connectorId);
    if (inputId === null) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id1: inputId } });
  };

  useEffect(() => {
    console.log('hello 1');
    if (inputs[id].id1 === '') return;
    console.log('TEST');
    setCurrentElem(0);
    // delete all outputs objects that use the id from the outputs[id] array and empty the array from outputs[id]
    const newOutputs = { ...outputs, [id]: [] };
    outputs[id].forEach((element) => {
      delete newOutputs[element];
    });

    newOutputs[eleId] = outputs[outputs[inputs[id].id1][currentElem]];
    setOutputs(newOutputs);
  }, [outputs[inputs[id]['id1']]]);

  // When connected
  useEffect(() => {
    console.log('hello 2');
    if (inputs[eleId] === undefined || inputs[eleId].id1 === '') return;
    const newElemId = uuid();
    const newElem = outputs[inputs[eleId].id1];
    console.log('newElem: ' + newElem);
    const newOutputs = { ...outputs, [newElemId]: newElem };
    newOutputs[id] = [...outputs[id], newElemId];

    if (currentElem < outputs[inputs[id].id1].length - 1) {
      newOutputs[eleId] = outputs[outputs[inputs[id].id1][currentElem + 1]];
      setCurrentElem(currentElem + 1);
    }

    setOutputs(newOutputs);
  }, [outputs[inputs[eleId].id1]]);

  const cardProps = {
    id,
    startPos,
    title: 'For Each',
    toConsole,
    log,
  };

  return (
    <CardWrapper {...cardProps}>
      <div className="content"></div>
      <div id={connectorId} className="connector input center" onClick={handleActualInput} />
      <div
        id={eleId}
        className="connector element out"
        onClick={() => {
          takeId(eleId);
        }}
      />
      <div id={eleConnectorId} className="connector element in" onClick={handleLoopInput} />
      <div className="connector output" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
