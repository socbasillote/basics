/* //1. Objects

const user = {
    name: "Soc",
    age: 29,
    isAdmin: false
};

user.age = 30;
user.address = 'Cebu City'
console.log(user)
 */

/* // 2. Array
const products = [
    { id: 1, name: 'Laptop'},
    { id: 2, name: 'Phone'},
];

products.push({
    id: 3, name: "Car"
})

const product = products.find(p => p.id === 2);
 */

/* // 3. Immutability
// Why immutability matters? frameworks detect changes easier.


const user = [ 
    { name: "Soc", age: 29, isAdmin: false },
    { name: "Rates", age: 30, isAdmin: false },
];

const updateUser = user.map(u => (
     u.name === 'Soc' ? {...u, name: 'anthony'}: user
));

const removeUser = user.filter(u => u.name !== 'Soc');

const toggle = user.map(u => (
    u.name === 'Rates' ? {...u, isAdmin: true} : u
))
 */

/* // 4. map / filter / reduce
// map - transforms data
// filter - keep matching items
// reduce - accumulate values


const user = [ 
    { id: 1, title: 'JS maxxing', active: false, price: 10},
    { id: 2, title: 'immutability', active: false, price: 15 },
    { id: 3, title: 'user3', active: true, price: 20 },
    { id: 4, title: 'username', active: false, price: 5 },
    { id: 5, title: 'userAgent', active: true, price: 25 },
];


const upperCase = user.map(u => u.title.toUpperCase());
const getActive = user.filter(u => u.active === true);
const totalPrice = user.reduce((s, t) => {
    return s + t.price
}, 10)


console.log(totalPrice); */

/* // 5. IDs
// Ids uniquely identify items

const todos = [];

const idDate = crypto.randomUUID();

function createTodo(title){
    return {
        id: idDate,
        title: title
    };
}

todos.push(createTodo('helloTitle'));
todos.push(createTodo('secondTitle'));

console.log(todos); */

// 6. Event Listener
const state = {
    count : 0
}
let user = [
    {id: 0, name: 'test'},
    {id: 1, name: 'hehehe'},
    {id: 2, name: 'hahaha'}
]

const app = document.getElementById('app');
const input = document.querySelector('input')
const count = document.getElementById('count');
const lists = document.getElementById('lists');
const updateBtn = document.getElementById('updateBtn');
const addBtn = document.getElementById('addBtn');

function render(){
    count.textContent = state.count;
    lists.innerHTML = "";
    user.sort((a, b) => b.id - a.id);
    user.map(u => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${u.name}</span> <button id="deleteBtn">Delete</button> <button id="updateBtn">update</button>`
        li.dataset.id = u.id;
     //   console.log(li.dataset.id)
        lists.appendChild(li);
    })

    
}

function addList(){
    const newInput = input.value;
    const rand = Math.floor(Math.random() * 10);
    const newList = {
        id: user.length + 1,
        name: `${newInput} ${rand}`,
    }

    user.push(newList);
    input.value = "";
}

function updateList(id){
    let pvalue = prompt('Todo update', "");
    
    user.map(u => u.id == id ? u.name = pvalue : user);
  
  render();
}

function deleteList(id){
    console.log(id);
    user = user.filter(u => u.id != id );
    
}

app.addEventListener('click', (e) => {
    state.count++;
    const addBtn = e.target.closest('#addBtn');
    const updateBtn = e.target.closest("#updateBtn");
    const deleteBtn = e.target.closest('#deleteBtn')
    const id = e.target.closest('[data-id]')

    
    if(deleteBtn){
        
        deleteList(id.dataset.id);

    }
    if (updateBtn) {
        updateList(id.dataset.id);
    }
    

    
    if (addBtn) {
        addList();
    }


    render();
})


input.addEventListener('input', (e) => {
   const value = e.target.value
   
   console.log(value);
   
})


render();




