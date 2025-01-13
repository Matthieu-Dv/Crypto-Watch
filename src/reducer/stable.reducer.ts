import { SET_STABLE_STATE } from '../action/stable.action';

// Définition du type pour l'état
interface StableState {
  showStable: boolean;
}

// Définition du type pour l'action
interface SetStableStateAction {
  type: typeof SET_STABLE_STATE;
  payload: boolean;
}

// Typage de l'action dans un type générique Redux
type StableActionTypes = SetStableStateAction;

// Valeur initiale de l'état
const initialState: StableState = { showStable: true };

// Reducer avec typage
export default function stableReducer(
  state = initialState,
  action: StableActionTypes
): StableState {
  switch (action.type) {
    case SET_STABLE_STATE:
      return { showStable: action.payload };
    default:
      return state;
  }
}
