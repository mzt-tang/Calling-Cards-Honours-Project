import React from 'react';
import Button from '@mui/material/Button';
import * as Create from '@cc-util/createNewCards';
import { ButtonGroup } from '@mui/material';

export default function CardSelector(props) {
  const { setCards, setInputs, setOutputs, inputs, outputs } = props;

  return (
    <div className="selector">
      <ButtonGroup variant="contained" orientation="vertical" color="primary">
        <Button onClick={() => Create.newFileReadCard(setCards, setOutputs, outputs)}>
          File Read
        </Button>
        <Button onClick={() => Create.newWriteCard(setCards, setInputs, inputs)}>File Write</Button>
      </ButtonGroup>

      <ButtonGroup variant="contained" orientation="vertical" color="secondary">
        <Button onClick={() => Create.newStringCard(setCards, setOutputs, outputs)}>String</Button>
        <Button
          onClick={() => Create.newStrLengthCard(setCards, setInputs, setOutputs, inputs, outputs)}
        >
          String Length
        </Button>
        <Button
          onClick={() => Create.newConcatCard(setCards, setInputs, setOutputs, inputs, outputs)}
        >
          String Concat
        </Button>
        <Button
          onClick={() => Create.newSplitCard(setCards, setInputs, setOutputs, inputs, outputs)}
        >
          String Split
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="contained" orientation="vertical" color="warning">
        <Button onClick={() => Create.newNumberCard(setCards, setOutputs, outputs)}>Number</Button>
        <Button onClick={() => Create.newSumCard(setCards, setInputs, setOutputs, inputs, outputs)}>
          Sum
        </Button>
        <Button
          onClick={() => Create.newSubtractCard(setCards, setInputs, setOutputs, inputs, outputs)}
        >
          Subtract
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
        <Button onClick={() => Create.newMapCard(setCards, setInputs, setOutputs, inputs, outputs)}>
          Map
        </Button>
        <Button
          onClick={() => Create.newFilterCard(setCards, setInputs, setOutputs, inputs, outputs)}
        >
          Filter
        </Button>
        <Button
          onClick={() => Create.newReduceCard(setCards, setInputs, setOutputs, inputs, outputs)}
        >
          Reduce
        </Button>
      </ButtonGroup>
    </div>
  );
}
