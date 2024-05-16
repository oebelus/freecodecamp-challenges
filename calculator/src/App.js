import './App.css';
import DigitButton from './digitButton.js'
import OperationButton from './operationButton.js';
import { useReducer } from 'react';

export const ACTIONS = {
  ADD: 'add',
  CHOOSE: 'choose',
  CLEAR: 'clear',
  DELETE: 'delete',
  EQUALS: 'equals'
}

function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD:
      if (state.overwrite) {
        return {
          ...state,
          current: payload.digit,
          overwrite: false
        }
      }
      if (payload.digit === "0" && state.current === "0") return state
      
      if (payload.digit === "." && state.current.includes(".")) return state

      if (payload.digit !== "0" && state.current === "0") {
        return {
          ...state,
          current: payload.digit,
        };
      }

      return {
        ...state,
        current: `${state.current || ""}${payload.digit}`
      }
      
    case ACTIONS.CLEAR:
      return {
        ...state,
        current: "0",
        previous: null,
        operation: null
      }

    case ACTIONS.EQUALS:
      if (state.operation == null || state.current == null || state.previous == null)
        return state
      return {
        ...state,
        overwrite: true,
        previous: null,
        operation: null,
        current: evaluate(state)
      }

    case ACTIONS.CHOOSE:
      if (state.current == null && state.previous == null) {
        return state
      }

      // Handle switching operation when current is empty
      // 5 * - + 5 = 10
      if (state.current == null) {
        if ((state.operation === "x" || state.operation === "/") && payload.operation === "-") {
          console.log("minus")
          return {
            ...state,
            current: payload.operation,
          }
        } return {
          ...state,
          operation: payload.operation
        }
      }

      if (state.current === "-" && payload.operation === "+") {
        return {
          ...state,
          current: null,
          previous: state.previous,
          operation: payload.operation
        }
      }

      // Handle setting up for a new operation after evaluation
      if (state.previous == null) {
        return {
          ...state,
          operation: payload.operation,
          previous: state.current,
          current: null
        }
      }

      return {
        ...state,
        previous: evaluate(state),
        operation: payload.operation,
        current: null,
      }
    default: return state;
  }
}

function evaluate({current, previous, operation}) {
  const prev = parseFloat(previous);
  const curr = parseFloat(current);
  if (isNaN(prev) || isNaN(current)) return "0"
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + curr
      break
    case "-":
      computation = prev - curr
      break
    case "x":
      computation = prev * curr
      break
    case "/":
      computation = prev / curr
      break
    default:
      break;
  }
  return computation.toString()
}

function App() {

  const [{current, previous, operation}, dispatch] = useReducer(
    reducer, 
    { current: "0", previous: null, operation: null }
  )
  
  return (
    <div className="calculator">
      <div id="display" className="display">
        <div className="previous">{previous} {operation}</div>
        <div className="current">{current}</div>
      </div>
      <button className="width-two" id='clear' onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <OperationButton id="divide" operation = "/" dispatch={dispatch}/>
      <OperationButton id="multiply" operation = "x" dispatch={dispatch}/>
      <DigitButton id="seven" digit = "7" dispatch={dispatch}/>
      <DigitButton id="eight" digit = "8" dispatch={dispatch}/>
      <DigitButton id="nine" digit = "9" dispatch={dispatch}/>
      <OperationButton id="subtract" operation = "-" dispatch={dispatch}/>
      <DigitButton id="four" digit = "4" dispatch={dispatch}/>
      <DigitButton id="five" digit = "5" dispatch={dispatch}/>
      <DigitButton id="six" digit = "6" dispatch={dispatch}/>
      <OperationButton id="add" operation = "+" dispatch={dispatch}/>
      <DigitButton id="one" digit = "1" dispatch={dispatch}/>
      <DigitButton id="two" digit = "2" dispatch={dispatch}/>
      <DigitButton id="three" digit = "3" dispatch={dispatch}/>
      <button className="height-two" id="equals" onClick={() => dispatch({type: ACTIONS.EQUALS})}>=</button>
      <DigitButton id="zero" className="width-two" digit = "0" dispatch={dispatch}/>
      <DigitButton id="decimal" digit = "." dispatch={dispatch}/>
    </div>
  );
}

export default App;
