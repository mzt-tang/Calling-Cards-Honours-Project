import React from 'react';
import StringCard from '@cc-components/StringCard';
import StringConcatCard from '@cc-components/StringConcatCard';

const cards = {
  string: StringCard,
  stringConcat: StringConcatCard,
};

export default function Card(props) {
  const { type, ...rest } = props;
  return React.createElement(cards[type], rest);
}
