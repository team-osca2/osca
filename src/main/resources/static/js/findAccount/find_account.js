
// 입력 form 변환에 쓸 변수
const changeArea = document.querySelectorAll('.change-area'),
    findType = document.querySelector('.move-area'),
    x_size = document.querySelector('.find-account-contents').offsetWidth,
    findTypeCheckBox = document.querySelector('.find-account-main-container>section');
ID = document.querySelector('.find-type-area').firstElementChild.innerText;

/** 입력 form 위치 변환 함수 */
const changeForm = (e) => {
    const type = e.target.innerText;
    if(type == ID){
        findType.style.transform = `translateX(0)`;
        findTypeCheckBox.classList.replace('find-type-area2', 'find-type-area');
        return;
    }
    findType.style.transform = `translateX(-${x_size}px)`;
    findTypeCheckBox.classList.replace('find-type-area', 'find-type-area2');
}

// 입력 form 변환
changeArea.forEach((change) => change.addEventListener('click', changeForm));

// 변수
const nameInput = document.querySelector('#name'),
    phoneNumberInput = document.querySelector('#phoneNumber'),
    emailInput = document.querySelector('#email'),

    findIdBtn = document.querySelector('#find-id'),
    findPasswordBtn = document.querySelector('#find-password'),

    idForm = document.querySelector('#id-form'),
    passwordForm = document.querySelector('#password-form'),

    emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    phoneNumberRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

// 함수
const /** 전화번호 유효성 검사 */
    checkPhoneNumber = () => phoneNumberRegex.test(phoneNumberInput.value),
    /** 이름 입력 여부 검사 */
    checkName = () => nameInput.value.trim() != '',
    /** 이베일 유효성 검사 */
    checkEmail = () => emailRegex.test(emailInput.value),
    /** 버튼 활성화 */
    changeBtnState = (obj, state) => obj.disabled = state,
    /** 유효성 검사 하고 맞으면 버튼 활성화 */
    inputStateFunc = (btn, stateFunc1, stateFunc2 = () => true) => (e) => changeBtnState(btn, !(stateFunc1() && stateFunc2()));


nameInput.addEventListener('input', inputStateFunc(findIdBtn, checkName, checkPhoneNumber));
phoneNumberInput.addEventListener('input', inputStateFunc(findIdBtn, checkPhoneNumber, checkName));
emailInput.addEventListener('input', inputStateFunc(findPasswordBtn, checkEmail));


