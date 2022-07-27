import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Xarrow, { Xwrapper } from 'react-xarrows';
import { v4 as uuid } from 'uuid';
import CardType, { defCardPos } from '@cc-types/card';
import Card from '@cc-components/Card';

export default function App() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [arrows, setArrows] = useState([]);
  const [inputs, setInputs] = useState<object>({});
  const [outputs, setOutputs] = useState<object>({});

  const [connect, setConnect] = useState<string>(null); // Connect

  const newStringCard = () => {
    const newId = uuid();
    const newCard: CardType = { id: newId, position: defCardPos, type: 'string' };
    setCards((cards) => [...cards, newCard]);
    setOutputs({ ...outputs, [newId]: '' });
  };

  const newConcatCard = () => {
    const newId = uuid();
    const newCard: CardType = { id: newId, position: defCardPos, type: 'stringConcat' };
    setCards((cards) => [...cards, newCard]);
    setInputs({ ...inputs, [newId]: { id1: '', id2: '' } });
    setOutputs({ ...outputs, [newId]: '' });
  };

  const addArrow = ({ start, end }) => {
    setArrows([...arrows, { start, end }]);
  };

  const takeConnect = (id: string) => {
    setConnect(id);
  };

  const giveInput = (id: string) => {
    if (connect === null) {
      console.log('this should return...');
      return;
    }
    const oId = connect;
    if (!arrows.find((a) => a.start === oId && a.end === id)) addArrow({ start: oId, end: id }); // stops same key issues
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

  const deleteArrow = (id: string) => {
    setArrows(arrows.filter((a) => `${a.start}-${a.end}` !== id));
  };

  return (
    <div className="app">
      <Button variant="contained" onClick={newStringCard}>
        String Card
      </Button>

      <Button variant="contained" onClick={newConcatCard}>
        String Concat Card
      </Button>
      <Xwrapper>
        {listCards}
        {listArrows}
      </Xwrapper>
    </div>
  );
}
