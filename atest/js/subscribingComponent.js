
export function subComponent(state){
    const comp = document.getElementById('comp');
    
   
    comp.innerHTML = `
        <h1>${state}</h1>
    `
}