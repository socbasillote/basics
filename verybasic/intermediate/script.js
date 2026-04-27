/* const countEl = document.getElementById("countEl");
const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");

let count = 0;

function render(){
    if (count == 10){
        document.body.style.backgroundColor = "#000";
        console.log(count);
        console.log("run")
    } else {
        document.body.style.backgroundColor = "#fff";
    }
}
function increment(){
    count += 1;
    countEl.textContent = count;
    render();
}
function decrement(){
    count--;
    countEl.textContent = count;
}
incrementBtn.addEventListener("click", increment);
decrementBtn.addEventListener("click", decrement);


 */





document.getElementById("tabs").addEventListener("click", (e) => {
    const btn = e.target.closest(".tab-btn");
    if (!btn) return;

    const tab = btn.dataset.tab;

    // remove active from all buttons
    document.querySelectorAll(".tab-content")
        .forEach(b => b.classList.remove("active"));

    // remove active from all content
    document.querySelectorAll('.tab-content')
        .forEach(c => c.classList.remove("active"));

    // activate clicked button
    btn.classList.add("active");
    
    document.querySelector(`.tab-content[data-tab="${tab}"]`)
        ?.classList.add("active");

    console.log("tabs!")
});
