import { applyMiddleware } from "./redux/middleware/applyMiddleware.js";
import { authReducer } from "./redux/middleware/authReducer.js";
import { loggerMiddleware, persistenceMiddleware } from "./redux/middleware/middlewares.js";
import { createStore } from "./redux/middleware/store.js";


let store = createStore(authReducer);

store = applyMiddleware(
        store,
        loggerMiddleware,
        persistenceMiddleware
    );

const profile =
    document.getElementById("profile");

function render(){

    const state =
        store.getState();

    if(state.isAuthenticated){

        profile.innerHTML = `
            <div class="user-card">
                <h2>
                    Welcome,
                    ${state.user.username}
                </h2>

                <button
                    id="logoutBtn"
                    class="logout-btn"
                >
                    Logout
                </button>
            </div>
        `;

        document
            .getElementById("logoutBtn")
            .addEventListener(
                "click",
                () =>
                    store.dispatch({
                        type:'LOGOUT'
                    })
            );

    }else{

        profile.innerHTML =
            "<p>Not Logged In</p>";
    }
}

document
    .getElementById("loginBtn")
    .addEventListener(
        "click",
        () => {

            const username =
                document
                .getElementById(
                    "usernameInput"
                )
                .value
                .trim();

            if(!username) return;

            store.dispatch({
                type:'LOGIN',
                payload:{
                    id:Date.now(),
                    username
                }
            });
        }
    );

store.subscribe(render);
render();