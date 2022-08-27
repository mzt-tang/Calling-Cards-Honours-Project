import React, { ReactNode, useState } from 'react';
import { IconButton } from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import Draggable, { DraggableData } from 'react-draggable';
import PositionType from '../types/position';
import { useXarrow } from 'react-xarrows';

import '@cc-styles/card_wrapper.scss';

export default function CardWrapper({
  id,
  startPos,
  title,
  toConsole,
  log,
  children,
}: {
  id: string;
  startPos: PositionType;
  title: string;
  children: ReactNode;
  toConsole: (log: string) => void;
  log: string;
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
        <div className="box header">
          <div className="inv" />
          <div className="title">{title}</div>
          <IconButton
            className="logger"
            onClick={() => {
              console.log(log);
              toConsole(log);
            }}
          >
            <FeedIcon />
          </IconButton>
        </div>
        {children}
      </div>
    </Draggable>
  );
}
