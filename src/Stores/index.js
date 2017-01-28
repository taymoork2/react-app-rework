import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import * as reducers from '../Reducers';
import { ReduxDevTools as DevTools } from '../Components';

export const history = createBrowserHistory();
export const reducer = combineReducers({
  ...reducers,
});

export const store = () => {
  if (process.env.NODE_ENV !== 'production') {
    return createStore(
      connectRouter(history)(reducer),
      compose(
        applyMiddleware(
          thunk,
          routerMiddleware(history),
        ),
        DevTools.instrument(),
      ),
    );
  }

  return createStore(
    connectRouter(history)(reducer),
    compose(
      applyMiddleware(
        thunk,
        routerMiddleware(history),
      ),
    ),
  );
};