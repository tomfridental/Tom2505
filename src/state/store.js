import { applyMiddleware, compose, createStore } from 'redux'

import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers/rootReducer';

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  return store
}
