import React from 'react';
import StringCard from '@cc-cards/StringCard';
import StringConcatCard from '@cc-cards/StringConcatCard';
import NumberCard from '@cc-cards/NumberCard';
import SumCard from '@cc-cards/SumCard';
import SubtractCard from '@cc-cards/SubtractCard';
import InputCard from '@cc-cards/InputCard';
import BooleanCard from '@cc-cards/BooleanCard';
import LogicalOperatorCard from '@cc-cards/LogicalOperatorCard';
import ComparatorOpCard from '@cc-cards/ComparatorOpCard';
import NotCard from '@cc-cards/NotCard';

const cards = {
  number: NumberCard,
  summation: SumCard,
  subtract: SubtractCard,
  string: StringCard,
  stringConcat: StringConcatCard,
  fileRead: InputCard,
  boolean: BooleanCard,
  logicalOperator: LogicalOperatorCard,
  comparatorOperator: ComparatorOpCard,
  notOperator: NotCard,
};

export default function Card(props) {
  const { type, ...rest } = props;
  return React.createElement(cards[type], rest);
}
