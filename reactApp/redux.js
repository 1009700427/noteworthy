import { createStore } from 'redux';

const initialState = {
    userID: -1
};

const reducer = (state = initialState, action) => {
    console.log("reducer running", action);
    switch(action.type){
        case 'LOGIN':
            return Object.assign({}, state, {userID: action.id});
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;