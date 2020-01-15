export const actions = {
    ADD_SYMBOL: 'ADD_SYMBOL',
    CLEAR: 'CLEAR',
    CLEAR_ALL: 'CLEAR_ALL',
    MEMORY_SAVE: 'MEMORY_SAVE',
    MEMORY_CLEAR: 'MEMORY_CLEAR',
    MEMORY_RECALL: 'MEMORY_RECALL',
    EQUAL: 'EQUAL',
    SETCOLORS : 'SETCOLORS'
 };
 export function addSymbol(key) {
    return {
        type: actions.ADD_SYMBOL,
        key: key,
    };
 }
 export function equal() {
    return {
        type: actions.EQUAL,
    };
 }
 export function setcolors() {
    return {
        type: actions.SETCOLORS,
    };
 }
 export function clear() {
    return {
        type: actions.CLEAR,
    };
 }
 export function clearAll() {
    return {
        type: actions.CLEAR_ALL,
    };
 }
 export function memorySave() {
    return {
        type: actions.MEMORY_SAVE,
    };
 }
 export function memoryClear() {
    return {
        type: actions.MEMORY_CLEAR,
    };
 }
 export function memoryRecall() {
    return {
        type: actions.MEMORY_RECALL,
    };
 }