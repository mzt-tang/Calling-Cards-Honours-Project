import React, { useState } from 'react';
import { Input } from '@mui/material';
import Draggable, { DraggableData } from 'react-draggable';
import { useXarrow } from 'react-xarrows';
import PositionType from '@cc-types/position';
import CardWrapper from '@cc-components/CardWrapper';

// import '@cc-styles/string_card.scss';

export default function StringCard({
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
    title: 'String',
  };

  return (
    <CardWrapper {...cardProps}>
      <div className="box content">
        <Input onChange={(e) => setOutputs({ ...outputs, [id]: e.target.value! })} />
      </div>
      <div className="connector output" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
