import { useReducer } from "react";
import "./Styles.css";
import DigitButton from "./DigitButton";
import OperatorButton from "./OperatorButton";
import { ACTIONS } from "./Actions";
import eveluate from "./Eveluate";
import reducer from "./Reducer";

export default function Calculator() {
  const [{ previousOperend, currentOperend, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
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
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGITS })}>
        Del
      </button>

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
