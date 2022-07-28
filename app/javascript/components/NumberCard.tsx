import React from 'react';
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
}: {
  id: string;
  startPos: PositionType;
  outputs: object;
  setOutputs: React.Dispatch<React.SetStateAction<object>>;
  takeId: (id: string) => void;
}) {
  const cardProps = {
    id,
    startPos,
    title: 'Number',
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
      {/* <div className="connector output" onClick={() => console.log(JSON.stringify(outputs))} /> */}
    </CardWrapper>
  );
}
