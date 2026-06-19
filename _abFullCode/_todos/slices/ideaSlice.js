const initialState = {
    idea: "",
    loading: false,
    error: null
};

export function ideaReducer(state = initialState, action) {

    switch (action.type) {

        case "idea/request":
            return {
                ...state,
                loading: true,
                error: null
            }
        
        case "idea/success":
            return {
                ...state,
                loading: false,
                idea: action.payload
            };

        case "idea/failure":
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        
        default: 
            return state
    }
}