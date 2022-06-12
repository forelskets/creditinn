import {applyMiddleware ,combineReducers , createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import AuthReducer from './reducers/AuthReducer';
import TablesReqReducer from './reducers/TablesReducers';  
import {composeWithDevTools} from 'redux-devtools-extension'

const rootReducers = combineReducers({AuthReducer , TablesReqReducer});

const middleware = [thunkMiddleware];

const Store = createStore(rootReducers , composeWithDevTools(applyMiddleware(...middleware)));

export default Store;