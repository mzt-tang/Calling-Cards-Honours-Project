import React, { useState, useEffect } from 'react';
import PositionType from '@cc-types/position';
import Draggable, { DraggableData } from 'react-draggable';
import { useXarrow } from 'react-xarrows';

// import '@cc-styles/card_wrapper.scss';

export default function StringConcatCard({
  id,
  defPos,
  outputs,
  setOutputs,
  takeId,
  giveInput,
}: {
  id: string;
  defPos: PositionType;
  outputs: any;
  setOutputs: any;
  takeId: (id: string) => void;
  giveInput: (id: string) => string;
}) {
  const [inputIds, setInputIds] = useState<{ id1: string; id2: string }>({ id1: '', id2: '' });
  const [position, setPosition] = useState<PositionType>(defPos);
  const updateXarrow = useXarrow();

  const connectorOneId = id + '#i1';
  const connectorTwoId = id + '#i2';

  const handleDragStop = (_e, data: DraggableData) => {
    updateXarrow();
    setPosition({ x: data.x, y: data.y });
  };

  const handleFirstInput = () => {
    setInputIds({ ...inputIds, id1: giveInput(connectorOneId) });
  };

  const handleSecondInput = () => {
    setInputIds({ ...inputIds, id2: giveInput(connectorTwoId) });
  };

  useEffect(() => {
    const concatStr = `${outputs[inputIds['id1']] || ''}${outputs[inputIds['id2']] || ''}`;
    if (concatStr !== outputs[id]) setOutputs({ ...outputs, [id]: concatStr });
  }, [outputs[inputIds['id1']], outputs[inputIds['id2']]]);

  return (
    <Draggable defaultPosition={position} onDrag={updateXarrow} onStop={handleDragStop}>
      <div id={id} className="box">
        <div className="box header">String Concatenate</div>
        <div className="box content">{outputs[id]}</div>
        <div id={connectorOneId} className="connector input first" onClick={handleFirstInput} />
        <div id={connectorTwoId} className="connector input second" onClick={handleSecondInput} />
        <div className="connector output" onClick={() => takeId(id)} />
      </div>
    </Draggable>
    // <CardWrapper
    //   id={id}
    //   defPos={defPos}
    //   title="String Concatenate"
    //   takeOutput={takeOutput}
    //   giveInput={giveInput}
    // >
    //   <div>
    //     <Input onChange={(e) => setStringVar(e.target.value!)} />A card that moves!
    //   </div>
    // </CardWrapper>
  );
}
