import { dispatch } from "../redux/reducer.js";

const lists = document.getElementById("lists");

let draggedItem = null;

export function setupDragDrop() {
    lists.addEventListener("dragstart", dragStart);
    lists.addEventListener("dragend", dragEnd);
    lists.addEventListener("dragover", dragOver);
}

function dragStart(e) {
    const li = e.target.closest(".list");

    if (!li) return;

    draggedItem = li;
    li.classList.add("dragging");
}

function dragEnd(e) {
    const li = e.target.closest(".list");

    if (!li) return;

    li.classList.remove("dragging");

    saveOrder();
    draggedItem = null;
}

function dragOver(e) {
    e.preventDefault();

    if (!draggedItem) return;

    const afterElement = getDragAfterElement(
        lists,
        e.clientY
    );

    if (!afterElement) {
        lists.appendChild(draggedItem);
    } else {
        lists.insertBefore(
            draggedItem,
            afterElement
        );
    }
}

function saveOrder() {
    const orderedIds = [
        ...lists.querySelectorAll(".list")
    ].map(li => li.dataset.id);

    dispatch({
        type: "REORDER_TODOS",
        payload: orderedIds
    });
}

function getDragAfterElement(container, y) {
    return [...container.querySelectorAll(".list:not(.dragging)")]
        .reduce(
            (closest, child) => {
                const box =
                    child.getBoundingClientRect();

                const offset =
                    y - box.top - box.height / 2;

                if (
                    offset < 0 &&
                    offset > closest.offset
                ) {
                    return {
                        offset,
                        element: child
                    };
                }

                return closest;
            },
            {
                offset: Number.NEGATIVE_INFINITY
            }
        )
        .element;
}