import React, { ReactNode, useState } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import PositionType from '../types/position';
import { useXarrow } from 'react-xarrows';
import { Button } from '@mui/material';

export default function Card({
  id,
  defPos,
  doConnect,
  children,
}: {
  id: string;
  defPos: PositionType;
  doConnect: any;
  children: ReactNode;
}) {
  const [position, setPosition] = useState<PositionType>(defPos);
  const updateXarrow = useXarrow();

  const handleDragStop = (_e, data: DraggableData) => {
    updateXarrow();
    setPosition({ x: data.x, y: data.y });
  };

  const handleConnect = () => {
    doConnect(id);
  };

  return (
    <Draggable
      defaultPosition={position}
      onDrag={updateXarrow}
      onStop={handleDragStop}
    >
      <div id={id} className="box">
        <Button variant="contained" size="small" onClick={handleConnect}>
          Connect
        </Button>
        {children}
      </div>
    </Draggable>
  );
}
