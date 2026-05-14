import { store } from "./state/store.js";
import { renderBoard } from "./render/renderBoard.js";

const addColumn = document.getElementById('addColumn');
const addCard = document.getElementById('addCard');

const board = document.getElementById('board');


addColumn.addEventListener('click', () => {

    store.setState({columns: 
        {
            byId: {
                "col-1": {
                    id: "col-1", 
                    title: 'Todo ',
                    cardIds: ["card-1", "card-2"]
                 },
                "col-2": {
                    id: "col-2",
                    title: "In Progress",
                    cardIds: ["card-3"]
                },
                "col-3": {
                    id: "col-3",
                    title: "Done",
                    cardIds: ["card-4"]
                }
            },

            allIds: ["col-1", "col-2", "col-3"]
        },
    })
})


store.subscribe(() => {
    renderApp(store.getState());
})

function renderApp(state){
    board.innerHTML = renderBoard(state);
}
