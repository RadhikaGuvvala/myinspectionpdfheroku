import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducer/rootReducer';

const makeStore = context =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export const wrapper = createWrapper(makeStore);
