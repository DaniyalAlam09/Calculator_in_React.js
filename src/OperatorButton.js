import { ACTIONS } from "./App";

export default function OperatorButton({ dispatch, operation }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.CHOOSE, payload: { operation } })}
    >
      {operation}
    </button>
  );
}
