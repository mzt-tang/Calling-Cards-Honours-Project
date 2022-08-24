import React from 'react';
import StringCard from '@cc-cards/StringCard';
import StringConcatCard from '@cc-cards/StringConcatCard';
import NumberCard from '@cc-cards/NumberCard';
import SumCard from '@cc-cards/SumCard';
import SubtractCard from '@cc-cards/SubtractCard';
import InputCard from '@cc-cards/InputCard';

const cards = {
  number: NumberCard,
  summation: SumCard,
  subtract: SubtractCard,
  string: StringCard,
  stringConcat: StringConcatCard,
  fileRead: InputCard,
};

export default function Card(props) {
  const { type, ...rest } = props;
  return React.createElement(cards[type], rest);
}
