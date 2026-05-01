
const data = [
    {item: "cookie", status: "available"},
    {item: "chicken", status: "sold"},
    {item: "salad", status: "available"},
    {item: "egg", status: "sold"}
];

let inputs = 'available';

let rand = Math.ceil(Math.random() * 10);

if (rand >= 5){
    inputs = 'sold'
} else {
    inputs = 'available'
}

data.forEach(food => {
    food.status === inputs ? console.log(`${food.item} is available`) : "";
})

console.log(rand);