import React from 'react';
import Button from '@mui/material/Button';
import * as Create from '@cc-util/createNewCards';
import { ButtonGroup } from '@mui/material';

export default function CardSelector(props) {
  const { setCards, setInputs, setOutputs, inputs, outputs } = props;

  return (
    <div className="selector">
      <ButtonGroup orientation="vertical">
        <Button onClick={() => Create.newInputCard(setCards, setOutputs, outputs)}>
          File Read Card
        </Button>

        <Button onClick={() => Create.newStringCard(setCards, setOutputs, outputs)}>
          String Card
        </Button>

        <Button
          onClick={() => Create.newConcatCard(setCards, setInputs, setOutputs, inputs, outputs)}
        >
          String Concat Card
        </Button>
        <Button onClick={() => Create.newNumberCard(setCards, setOutputs, outputs)}>
          Number Card
        </Button>
        <Button onClick={() => Create.newSumCard(setCards, setInputs, setOutputs, inputs, outputs)}>
          Sum Card
        </Button>
        <Button
          onClick={() => Create.newSubtractCard(setCards, setInputs, setOutputs, inputs, outputs)}
        >
          Subtract Card
        </Button>
        {/* <Button
        onClick={() => Create.newSubtractCard(setCards, setInputs, setOutputs, inputs, outputs)}
      >
        Multiplication Card
      </Button> */}
        {/* <Button
        onClick={() => Create.newSubtractCard(setCards, setInputs, setOutputs, inputs, outputs)}
      >
        Division Card
      </Button> */}
        <Button onClick={() => Create.newBooleanCard(setCards, setOutputs, outputs)}>
          Boolean
        </Button>
        <Button
          onClick={() =>
            Create.newLogOperatorCard(setCards, setInputs, setOutputs, inputs, outputs)
          }
        >
          Logical Operator
        </Button>
        <Button
          onClick={() =>
            Create.newComOperatorCard(setCards, setInputs, setOutputs, inputs, outputs)
          }
        >
          Comparator Operator
        </Button>
      </ButtonGroup>
    </div>
  );
}
