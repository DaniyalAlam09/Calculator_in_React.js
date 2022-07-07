import { useReducer } from "react";
import "./Styles.css";
import DigitButton from "./DigitButton";
import OperatorButton from "./OperatorButton";

export const ACTIONS = {
  ADD_DIGITS: "addDigits",
  CLEAR_DIGITS: "clearDigits",
  DELETE_DIGITS: "deleteDigits",
  CHOOSE: "choose",
  EVELUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGITS:
      if (state.overwrite) {
        return {
          ...state,
          currentOperend: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperend === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperend.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperend: `${state.currentOperend || ""}${payload.digit}`,
      };
    case ACTIONS.CLEAR_DIGITS:
      return {};
    case ACTIONS.CHOOSE:
      if (state.currentOperend == null && state.previousOperend == null) {
        return state;
      }
      if (state.previousOperend == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperend: state.currentOperend,
          currentOperend: null,
        };
      }
      if (state.currentOperend == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      return {
        ...state,
        previousOperend: eveluate(state),
        operation: payload.operation,
        currentOperend: null,
      };
    case ACTIONS.EVELUATE:
      if (
        state.operation == null ||
        state.currentOperend == null ||
        state.previousOperend == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperend: null,
        operation: null,
        currentOperend: eveluate(state),
      };
    case ACTIONS.DELETE_DIGITS:
      if(state.overwrite){
        return {
          ...state,
          overwrite:false,
          currentOperend:null,

        }
      }
      if(state.currentOperend==null){
        return state
      }

      return{
        ...state,
        currentOperend: state.currentOperend.slice(0,-1)
      }
      
  }
}
function eveluate({ previousOperend, currentOperend, operation }) {
  const previous = parseFloat(previousOperend);
  const current = parseFloat(currentOperend);
  if (isNaN(previous) || isNaN(current)) {
    return "";
  }
  let reslut = "";
  switch (operation) {
    case "+":
      reslut = previous + current;
      break;
    case "-":
      reslut = previous - current;
      break;
    case "/":
      reslut = previous / current;
      break;
    case "*":
      reslut = previous * current;
      break;
  }
  return reslut.toString();
}

function App() {
  const [{ previousOperend, currentOperend, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  // dispatch({type:ACTIONS.ADD_DIGITS, payload:{digit:1}})
  return (
    <div className="main-grid">
      <div className="output">
        <div className="previous-grid">
          {previousOperend} {operation}
        </div>
        <div className="current-grid">{currentOperend}</div>
      </div>
      <button
        className="two-space"
        onClick={() => dispatch({ type: ACTIONS.CLEAR_DIGITS })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGITS })}>Del</button>

      <OperatorButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperatorButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperatorButton operation="-" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperatorButton operation="+" dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <button
        className="two-space"
        onClick={() => dispatch({ type: ACTIONS.EVELUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
