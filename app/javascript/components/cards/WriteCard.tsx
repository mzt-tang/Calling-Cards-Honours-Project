import React, { useEffect, useState } from 'react';
import PositionType from '@cc-types/position';
import { Button, Input } from '@mui/material';

import '@cc-styles/card_content.scss';
import CardWrapper from '@cc-components/CardWrapper';

export default function WriteCard({
  id,
  startPos,
  outputs,
  inputs,
  setInputs,
  giveInput,
  toConsole,
}: {
  id: string;
  startPos: PositionType;
  outputs: object;
  inputs: object;
  setInputs: React.Dispatch<React.SetStateAction<object>>;
  giveInput: (id: string) => string;
  toConsole: (log: string) => void;
}) {
  const log = 'no output';
  const connectorId = id + '#id1';

  const handleInput = () => {
    const inputId = giveInput(connectorId);
    if (inputId === null || inputId == id) return;
    setInputs({ ...inputs, [id]: { ...inputs[id], id1: inputId } });
  };

  const cardProps = {
    id,
    startPos,
    title: 'File Write',
    toConsole,
    log,
    width: null,
    height: null,
  };

  const [fileName, setFileName] = useState('untitled.txt');

  // create a function that downloads a file with the fileName as the filename and outputs[inputs[id].id1] as the contents
  const downloadFile = () => {
    if (inputs[id].id1 === '') return;
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(outputs[inputs[id].id1])
    );
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <CardWrapper {...cardProps}>
      <div className="content">
        <Input onChange={(e) => setFileName(e.target.value!)} placeholder="filename" />
      </div>
      <Button
        className="additional"
        size="small"
        variant="contained"
        color="success"
        onClick={downloadFile}
      >
        download file
      </Button>
      <div id={connectorId} className="connector input center" onClick={handleInput} />
    </CardWrapper>
  );
}
