import React from 'react';
import StringCard from '@cc-components/StringCard';
import StringConcatCard from '@cc-components/StringConcatCard';
import NumberCard from '@cc-components/NumberCard';
import SumCard from '@cc-components/SumCard';
import SubtractCard from '@cc-components/SubtractCard';

const cards = {
  number: NumberCard,
  summation: SumCard,
  subtract: SubtractCard,
  string: StringCard,
  stringConcat: StringConcatCard,
};

export default function Card(props) {
  const { type, ...rest } = props;
  return React.createElement(cards[type], rest);
}
