export const actions = {
    NEW: 'NEW',
    RESET: 'RESET',
    SETSCORE : 'SETSCORE',
    SETWIN : 'SETWIN',
    SETTILESVALUESAFTERRAND : 'SETTILESVALUESAFTERRAND',
    SETTILESVALUES : 'SETTILESVALUES'
 };
 export function nouveau() {
    return {
        type: actions.NEW,
    };
 }

 export function reset() {
    return {
        type: actions.RESET,
    };
 }

 export function setScore(score) {
    return {
        type: actions.SETSCORE,
        score : score
    };
 }

 export function setTileValuesAfterRand(tilesValues) {
    return {
        type: actions.SETTILESVALUESAFTERRAND,
        tilesvalues : tilesValues
    };
 }

 export function setTileValues(tilesValues) {
    return {
        type: actions.SETTILESVALUES,
        tilesvalues : tilesValues
    };
 }

 export function setWin(win) {
    return {
        type: actions.SETWIN,
        win : win
    };
 }


 