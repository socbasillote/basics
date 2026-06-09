const savedUser = JSON.parse(localStorage.getItem("authUser"));

const initialState = {
    isAuthenticated: !!savedUser,
    user: savedUser
};

export function authReducer(state = initialState, action){

    switch(action.type){

        case 'LOGIN':
            return {
                ...state,
                isAuthenticated:true,
                user:action.payload
            };

        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated:false,
                user:null
            };

        default:
            return state;
    }
}