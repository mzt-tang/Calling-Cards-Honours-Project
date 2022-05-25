import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Xarrow, { Xwrapper } from 'react-xarrows';
import { v4 as uuid } from 'uuid';
import CardType, { defCardPos } from '@cc-types/card';
import StringCard from '@cc-components/StringCard';

export default function App() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [arrows, setArrows] = useState([]);
  const [connect, setConnect] = useState([]);
  const [outputId, setOutputId] = useState<string>(null);

  const newCard = () => {
    const newCard: CardType = { id: uuid(), position: defCardPos };
    setCards((cards) => [...cards, newCard]);
  };

  const addArrow = ({ start, end }) => {
    setArrows([...arrows, { start, end }]);
  };

  const takeOutput = (id: string) => {
    setOutputId(id);
  };

  const giveInput = (id: string) => {
    if (outputId === null) return;
    addArrow({ start: outputId, end: id });
    setOutputId(null);
  };

  const listCards = cards.map((c) => {
    return (
      <StringCard
        takeOutput={takeOutput}
        giveInput={giveInput}
        key={c.id}
        id={c.id}
        defPos={c.position}
      />
    );
  });

  const listArrows = arrows.map((a) => {
    return <Xarrow key={`${a.start}-${a.end}`} start={a.start} end={a.end} />;
  });

  return (
    <div className="app">
      <Button variant="contained" onClick={newCard}>
        New Box
      </Button>
      <Xwrapper>
        {listCards}
        {listArrows}
      </Xwrapper>
    </div>
  );
}
