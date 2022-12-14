import React from 'react';
import StringCard from '@cc-cards/StringCard';
import StringConcatCard from '@cc-cards/StringConcatCard';
import NumberCard from '@cc-cards/NumberCard';
import SumCard from '@cc-cards/SumCard';
import SubtractCard from '@cc-cards/SubtractCard';
import FileReadCard from '@cc-components/cards/FileReadCard';
import BooleanCard from '@cc-cards/BooleanCard';
import LogicalOperatorCard from '@cc-cards/LogicalOperatorCard';
import ComparatorOpCard from '@cc-cards/ComparatorOpCard';
import NotCard from '@cc-cards/NotCard';
import WriteCard from '@cc-cards/WriteCard';
import StringSplitCard from '@cc-cards/StringSplitCard';
import MapCard from '@cc-components/cards/MapCard';
import FilterCard from '@cc-components/cards/FilterCard';
import StrLengthCard from '@cc-cards/StrLengthCard';
import ReduceCard from '@cc-cards/ReduceCard';
import ProductCard from '@cc-cards/ProductCard';
import DivisionCard from '@cc-cards/DivisionCard';
import ToStringCard from '@cc-cards/ToStringCard';
import ToNumberCard from '@cc-cards/ToNumberCard';
import SubstringCard from '@cc-cards/SubstringCard';
import BranchCard from '@cc-cards/BranchCard';

const cards = {
  number: NumberCard,
  summation: SumCard,
  subtract: SubtractCard,
  string: StringCard,
  strLength: StrLengthCard,
  stringConcat: StringConcatCard,
  stringSplit: StringSplitCard,
  fileRead: FileReadCard,
  fileWrite: WriteCard,
  boolean: BooleanCard,
  logicalOperator: LogicalOperatorCard,
  comparatorOperator: ComparatorOpCard,
  notOperator: NotCard,
  map: MapCard,
  filter: FilterCard,
  reduce: ReduceCard,
  product: ProductCard,
  division: DivisionCard,
  toString: ToStringCard,
  toNumber: ToNumberCard,
  substring: SubstringCard,
  branch: BranchCard,
};

export default function Card(props) {
  const { type, ...rest } = props;
  return React.createElement(cards[type], rest);
}
