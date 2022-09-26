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
  const log = useMemo(() => outputs[id].toString(), [outputs[id]]);
  const cardProps = {
    id,
    startPos,
    title: 'Number',
    toConsole,
    log,
    width: null,
    height: null,
  };

  return (
    <CardWrapper {...cardProps}>
      <div className="content">
        <TextField
          variant="standard"
          type="number"
          label="number"
          onChange={(e) => setOutputs({ ...outputs, [id]: +e.target.value! })}
        />
      </div>
      <div className="connector output" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
