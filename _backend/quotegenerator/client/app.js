
const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const btn = document.getElementById('generateBtn');


async function getQuote(){
    try {
        const response = await fetch(
             "http://localhost:5000/api/quotes/random"
        );

        const data = await response.json();

        quoteEl.textContent = `"${data.text}"`;
        authorEl.textContent = `-${data.author}`
    } catch (error) {
        console.error(error);
    }
}

btn.addEventListener('click', getQuote);

getQuote();