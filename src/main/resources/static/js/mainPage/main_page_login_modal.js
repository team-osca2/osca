const login = document.querySelector('#login');
const modal = document.querySelector('.modal-root');

const close = (e) => {
    modal.style.display = "none";
    document.body.style.overflow = "";
    document.body.style.inset = "";
}

const loginFunc = () => {
    document.body.style.overflow = "hidden";
    document.body.style.inset = "0px";
    
    modal.style.display = "block";
    
    let closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', close);
}

login.onclick = loginFunc;

