
const signIn = document.getElementById('signIn');

const userInput = document.querySelector('.userInput');
const loginBtn = document.querySelector('.loginBtn');
const logoutBtn = document.querySelector('.logoutBtn')

const loginContent = document.querySelector('.loginContent')
const loggedIn = document.getElementById('loggedIn');
const errorLogin = document.querySelector('.errorLogin')

const auth = {
    user: null,
    isLoggedIn: false
}

function render(){
    
    if(auth.isLoggedIn){
        signIn.setAttribute('hidden', '')
        loggedIn.hidden = false;
        loginContent.textContent = `User ${auth.user} is logged in`;
        return;
    }
    signIn.hidden = false;
    loggedIn.hidden = true;
}


function login(userData){
    if(!userData){
        errorLogin.innerHTML = `
            <span>Fill the input field</span>
        `
        return
    }
    
    auth.user = userData;
    auth.isLoggedIn = true;
    userInput.value = '';
}

function logout(){
    auth.user = null
    auth.isLoggedIn = false;
    render();
}

loginBtn.addEventListener('click', () => {
    const userData = userInput.value;
    login(userData);

    render();
});

logoutBtn.addEventListener('click', logout)