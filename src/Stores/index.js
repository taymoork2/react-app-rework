import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from '../Reducers';
import { ReduxDevTools as DevTools } from '../Components';

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

export const store = process.env.NODE_ENV !== 'production' ? createStore(
  connectRouter(history)(reducer),
  compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      logger,
    ),
    DevTools.instrument(),
  ),
) : createStore(
  connectRouter(history)(reducer),
  compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
    ),
  ),
);
