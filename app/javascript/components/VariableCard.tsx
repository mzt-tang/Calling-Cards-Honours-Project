import React, { useState } from 'react';
import { Button, Input } from '@mui/material';
import Draggable, { DraggableData } from 'react-draggable';
import PositionType from '../types/position';
import Card from './Card';

export default function VariableCard({
  doConnect,
  id,
  defPos,
}: {
  doConnect: any;
  id: string;
  defPos: PositionType;
}) {
  const [variable, setVariable] = useState<string | number | boolean>();

  //a box... with a function...
  //Inputs
  //output

  return (
    <Card id={id} defPos={defPos} doConnect={doConnect}>
      <div>
        {/* <Input onChange={(e) => setVariable(e.target.value!)} /> */}A card
        that moves!
      </div>
    </Card>
  );
}
