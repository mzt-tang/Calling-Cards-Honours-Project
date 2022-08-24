import React from 'react';
import Button from '@mui/material/Button';
import * as Create from '@cc-util/createNewCards';

export default function CardSelector(props) {
  const { setCards, setInputs, setOutputs, inputs, outputs } = props;

  return (
    <div className="selector">
      <Button
        variant="contained"
        onClick={() => Create.newInputCard(setCards, setOutputs, outputs)}
      >
        File Read Card
      </Button>

      <Button
        variant="contained"
        onClick={() => Create.newStringCard(setCards, setOutputs, outputs)}
      >
        String Card
      </Button>

      <Button
        variant="contained"
        onClick={() => Create.newConcatCard(setCards, setInputs, setOutputs, inputs, outputs)}
      >
        String Concat Card
      </Button>
      <Button
        variant="contained"
        onClick={() => Create.newNumberCard(setCards, setOutputs, outputs)}
      >
        Number Card
      </Button>
      <Button
        variant="contained"
        onClick={() => Create.newSumCard(setCards, setInputs, setOutputs, inputs, outputs)}
      >
        Sum Card
      </Button>
      <Button
        variant="contained"
        onClick={() => Create.newSubtractCard(setCards, setInputs, setOutputs, inputs, outputs)}
      >
        Subtract Card
      </Button>
      <Button
        variant="contained"
        onClick={() => Create.newSubtractCard(setCards, setInputs, setOutputs, inputs, outputs)}
      >
        Multiplication Card
      </Button>
      <Button
        variant="contained"
        onClick={() => Create.newSubtractCard(setCards, setInputs, setOutputs, inputs, outputs)}
      >
        Division Card
      </Button>
    </div>
  );
}
