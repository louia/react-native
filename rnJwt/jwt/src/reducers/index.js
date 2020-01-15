import { actions } from '../actions';
import { evaluateur } from "./evaluateur";


export function reducers(state = {
    'expression' : "",
    'memory' : '',
    'color' : '#fff',
}, action) {
    switch (action.type) {
        case actions.ADD_SYMBOL:
            return Object.assign({}, state, { expression: state.expression + action.key });
        case actions.CLEAR:
            return Object.assign({}, state,{expression : state.expression.substring(0, state.expression.length - 1)});
        case actions.CLEAR_ALL:
            return Object.assign({}, state,{expression : ""});
        case actions.MEMORY_SAVE:
            return Object.assign({}, state,{memory : state.expression});
        case actions.MEMORY_CLEAR:
            return Object.assign({}, state,{memory : ''});
        case actions.MEMORY_RECALL:
            return Object.assign({}, state,{expression : state.memory});
        case actions.EQUAL:
            return Object.assign({}, state,{expression : evaluateur(state.expression)});
        case actions.SETCOLORS:
            return Object.assign({}, state,{ color :'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'});
        default:
          return state;
    }
}