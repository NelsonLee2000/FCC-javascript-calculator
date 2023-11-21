import { useState } from 'react'
import './App.css'
import { NumberButtons } from './types'
import { create, all,} from 'mathjs'

const numberButtons: NumberButtons[] = [
  {
    num: 1,
    disStr: "1",
    name: "one"
  },
  {
    num: 2,
    disStr: "2",
    name: "two"
  },
  {
    num: 3,
    disStr: "3",
    name: "three"
  },
  {
    num: 4,
    disStr: "4",
    name: "four"
  },
  {
    num: 5,
    disStr: "5",
    name: "five"
  },
  {
    num: 6,
    disStr: "6",
    name: "six"
  },
  {
    num: 7,
    disStr: "7",
    name: "seven"
  },
  {
    num: 8,
    disStr: "8",
    name: "eight"
  },
  {
    num: 9,
    disStr: "9",
    name: "nine"
  },
  {
    num: 0,
    disStr: "0",
    name: "zero"
  }
];



function App() {
  const [lower, setLower] = useState("0")
  const [upper, setUpper] = useState("0")
  const defaultState: string = "0"
  const operators = /[+\-\/x]/;

  const resetStateBoth = () => {
    setLower(defaultState);
    setUpper(defaultState);
  };

  const handleClickAdd = () => {
    if (upper === "0") {
      setUpper("+");
      setLower("+");
      return;
    }
    if(upper.includes("=")) {
      setUpper(lower+"+");
      setLower("+");
    } else {
      setUpper((prevUpper) => prevUpper.concat("+"));
    setLower("+");
  }
  };

  const handleClickSubtract = () => {
    if (upper === "0") {
      setUpper("-");
      setLower("-");
      return;
    }
    if(upper.includes("=")) {
      setUpper(lower+"-");
      setLower("-");
    } else {setUpper((prevUpper) => prevUpper.concat("-"));
    setLower("-")};
  }

  const handleClickMultiply = () => {
    if (upper === "0") {
      setUpper("*");
      setLower("x");
      return;
    }
    if(upper.includes("=")) {
      setUpper(lower+"*");
      setLower("x");
    } else {setUpper((prevUpper) => prevUpper.concat("*"));
    setLower("x")};
  }

  const handleClickDivide = () => {
    if (upper === "0") {
      setUpper("/");
      setLower("/");
      return;
    }
    if(upper.includes("=")) {
      setUpper(lower+"/");
      setLower("/");
    } else {setUpper((prevUpper) => prevUpper.concat("/"));
    setLower("/")};
  }

  const handleClickEquals = () => {
    if (operators.test(lower)) return;
    const config = {};
    const math = create(all, config);
    let result = math.evaluate(upper);
    setLower(result);
    setUpper((prevUpper) => prevUpper.concat("="+result));
  }

  const handleClickDecimal = () => {
    if(lower.includes(".")) return;
    if (upper === "0") {
      setUpper("0.");
      setLower("0.");
      return;
    } 
    if (operators.test(lower)) {
      setLower("0.");
      setUpper((prevUpper) => prevUpper.concat("."));
      return;
    }
    if(upper.includes("=")) {
      setUpper("0.");
      setLower("0.");
    }else {setUpper((prevUpper) => prevUpper.concat("."));
    setLower((prevLower) => prevLower.concat("."))};
  }




  interface NumProps{
    numberButtons: NumberButtons
    } 

  const Digit = ({numberButtons}: NumProps) => {
    
    const handleClickNum = () => {
      if (upper === defaultState) {
        setLower(numberButtons.disStr);
        setUpper(numberButtons.disStr);
      }
      else if (operators.test(lower)) {
        setLower(numberButtons.disStr);
        setUpper((prevUpper) => prevUpper.concat(numberButtons.disStr));
      }
      else if (upper.includes("=")) {
        setLower(numberButtons.disStr);
        setUpper(numberButtons.disStr);
      }
      else {
        setLower((prevLower) => prevLower.concat(numberButtons.disStr));
        setUpper((prevUpper) => prevUpper.concat(numberButtons.disStr));
      }
    };

    return (
        <button
        className = "numButt"
        id = {numberButtons.name}
        onClick = {handleClickNum}
        >{numberButtons.disStr}
        </button>
    )
  }
  
  return (
    <>
    <h1 id="maintitle">Nelson's Calculator App</h1>
    <div className="calculator">
      <h3 id="highdisplay">{upper}</h3>
      <h2 id = "lowdisplay">{lower}</h2>
      <button onClick = {resetStateBoth} id="clear">AC</button>
      <button id = "add" onClick={handleClickAdd}>+</button>
      <button id = "subtract" onClick={handleClickSubtract} >-</button>
      <button id = "multiply" onClick={handleClickMultiply}>x</button>
      <button id = "divide" onClick={handleClickDivide}>/</button>
        {numberButtons.map((nums) => (
          <Digit numberButtons={nums} key={nums.num} />
        ))}
      <button id = "decimal" onClick={handleClickDecimal}>.</button>
      <button id = "equals" onClick={handleClickEquals}>=</button>
      </div>
    </>
  )
}

export default App
