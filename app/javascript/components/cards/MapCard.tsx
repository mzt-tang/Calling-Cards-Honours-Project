import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import '@cc-styles/card_content.scss';
import CardWrapper from '@cc-components/CardWrapper';

export default function MapCard({
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
    () =>
      !Array.isArray(outputs[id])
        ? 'invalid state'
        : outputs[id].map((eId) => outputs[eId]).join(', '),
    [outputs[id]]
  );
  const connectorId = id + '#id1';

  const eleId = id + '#elem';
  const eleConnectorId = eleId + '#id1';

  const [currentElem, setCurrentElem] = useState(0);

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

  useEffect(() => {
    if (inputs[id].id1 === '') return;
    setCurrentElem(0);
    // delete all outputs objects that use the id from the outputs[id] array and empty the array from outputs[id]
    const newOutputs = {
      ...outputs,
      [id]: [],
      [inputs[eleId].id1]: null,
      [eleId]: outputs[outputs[inputs[id].id1][0]],
    };
    outputs[id].forEach((element) => {
      delete newOutputs[element];
    });

    newOutputs[eleId] = outputs[outputs[inputs[id].id1][0]];
    setOutputs(newOutputs);
  }, [outputs[inputs[id]['id1']], inputs[id].forceRender]);

  // When connected
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

    const newElemId = uuid();
    const newElem = outputs[inputs[eleId].id1];
    const newOutputs = { ...outputs, [newElemId]: newElem };
    newOutputs[id] = [...outputs[id], newElemId];

    if (currentElem < outputs[inputs[id].id1].length - 1) {
      newOutputs[eleId] = outputs[outputs[inputs[id].id1][currentElem + 1]];
      newOutputs[inputs[eleId].id1] = null; // force the element's output to be null
      setCurrentElem(currentElem + 1);
    }

    setOutputs(newOutputs);
  }, [outputs[inputs[eleId].id1], inputs[eleId].forceRender]);

  const cardProps = {
    startPos,
    title: 'Map',
    toConsole,
    log,
    width: 400,
    height: 100,
  };

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
          ELEMENT OUT
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
        id={eleId}
        className="element out unknown"
        onClick={() => {
          takeId(eleId);
        }}
      />
      <div id={eleConnectorId} className="element in unknown" onClick={handleLoopInput} />
      <div id={id} className="output list" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
