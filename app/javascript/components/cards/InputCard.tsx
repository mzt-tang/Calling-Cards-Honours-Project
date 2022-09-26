import React, { useMemo } from 'react';
import { Button } from '@mui/material';
import PositionType from '@cc-types/position';
import CardWrapper from '@cc-components/CardWrapper';

import '@cc-styles/card_content.scss';

export default function InputCard({
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
    title: 'File Read',
    toConsole,
    log,
    width: null,
    height: null,
  };

  const handleReadFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setOutputs({ ...outputs, [id]: text });
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <CardWrapper {...cardProps}>
      <Button className="operation" variant="contained" component="label">
        Upload File
        <input type="file" hidden onChange={handleReadFile} />
      </Button>
      <div className="connector output" onClick={() => takeId(id)} />
    </CardWrapper>
  );
}
