import { AlertState, AlertAction, SET_ALERT } from '../../util/types';

const initialState: AlertState = {
  message: '',
};

const reducer = (state = initialState, action: AlertAction): AlertState => {
  switch (action.type) {
    case SET_ALERT:
      return {
        message: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
