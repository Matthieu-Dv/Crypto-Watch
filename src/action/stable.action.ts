import { Dispatch } from 'redux';

export const SET_STABLE_STATE = 'SET_STABLE_STATE';

// Définir le type de l'action
interface SetStableStateAction {
  type: typeof SET_STABLE_STATE;
  payload: boolean;
}

// Action créateur typé
export const setStableState =
  (bool: boolean) =>
  (dispatch: Dispatch<SetStableStateAction>): void => {
    dispatch({ type: SET_STABLE_STATE, payload: bool });
  };
