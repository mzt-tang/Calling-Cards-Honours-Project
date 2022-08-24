import CardType, { defCardPos } from '@cc-types/card';
import { v4 as uuid } from 'uuid';

export { newNumberCard, newSumCard, newSubtractCard, newStringCard, newConcatCard, newInputCard };

const newNumberCard = (
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  setOutputs: React.Dispatch<React.SetStateAction<object>>,
  outputs: object
) => {
  const newId = uuid();
  const newCard: CardType = { id: newId, position: defCardPos, type: 'number' };
  setCards((cards) => [...cards, newCard]);
  setOutputs({ ...outputs, [newId]: 0 });
};

const newSumCard = (
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  setInputs: React.Dispatch<React.SetStateAction<object>>,
  setOutputs: React.Dispatch<React.SetStateAction<object>>,
  inputs: object,
  outputs: object
) => {
  const newId = uuid();
  const newCard: CardType = { id: newId, position: defCardPos, type: 'summation' };
  setCards((cards) => [...cards, newCard]);
  setInputs({ ...inputs, [newId]: [] });
  setOutputs({ ...outputs, [newId]: 0 });
};

const newSubtractCard = (
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  setInputs: React.Dispatch<React.SetStateAction<object>>,
  setOutputs: React.Dispatch<React.SetStateAction<object>>,
  inputs: object,
  outputs: object
) => {
  const newId = uuid();
  const newCard: CardType = { id: newId, position: defCardPos, type: 'subtract' };
  setCards((cards) => [...cards, newCard]);
  setInputs({ ...inputs, [newId]: { id1: 0, id2: 0 } });
  setOutputs({ ...outputs, [newId]: 0 });
};

const newStringCard = (
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  setOutputs: React.Dispatch<React.SetStateAction<object>>,
  outputs: object
) => {
  const newId = uuid();
  const newCard: CardType = { id: newId, position: defCardPos, type: 'string' };
  setCards((cards) => [...cards, newCard]);
  setOutputs({ ...outputs, [newId]: '' });
};

const newConcatCard = (
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  setInputs: React.Dispatch<React.SetStateAction<object>>,
  setOutputs: React.Dispatch<React.SetStateAction<object>>,
  inputs: object,
  outputs: object
) => {
  const newId = uuid();
  const newCard: CardType = { id: newId, position: defCardPos, type: 'stringConcat' };
  setCards((cards) => [...cards, newCard]);
  setInputs({ ...inputs, [newId]: { id1: '', id2: '' } });
  setOutputs({ ...outputs, [newId]: '' });
};

const newInputCard = (
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  setOutputs: React.Dispatch<React.SetStateAction<object>>,
  outputs: object
) => {
  const newId = uuid();
  const newCard: CardType = { id: newId, position: defCardPos, type: 'fileRead' };
  setCards((cards) => [...cards, newCard]);
  setOutputs({ ...outputs, [newId]: '' });
};