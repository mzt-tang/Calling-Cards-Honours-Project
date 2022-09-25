import React from 'react';
import Button from '@mui/material/Button';
import * as Create from '@cc-util/createNewCards';
import { ButtonGroup } from '@mui/material';

export default function CardSelector(props) {
  const { setCards, setInputs, setOutputs, inputs, outputs } = props;

  return (
    <div className="selector">
      <ButtonGroup variant="contained" orientation="vertical" color="primary">
        <Button onClick={() => Create.newInputCard(setCards, setOutputs, outputs)}>
          File Read Card
        </Button>
        <Button onClick={() => Create.newWriteCard(setCards, setInputs, inputs)}>
          File Write Card
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="contained" orientation="vertical" color="secondary">
        <Button onClick={() => Create.newStringCard(setCards, setOutputs, outputs)}>
          String Card
        </Button>
        <Button
          onClick={() => Create.newConcatCard(setCards, setInputs, setOutputs, inputs, outputs)}
        >
          String Concat Card
        </Button>
        <Button
          onClick={() => Create.newSplitCard(setCards, setInputs, setOutputs, inputs, outputs)}
        >
          String Split Card
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="contained" orientation="vertical" color="warning">
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
      </ButtonGroup>

      <ButtonGroup variant="contained" orientation="vertical" color="success">
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
        <Button onClick={() => Create.newNotCard(setCards, setInputs, setOutputs, inputs, outputs)}>
          Not Operator
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="contained" orientation="vertical" color="info">
        <Button
          onClick={() => Create.newForEachCard(setCards, setInputs, setOutputs, inputs, outputs)}
        >
          Loop
        </Button>
      </ButtonGroup>
    </div>
  );
}
