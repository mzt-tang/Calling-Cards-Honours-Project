import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Xarrow, { Xwrapper } from 'react-xarrows';
import CardType from '@cc-types/card';
import Card from '@cc-components/Card';
import * as Create from '@cc-util/createNewCards';

export default function App() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [arrows, setArrows] = useState([]);
  const [inputs, setInputs] = useState<object>({});
  const [outputs, setOutputs] = useState<object>({});

  const [connect, setConnect] = useState<string>(null); // Connect

  const addArrow = ({ start, end }) => {
    setArrows([...arrows, { start, end }]);
  };

  const deleteArrow = (id: string) => {
    arrows.forEach((a) => {
      const end = a.end;
      const o = end.substring(0, end.length - 4);
      setInputs({ ...inputs, [o]: { ...inputs[o], [end.substring(end.length - 3)]: '' } });
    });
    setArrows(arrows.filter((a) => `${a.start}-${a.end}` !== id));
  };

  const takeConnect = (id: string) => {
    setConnect(id);
  };

  const giveInput = (id: string) => {
    if (connect === null || arrows.find((a) => a.end === id)) return null;
    const oId = connect;
    if (!arrows.find((a) => a.start === oId && a.end === id)) {
      addArrow({ start: oId, end: id });
    }
    setConnect(null);
    return oId;
  };

  const listCards = cards.map((c) => {
    const cardProps = {
      key: c.id,
      id: c.id,
      type: c.type,
      startPos: c.position,
      inputs,
      setInputs,
      outputs,
      setOutputs,
      takeId: takeConnect,
      giveInput,
    };
    return <Card {...cardProps} />;
  });

  const listArrows = arrows.map((a) => {
    return (
      <Xarrow
        key={`${a.start}-${a.end}`}
        start={a.start}
        end={a.end}
        startAnchor="right"
        endAnchor="left"
        color="coral"
        path="grid"
        passProps={{
          id: `${a.start}-${a.end}`,
          onClick: (e) => {
            deleteArrow(e.currentTarget.id);
          },
        }}
      />
    );
  });

  return (
    <div className="app">
      <Button
        variant="contained"
        onClick={() => Create.newStringCard(setCards, setOutputs, outputs)}
      >
        String Card
      </Button>

      <Button
        variant="contained"
        onClick={() => Create.newConcatCard(setCards, setInputs, setOutputs, inputs, outputs)}
      >
        String Concat Card
      </Button>
      <Button
        variant="contained"
        onClick={() => Create.newNumberCard(setCards, setOutputs, outputs)}
      >
        Number Card
      </Button>
      <Button
        variant="contained"
        onClick={() => Create.newSumCard(setCards, setInputs, setOutputs, inputs, outputs)}
      >
        Sum Card
      </Button>
      <Button
        variant="contained"
        onClick={() => Create.newSubtractCard(setCards, setInputs, setOutputs, inputs, outputs)}
      >
        Subtract Card
      </Button>
      <Xwrapper>
        {listCards}
        {listArrows}
      </Xwrapper>
    </div>
  );
}
