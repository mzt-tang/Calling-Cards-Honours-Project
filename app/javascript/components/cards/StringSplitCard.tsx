import React, { useEffect, useMemo, useState } from 'react';
import PositionType from '@cc-types/position';
import CardWrapper from '@cc-components/CardWrapper';
import { Input } from '@mui/material';
import { v4 as uuid } from 'uuid';

import '@cc-styles/card_content.scss';

export default function StringSplitCard({
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
    () =>
      !Array.isArray(outputs[id])
        ? 'invalid state'
        : outputs[id].map((eleId) => outputs[eleId]).join(', '),
    [outputs[id]]
  );
  const connectorId = id + '#id1';

  const handleInput = () => {
    const inputId = giveInput(connectorId);
    if (inputId === null || inputId == id) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id1: inputId } });
  };

  const [split, setSplit] = useState('');

  useEffect(() => {
    if (
      inputs[id].id1 === '' ||
      (split.charAt(0) !== "'" && split.charAt(split.length - 1) !== "'")
    )
      return;
    const stringSplit = outputs[inputs[id].id1].split(split.substring(1, split.length - 1));
    const newOutputs = { ...outputs };
    const newOutputIds = [];
    stringSplit.forEach((element) => {
      const newId = uuid();
      newOutputs[newId] = element;
      newOutputIds.push(newId);
    });
    newOutputs[id] = newOutputIds;
    setOutputs(newOutputs);
  }, [outputs[inputs[id].id1], split, inputs[id].forceRender]);

  const cardProps = {
    startPos,
    title: 'Split',
    toConsole,
    log,
    width: 200,
    height: 100,
  };

  return (
    <CardWrapper {...cardProps}>
      <div className="content small">
        <Input placeholder="' '" onChange={(e) => setSplit(e.target.value!)} />
      </div>
      <div id={connectorId} className="input center string" onClick={handleInput} />
      <div id={id} className="output list" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
