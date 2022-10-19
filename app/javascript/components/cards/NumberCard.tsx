import React, { useMemo } from 'react';
import { TextField } from '@mui/material';
import PositionType from '@cc-types/position';
import CardWrapper from '@cc-components/CardWrapper';

import '@cc-styles/card_content.scss';

export default function NumberCard({
  id,
  startPos,
  outputs,
  setOutputs,
  takeId,
  toConsole,
}: {
  id: string;
  startPos: PositionType;
  outputs: object;
  setOutputs: React.Dispatch<React.SetStateAction<object>>;
  takeId: (id: string) => void;
  toConsole: (log: string) => void;
}) {
  const log = useMemo(
    () => (typeof outputs[id] !== 'number' ? 'invalid state' : outputs[id].toString()),
    [outputs[id]]
  );
  const cardProps = {
    startPos,
    title: 'Number',
    toConsole,
    log,
    width: 200,
    height: 100,
  };

  return (
    <CardWrapper {...cardProps}>
      <input
        className="content small"
        type="number"
        onChange={(e) => setOutputs({ ...outputs, [id]: +e.target.value! })}
      />
      <div id={id} className="output numberO" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
