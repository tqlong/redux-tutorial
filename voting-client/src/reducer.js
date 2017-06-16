import {Map, toJS} from 'immutable';

function setState(state, newState) {
    //console.log('setState', state.toJS(), newState);
    return state.merge(newState);
}

export default function(state = Map(), action) {
    switch (action.type) {
    case 'SET_STATE':
        const newState = setState(state, action.state);
        //console.log('newState', newState.toJS());
        return newState;
    }
    return state;
}