import React, { ReactNode, useState } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import PositionType from '../types/position';
import { useXarrow } from 'react-xarrows';

// import '@cc-styles/card_wrapper.scss';

export default function CardWrapper({
  id,
  startPos,
  title,
  children,
}: {
  id: string;
  startPos: PositionType;
  title: string;
  children: ReactNode;
}) {
  const [position, setPosition] = useState<PositionType>(startPos);
  const updateXarrow = useXarrow();

  const handleDragStop = (_e, data: DraggableData) => {
    updateXarrow();
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable defaultPosition={position} onDrag={updateXarrow} onStop={handleDragStop}>
      <div id={id} className="box">
        <div className="box header">{title}</div>
        {children}
      </div>
    </Draggable>
  );
}
