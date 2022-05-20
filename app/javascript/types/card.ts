import PositionType from './Position';

type CardType = {
  id: string;
  position: PositionType;
}

const defCardPos: PositionType = {x: 0, y: 0}

export { CardType as default, defCardPos }