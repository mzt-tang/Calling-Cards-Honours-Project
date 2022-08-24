import React, { useMemo } from 'react';
import { Input } from '@mui/material';
import PositionType from '@cc-types/position';
import CardWrapper from '@cc-components/CardWrapper';

import '@cc-styles/card_content.scss';

export default function StringCard({
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
  const log = useMemo(() => outputs[id], [outputs[id]]);
  const cardProps = {
    id,
    startPos,
    title: 'String',
    toConsole,
    log,
  };

  return (
    <CardWrapper {...cardProps}>
      <div className="content">
        <Input onChange={(e) => setOutputs({ ...outputs, [id]: e.target.value! })} />
      </div>
      <div className="connector output" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
