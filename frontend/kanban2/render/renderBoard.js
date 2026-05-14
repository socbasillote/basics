import { store } from "../state/store.js";
import { renderColumn } from "./renderColumn.js";

export function renderBoard(state){
    
    
    return state.columns.allIds
    .map(id => renderColumn(
      state.columns.byId[id],
      state
    ))
    .join('');
    
    
}