const initialState = "all"

export function priorityReducer(state = initialState, action){

    switch(action.type) {

        case "priority/set":
            return action.payload;
        
        default:
            return state
    }
}


export const priorityActions = {

    setPriority(priority) {

        return {
            type: "priority/set",
            payload: priority
        }
    }
}