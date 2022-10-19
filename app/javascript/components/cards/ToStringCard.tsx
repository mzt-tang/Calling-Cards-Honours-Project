import React, { useMemo, useEffect } from 'react';
import CardWrapper from '@cc-components/CardWrapper';

export default function ToStringCard({
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
    const convertedString = outputs[inputs[id].id1].toString();
    if (convertedString !== outputs[id]) setOutputs({ ...outputs, [id]: convertedString });
  }, [outputs[inputs[id]['id1']], inputs[id].forceRender]);

  const cardProps = {
    startPos,
    title: 'Number to String',
    toConsole,
    log,
    width: 200,
    height: 100,
  };

  return (
    <CardWrapper {...cardProps}>
      <div className="content small">{outputs[id]}</div>
      <div id={connectorId} className="input center numberI" onClick={handleInput} />
      <div id={id} className="output stringO" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
