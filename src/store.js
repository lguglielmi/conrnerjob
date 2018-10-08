// Dependencies
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'


// Reducer
import global from '_reducers'

const initialState = {}

// Middlewares
const middlewares = [ thunk ]


export default createStore(
  global,
  initialState,
  applyMiddleware(...middlewares),
)
