import { Dispatch } from 'redux';

export const SET_LIST_DISPLAY = 'SET_LIST_DISPLAY';

// Définition du type de l'action
interface SetListDisplayAction {
  type: typeof SET_LIST_DISPLAY;
  payload: boolean;
}

// Action créateur typé
export const setListDisplay =
  (bool: boolean) =>
  (dispatch: Dispatch<SetListDisplayAction>): void => {
    dispatch({ type: SET_LIST_DISPLAY, payload: bool });
  };
