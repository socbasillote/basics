
export function renderColumn(column, state) {

    const cards = column.cardIds
        .map(id => state.cards.byId[id]);

    console.log(cards)
    return `
        <section class="column" data-column-id="${column.id}">
            <h2>${column.title}</h2>

        

            <button data-action="add-card">
                Add Card
            </button>
        </section>
    `;
}