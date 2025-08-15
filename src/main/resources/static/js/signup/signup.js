
// email
const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const $email = $('.input[type="email"]');
const $emailErrorMessageBox = $('.email-input-area .input-error-message');
const emailErrorMessage = '이메일 형식이 유효하지 않습니다.';
$email.on('input', validationEmailOrPassword(checkValidation)($emailErrorMessageBox, emailErrorMessage, emailRegex));


// password
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
const $password = $('input[type="password"]');
const $passwordErrorMessageBox = $(".password-input-area .input-error-message");
const passwordErrorMessage = '8자 이상, 영문 대 소문자, 숫자, 특수문자를 사용하세요.';
$password.on('input', validationEmailOrPassword(checkValidation)($passwordErrorMessageBox, passwordErrorMessage, passwordRegex));


// passwordConfirm
const $passwordConfirm = $('#confirmPasswordInput');
const $passwordConfirmErrorMessageBox = $(".password-confirm-input-area .input-error-message");
const passwordConfrimErrorMessage = '비밀번호를 확인해 주세요';
$passwordConfirm.on('input', validationEmailOrPassword(passwordConfirm)($passwordConfirmErrorMessageBox, passwordConfrimErrorMessage));

Object.prototype.forEach = Array.prototype.forEach;
const $selectMenuList = $(".input-select");
const $selectMenuContentsList = $(".select-menu");

$selectMenuList.forEach((selectMenu, idx) => $(selectMenu).on('click', expandSelectMenu(idx)));

$selectMenuContentsList.forEach((selectMenuContent, idx) => {
    const $content = $(selectMenuContent).find('.select-menu-option');
    const $inputArea = $(selectMenuContent).siblings().find('.selected-content-box');
    $content.on('click', function(){
        if(idx < 2){
            $content.removeClass('selected-menu');
            $(this).addClass('selected-menu');
            $inputArea.css('color', 'rgb(48, 52, 65)');
            $inputArea.text($(this).text().trim());
            expandSelectMenu(idx)();
        }
        else {
            let count = 0;
            $(this).toggleClass('selected-menu');
            $content.forEach((el) => count += $(el).hasClass('selected-menu'));
            $inputArea.text(count == 0 ? '관심사를 선택해 주세요.' : count);
        }
    });
});

const $submitBtn = $('button[type="button"]');
// const submitButton = document.querySelector('button[type="button"]');
// submitButton.addEventListener("click", submitButtonClick);



// const inputTags = document.querySelectorAll("input");
// inputTags.forEach(inputTag => inputTag.addEventListener("keydown", blockEnter));



// const checkItemList = [email, password, passwordConfirm];


// checkBox
const $checkAll = $('.checkbox-checkall-box');
$checkAll.on('click', allCheckBoxToggleClass);
const $checkList = $('.checkbox-svg-wrapper');
$checkList.on('click', checkBoxToggle);