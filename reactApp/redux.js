import { createStore } from 'redux';

const initialState = {
    userID: -1,
    documentID: -1,
    documentName: ""
};

const reducer = (state = initialState, action) => {
    console.log("reducer running", action);
    switch(action.type){
        case 'LOGIN':
            return Object.assign({}, state, {userID: action.id});
        case 'ENTER_NEW_FILE':
            return Object.assign({}, state, {documentID: action.documentID, documentName: action.documentName});
        case 'SIGN_OUT':
            return Object.assign({}, state, {userID: -1, documentID: -1});
        case 'RESET_DOCUMENT':
            return Object.assign({}, state, {documentID: -1});
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;