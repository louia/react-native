import { actions } from '../actions';



export function reducers(state = {
    'score': 0,
    'tilesValue': ([1, 2, 3, 4, 5, 6, 7, 8, 0]),
    'tilesValuesAfterRandomize': [],
    'win': false,
    'random' : false,
    'img' : {uri : 'https://media.timeout.com/images/104101101/630/472/image.jpg'}
}, action) {
    switch (action.type) {
        case actions.NEW:

            return Object.assign({}, state, {
                score: 0,
                tilesValue: ([1, 2, 3, 4, 5, 6, 7, 8, 0]),
                win : 0,
                random : true
            });
        case actions.RESET:
            return Object.assign({}, state, {
                tilesValue : state.tilesValuesAfterRandomize,
                score : 0,
                win : false,
             });
        case actions.SETWIN:
            return Object.assign({}, state, {
                win : action.win
             });
        case actions.SETSCORE:
            return Object.assign({}, state, {
                score : action.score
             });
        case actions.SETTILESVALUESAFTERRAND:
            return Object.assign({}, state, {
                tilesValuesAfterRandomize : action.tilesvalues
             });
        case actions.SETTILESVALUES:
            return Object.assign({}, state, {
                tilesValue : action.tilesvalues
             });
        case actions.SETIMG:
            return Object.assign({}, state, {
                img : action.img
             });
        default:
            return state;
    }
}