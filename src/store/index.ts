import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import missionsReducer from './reducers/missionsReducer';
import missionReducer from './reducers/missionReducer';
import alertReducer from './reducers/alertReducer';

const rootReducer = combineReducers({
  missions: missionsReducer,
  mission: missionReducer,
  alert: alertReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
