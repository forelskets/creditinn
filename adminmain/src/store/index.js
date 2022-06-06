import {applyMiddleware ,combineReducers , createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import AuthReducer from './reducers/AuthReducer'  
import {composeWithDevTools} from 'redux-devtools-extension'

const rootReducers = combineReducers({AuthReducer});

const middleware = [thunkMiddleware];

const Store = createStore(rootReducers , composeWithDevTools(applyMiddleware(...middleware)));

export default Store;