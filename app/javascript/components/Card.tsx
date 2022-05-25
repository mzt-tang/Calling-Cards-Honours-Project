import React, { ReactNode, useState } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import PositionType from '../types/position';
import { useXarrow } from 'react-xarrows';

import '@cc-styles/card.scss';

export default function Card({
  id,
  defPos,
  takeOutput,
  giveInput,
  children,
}: {
  id: string;
  defPos: PositionType;
  takeOutput: (id: string) => void;
  giveInput: (id: string) => void;
  children: ReactNode;
}) {
  const [position, setPosition] = useState<PositionType>(defPos);
  const updateXarrow = useXarrow();

  const handleDragStop = (_e, data: DraggableData) => {
    updateXarrow();
    setPosition({ x: data.x, y: data.y });
  };

  const handleInput = () => {
    giveInput(id);
  };

  const handleOutput = () => {
    takeOutput(id);
  };

  return (
    <Draggable defaultPosition={position} onDrag={updateXarrow} onStop={handleDragStop}>
      <div id={id} className="box">
        <div className="connector input" onClick={handleInput} />
        <div className="connector output" onClick={handleOutput} />
        {children}
      </div>
    </Draggable>
  );
}
