import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { v4 as uuid } from 'uuid';
import CardType, { defCardPos } from '../types/card';
import VariableCard from './VariableCard';
import Xarrow, { Xwrapper } from 'react-xarrows';

export default function App() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [arrows, setArrows] = useState([]);
  const [connect, setConnect] = useState([]);

  const newCard = () => {
    const newCard: CardType = { id: uuid(), position: defCardPos };
    setCards((cards) => [...cards, newCard]);
  };

  const addArrow = ({ start, end }) => {
    setArrows([...arrows, { start, end }]);
  };

  const doConnect = (id) => {
    if (connect.length === 0) {
      setConnect([id]);
    } else if (connect.length !== 0 && connect[0] !== id) {
      addArrow({ start: connect[0], end: id });
      setConnect([]);
    }
  };

  const listCards = cards.map((c) => {
    return (
      <VariableCard
        doConnect={doConnect}
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
