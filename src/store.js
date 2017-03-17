import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router/immutable';
import { combineReducers } from 'redux-immutable';
import createHistory from 'history/createBrowserHistory';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from './Reducers';

export const history = createHistory();
export const reducer = combineReducers({
  ...reducers,
});
const initialState = Immutable.Map();
const connectedMiddleware = routerMiddleware(history);
const logger = createLogger({
  predicate: ((getState, action) => action.type !== 'INCREMENT'), // To stop console spam
  stateTransformer: (state) => {
    const newState = Object.keys(state).map((i) => {
      if (Immutable.Iterable.isIterable(state[i])) return state[i].toJS();
      return state[i];
    });

    return newState;
  },
});
// eslint-disable-next-line no-underscore-dangle
const composeDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  serialize: {
    immutable: Immutable,
  },
});
const store = process.env.NODE_ENV === 'production' ? createStore(
  connectRouter(history)(reducer),
  initialState,
  compose(
    applyMiddleware(
      thunk,
      connectedMiddleware,
    ),
  ),
) : createStore(
  connectRouter(history)(reducer),
  initialState,
  composeDevTools(
    applyMiddleware(
      thunk,
      connectedMiddleware,
      logger,
    ),
  ),
);

export default store;
