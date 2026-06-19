
const initialState = "light";

export function themeReducer(state = initialState, action){
    
    switch (action.type) {

        case "theme/set":
            return action.payload
        
        case "theme/toggle":
            return state === 'light'
                        ? "dark"
                        : "light";

        default: 
            return state;
    }
}

export const themeActions = {

    setTheme(theme){
        return {
            type: "theme/set",
            payload: theme
        };
    },

    toggleTheme() {
        return {
            type: "theme/toggle"
        }
    }
}