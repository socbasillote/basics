const componentlist = document.getElementById("componentlist");
const submitBtn = document.querySelector(".submitBtn");
const list = componentlist.querySelector("#list");

const name = componentlist.querySelector(".name");
const email = componentlist.querySelector(".email");

const state = {
    name: "",
    email: "",
}

let updatingState = false;


function addItem(e) {
    e.preventDefault();
    const nameValue = name.value;
    const emailValue = email.value
    const id = crypto.randomUUID(); // random id

    if (!nameValue || !emailValue) return;

    const li = document.createElement("li");
    li.dataset.id = id;
    li.innerHTML = `
        <span class="text">Name: ${nameValue} | Email: ${emailValue}</span>
        <button class="updateBtn">Update</button>
        <button class="deleteBtn">Delete</button>
    `;

    li.classList.add('item');
    list.appendChild(li);

    name.value = "";
    email.value = "";
    console.log(id);
}

submitBtn.addEventListener("click", addItem);

list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    console.log(li)
    if (e.target.classList.contains("deleteBtn")){

        li.remove();
    }
    
    if(e.target.classList.contains("updateBtn")){
        updatingState = true;
        const id = li.dataset.id;
        const updateName = name.value;
        const updateEmail = name.value;
        
        li.innerHTML = `
            <input type="text" class="edit-name" value="${updateName}" />
            <input type="text" class="edit-email" value="${updateEmail}" />
            <button class="saveBtn">Save</button>
            <button class="cancelBtn">Cancel</button>
        `;
    }

    if (e.target.classList.contains("saveBtn")) {
        const nameInput = li.querySelector(".edit-name");
        const emailInput = li.querySelector(".edit-email");

        const newName = nameInput.value;
        const newEmail = emailInput.value;

        li.dataset.name = newName;
        li.dateset.email = newEmail;

        // restore normal view
        li.innerHTML = `
            <span class="text"> 
                Name: ${newName} | Email: ${newEmail}
            </span>
            <button class="updateBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        `;
    }
})

function update(e){
    updatingState = true;
    const item = e.target.closest("li")
}
console.log(state)