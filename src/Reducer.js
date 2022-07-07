import { ACTIONS } from "./Actions";
import eveluate from "./Eveluate";

export default function reducer(state, { type, payload }) {
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
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperend: null,
        };
      }
      if (state.currentOperend == null) {
        return state;
      }

      return {
        ...state,
        currentOperend: state.currentOperend.slice(0, -1),
      };
  }
}
