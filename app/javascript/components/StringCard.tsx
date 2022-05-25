import React, { useState } from 'react';
import PositionType from '@cc-types/position';
import Card from '@cc-components/Card';

export default function StringCard({
  id,
  defPos,
  takeOutput,
  giveInput
}: {
  id: string,
  defPos: PositionType,
  takeOutput: (id: string) => void;
  giveInput: (id: string) => void
}) {
  const [stringVar, setStringVar] = useState<string>();

  //a box... with a function...
  //Inputs
  //output

  return (
    <Card id={id} defPos={defPos} takeOutput={takeOutput} giveInput={giveInput}>
      <div>
        {/* <Input onChange={(e) => setVariable(e.target.value!)} /> */}A card
        that moves!
      </div>
    </Card>
  );
}
