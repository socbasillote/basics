import { combineReducers } from "./combineReducers.js";
import { filterReducer } from "./slices/filterSlice.js";
import { priorityReducer } from "./slices/prioritySlice.js";
import { themeReducer } from "./slices/themeSlice.js";
import { todoReducer } from "./slices/todoSlice.js";

const reducers = {
        todos: todoReducer,
        filter: filterReducer,
        theme: themeReducer,
        priority: priorityReducer,
    };

export const rootReducer = combineReducers(reducers);