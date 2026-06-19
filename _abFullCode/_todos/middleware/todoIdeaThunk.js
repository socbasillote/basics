import { todoActions } from "../slices/todoSlice.js";


export function fetchTodoIdea(){

    return async function(dispatch) {

        dispatch({
            type: "idea/request"
        });

        try {

            const response = await fetch('https://type.fit/api/quotes');

            const data = await response.json();

            dispatch({
                type: "idea/success",
                payload: data[1]
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