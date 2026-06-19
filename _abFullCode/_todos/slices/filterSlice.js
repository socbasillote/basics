
const initialState = "all";

export function filterReducer(state = initialState, action) {

    switch (action.type) {

        case "filter/set":
            return action.payload;

        default: 
            return state;
    }
}

export const filterActions = {
    
    setFilter(filter){
        return {
            type: "filter/set",
            payload: filter
        };
    },

}