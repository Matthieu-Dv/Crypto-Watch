import { SET_LIST_DISPLAY } from '../action/list.action';

// Typage de l'état initial
interface ListState {
  showList: boolean;
}

// Typage de l'action
interface ListAction {
  type: typeof SET_LIST_DISPLAY; // Le type d'action est limité à SET_LIST_DISPLAY
  payload: boolean; // Le payload doit être un boolean
}

// État initial
const initialState: ListState = { showList: false };

// Reducer
export default function listReducer(
  state: ListState = initialState,
  action: ListAction
): ListState {
  switch (action.type) {
    case SET_LIST_DISPLAY:
      return { showList: action.payload };
    default:
      return state;
  }
}
