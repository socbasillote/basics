import { todoActions } from "../slices/todoSlice.js";


export function fetchTodoIdea(){

    return async function(dispatch) {

        dispatch({
            type: "idea/request"
        });

        try {

            const response = await fetch('http://localhost:5000/api/quotes/random');

            const data = await response.json();

            dispatch({
                type: "idea/success",
                payload: data
            });

            dispatch(
                todoActions.addTodo(data.text)
            );
        } catch (error) {
            dispatch({
                type: "idea/failure",
                payload: "Failed to fetch quote."
            })
        }
    }
}