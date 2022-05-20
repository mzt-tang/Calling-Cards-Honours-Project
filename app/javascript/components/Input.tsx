import React, { useState, useRef } from 'react';

export default function Input() {
  const [input, setInput] = useState();
  const [output, setOutput] = useState();
  const inputFile = useRef(null);

  const onClick = (e) => {
    inputFile.current.click();
  };

  return (
    <div>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: 'none' }}
      />
      <button onClick={onClick}>open file browser</button>
    </div>
  );
}
