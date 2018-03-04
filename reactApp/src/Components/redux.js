/**
 * Created by siyuanxu on 2/22/18.
 */
import { createStore, combineReducers } from "redux";

const userReducer = function(state={}, action) {
    switch (action.type){
        case "CHANGE_NAME": {
            // completely overrides state with an immutable fashion
            state = {...state, name: action.payload};
            break;
        }
        case "CHANGE_AGE": {
            state = {...state, age: action.payload};
            break;
        }
    }
    return state;
};

const tweetsReducer = function(state=[], action) {

    return state;
};

const reducers = combineReducers(reducers, {
    user: userReducer,
    tweets: tweetsReducer()
});

const store = createStore(reducer, {
    user: {
        name: "Will",
        age: 35
    },
    tweets: []
});

store.subscribe(() => {
   console.log("store changed", store.getState());
});

store.dispatch({type: "CHANGE_NAME", payload: "Will"});
store.dispatch({type: "CHANGE_AGE", payload: 35});


// middleware
import { createStore, applyMiddleware } from "redux";
const reducer = (initialState=0, action) => {

};

const logger = (store) => (mext) => (action) => {
    console.log("action fired!", action);
    action.type = "DEC";
    next(action);
};

const middleware = applyMiddleware(logger);

const store = createStore(reducer, 1, middleware);