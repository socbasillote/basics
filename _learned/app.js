
const state = [
    {id: 1, title: "Sample"},
    {id: 2, title: "Sample2"},
    {id: 3, title: "Sample3"},
]

const list = document.getElementById("list");
const inputs = document.querySelector(".inputs")
const btn = document.querySelector('.btn');
const deleteBtn = document.querySelector(".deleteBtn");

function setState(updater) {
    const newState = updater(state);

    state.length = 0;
    state.push(...newState);

    render();
}

function render(){
    

    list.innerHTML = state.map(li => {
        return `
            <li data-id="${li.id}">
                <span>${li.title}</span>
                <button class="deleteBtn">Delete</button>
            </li>`
    }).join("");

    console.log(state);


}

function addList(data){
    const ids = state.length + 1;
    setState((currentState) => {
        return [
            ...currentState,
            {
                id: ids,
                title: data
            }
        ]
    });
}

function deleteList(id) {
    setState((currentState) => {
        return currentState.filter(item => item.id !== id);
    })
}

btn.addEventListener('click', () => {

        addList(inputs.value);
        inputs.value = "";

})




render();

document.addEventListener("click", (e) => {
    if(e.target.classList.contains("deleteBtn")) {
        const li = e.target.closest('[data-id]');
        const id = Number(li.dataset.id);

        deleteList(id);
    }
})