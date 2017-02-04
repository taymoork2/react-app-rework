import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from '../Reducers';

export const history = createBrowserHistory();
export const reducer = combineReducers({
  ...reducers,
});
const logger = createLogger({
  stateTransformer: (state) => {
    const newState = Object.keys(state).map((i) => {
      if (Immutable.Iterable.isIterable(state[i])) return state[i].toJS();
      return state[i];
    });

    return newState;
  },
});
const composeEnhancers = process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? // eslint-disable-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ // eslint-disable-line no-underscore-dangle
    serialize: {
      immutable: Immutable,
    },
  }) : compose;

export const store = createStore(
  connectRouter(history)(reducer),
  composeEnhancers(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      logger,
    ),
  ),
);
