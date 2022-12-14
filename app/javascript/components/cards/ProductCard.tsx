import React, { useEffect, useMemo } from 'react';
import PositionType from '@cc-types/position';
import CardWrapper from '@cc-components/CardWrapper';

import '@cc-styles/card_content.scss';

export default function ProductCard({
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
    () => (typeof outputs[id] !== 'number' ? 'invalid state' : outputs[id].toString()),
    [outputs[id]]
  );
  const connectorId = id + '#id0';

  const handleInput = () => {
    const inputId = giveInput(connectorId);
    if (inputId === null || inputId == id) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id0: [...inputs[id].id0, inputId] } });
  };

  useEffect(() => {
    let total: number = 1;
    inputs[id].id0.forEach((i: string) => (total *= outputs[i]));
    if (total !== outputs[id]) setOutputs({ ...outputs, [id]: total });
  }, [inputs[id].id0.map((i: string) => outputs[i]), inputs[id].forceRender]);

  const cardProps = {
    startPos,
    title: 'Product',
    toConsole,
    log,
    width: 200,
    height: 100,
  };

  return (
    <CardWrapper {...cardProps}>
      <div className="content small">{outputs[id]}</div>
      <div id={connectorId} className="input large center number" onClick={handleInput} />
      <div id={id} className="output number" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
