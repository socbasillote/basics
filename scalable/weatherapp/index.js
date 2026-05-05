
const app = document.getElementById("app");

const form = app.querySelector("#form");
const input = app.querySelector("[data-input]");
const statusEl = app.querySelector("[data-status]");
const resultEl = app.querySelector("[data-result]");

const API_KEY = 'key';

const state = {
    loading: false,
    data: null,
    error: null
};

async function fetchWeather(city) {
    state.loading = true;
    state.error = null;
    state.data = null;
    render();

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!res.ok) {
            throw new Error("City not found");
        }

        const data = await res.json();
        console.log(data);
        state.data = data;
    } catch (err) {
        state.error = err.message;
    } finally {
        state.loading = false;
        render();
    }
}


function render(){
    // Loading
    if (state.loading) {
        statusEl.textContent = "Loading...";
        resultEl.innerHTML = "";
        return;
    }

    // Error
    if (state.error) {
        statusEl.textContent = `Error: ${state.error}`;
        resultEl.innerHTML = "";
        return;
    }

    // Success
    if (state.data) {
        statusEl.textContent = "";

        const {name, main, weather} = state.data;

        resultEl.innerHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Condition: ${weather[0].description}</p>
        `;
    }
}


// ------------- EVENTS --------------
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = input.value.trim();
    if (!city) return;
    fetchWeather(city);
});