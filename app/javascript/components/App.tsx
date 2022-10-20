import React, { useState } from 'react';
import Xarrow, { Xwrapper } from 'react-xarrows';
import CardType from '@cc-types/card';
import Card from '@cc-components/Card';
import CardSelector from '@cc-components/CardSelector';
import Console from '@cc-components/Console';

export default function App() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [arrows, setArrows] = useState([]);
  const [inputs, setInputs] = useState<object>({});
  const [outputs, setOutputs] = useState<object>({});
  const [mousePosition, setMousePosition] = useState({
    left: 0,
    top: 0,
  });

  const [appConsole, setAppConsole] = useState<string[]>([]);

  const [connect, setConnect] = useState<string>(null); // Connect

  const toConsole = (log: string) => {
    setAppConsole((console) => [...console, `>>\t${log}`]);
  };

  const clearConsole = () => {
    setAppConsole([]);
  };

  const addArrow = ({ start, end }) => {
    setArrows([...arrows, { start, end }]);
  };

  const deleteArrow = (id: string) => {
    arrows.forEach((a) => {
      const end = a.end;
      const o = end.substring(0, end.length - 4);
      if (id.substring(id.length - 1) === '0') {
        setInputs({ ...inputs, [o]: { ...inputs[o], [end.substring(end.length - 3)]: [] } });
      } else if (id.substring(id.length - 5) !== 'START') {
        setInputs({ ...inputs, [o]: { ...inputs[o], [end.substring(end.length - 3)]: '' } });
      }
    });
    setArrows(arrows.filter((a) => `${a.start}-${a.end}` !== id));
  };

  const takeConnect = (id: string) => {
    setConnect(id);
  };

  const giveInput = (id: string) => {
    if (connect === null || arrows.find((a) => a.end === id && id.substring(id.length - 1) !== '0'))
      return null;
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
      toConsole,
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
        color="CornflowerBlue"
        path="smooth"
        zIndex={1}
        passProps={{
          id: `${a.start}-${a.end}`,
          onClick: (e) => {
            deleteArrow(e.currentTarget.id);
          },
        }}
      />
    );
  });

  const cardProps = {
    setCards,
    setInputs,
    setOutputs,
    inputs,
    outputs,
  };

  function handleMouseMove(ev) {
    setMousePosition({ left: ev.pageX, top: ev.pageY });
  }

  return (
    <div className="app">
      <CardSelector {...cardProps} />
      <div className="workspace">
        <Xwrapper>
          {listArrows}
          {listCards}
        </Xwrapper>
      </div>
      <Console console={appConsole} />
    </div>
  );
}
