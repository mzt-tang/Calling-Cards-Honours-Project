import CardType, { defCardPos } from '@cc-types/card';
import { v4 as uuid } from 'uuid';

export {
  newNumberCard,
  newSumCard,
  newSubtractCard,
  newStringCard,
  newConcatCard,
  newInputCard,
  newBooleanCard,
  newLogOperatorCard,
  newComOperatorCard,
  newNotCard,
  newWriteCard,
  newSplitCard,
  newForEachCard,
};

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

const newBooleanCard = (
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  setOutputs: React.Dispatch<React.SetStateAction<object>>,
  outputs: object
) => {
  const newId = uuid();
  const newCard: CardType = { id: newId, position: defCardPos, type: 'boolean' };
  setCards((cards) => [...cards, newCard]);
  setOutputs({ ...outputs, [newId]: true });
};

const newLogOperatorCard = (
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  setInputs: React.Dispatch<React.SetStateAction<object>>,
  setOutputs: React.Dispatch<React.SetStateAction<object>>,
  inputs: object,
  outputs: object
) => {
  const newId = uuid();
  const newCard: CardType = { id: newId, position: defCardPos, type: 'logicalOperator' };
  setCards((cards) => [...cards, newCard]);
  setInputs({ ...inputs, [newId]: { id1: '', id2: '' } });
  setOutputs({ ...outputs, [newId]: false });
};

const newComOperatorCard = (
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  setInputs: React.Dispatch<React.SetStateAction<object>>,
  setOutputs: React.Dispatch<React.SetStateAction<object>>,
  inputs: object,
  outputs: object
) => {
  const newId = uuid();
  const newCard: CardType = { id: newId, position: defCardPos, type: 'comparatorOperator' };
  setCards((cards) => [...cards, newCard]);
  setInputs({ ...inputs, [newId]: { id1: '', id2: '' } });
  setOutputs({ ...outputs, [newId]: false });
};

const newNotCard = (
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  setInputs: React.Dispatch<React.SetStateAction<object>>,
  setOutputs: React.Dispatch<React.SetStateAction<object>>,
  inputs: object,
  outputs: object
) => {
  const newId = uuid();
  const newCard: CardType = { id: newId, position: defCardPos, type: 'notOperator' };
  setCards((cards) => [...cards, newCard]);
  setInputs({ ...inputs, [newId]: { id1: '', id2: '' } });
  setOutputs({ ...outputs, [newId]: false });
};

const newWriteCard = (
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  setInputs: React.Dispatch<React.SetStateAction<object>>,
  inputs: object,
) => {
  const newId = uuid();
  const newCard: CardType = { id: newId, position: defCardPos, type: 'fileWrite' };
  setCards((cards) => [...cards, newCard]);
  setInputs({ ...inputs, [newId]: { id1: '' } });
};

const newSplitCard = (
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  setInputs: React.Dispatch<React.SetStateAction<object>>,
  setOutputs: React.Dispatch<React.SetStateAction<object>>,
  inputs: object,
  outputs: object
) => {
  const newId = uuid();
  const newCard: CardType = { id: newId, position: defCardPos, type: 'stringSplit' };
  setCards((cards) => [...cards, newCard]);
  setInputs({ ...inputs, [newId]: { id1: '' } });
  setOutputs({ ...outputs, [newId]: [] });
};

const newForEachCard = (
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>,
  setInputs: React.Dispatch<React.SetStateAction<object>>,
  setOutputs: React.Dispatch<React.SetStateAction<object>>,
  inputs: object,
  outputs: object
) => {
  const newId = uuid();
  const elemId = newId + '#elem';
  const newCard: CardType = { id: newId, position: defCardPos, type: 'forEach' };
  setCards((cards) => [...cards, newCard]);
  setInputs({ ...inputs, [newId]: { id1: '' }, [elemId]: { id1: ''} });
  setOutputs({ ...outputs, [newId]: [], [elemId]: '' });
};