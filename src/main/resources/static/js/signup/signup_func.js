
/** 유효성 검사 조건 : 조건식, 에러 메시지 출력 위치, 에러 메시지 순서로 변수 들어옴*/
const returnValidationStatementAndChangeMessage = (state) => (errorBox, errorMessage) => {
    errorBox.text(state ? '' : errorMessage);
    return state;
}

/** 비밀번호 확인 */
const passwordConfirm = (errorBox, errorMessage, e) => returnValidationStatementAndChangeMessage(e.target.value === $password.val()) (errorBox, errorMessage)

/** email, password 유효성 검사 */
const checkValidation = (errorBox, errorMessage, e, regex) => returnValidationStatementAndChangeMessage((e.target.value).match(regex)) (errorBox, errorMessage)

/** 타입별 유효성 검사 */
const validationEmailOrPassword = (validationCallback) => (errorBox, errorMessage, regex) => (e) => validationCallback(errorBox, errorMessage, e, regex);

/** select 박스 열고 닫기 */
const expandSelectMenu = (idx) => ()=> $($selectMenuContentsList[idx]).toggle();

// /** 버튼 클릭 이벤트 */
// const checkFuncList = [emailCheck, passwordCheck, passwordConfirmCheck];
// function submitButtonClick(e){
//     checkFuncList.forEach((checkFunc, idx) => {
//         let item = checkItemList[idx];
//         if(!checkFunc(item)){
//             item.focus();
//             return;
//         }
//     });

//     document.getElementById("signup_form").submit();
// }

function allCheckBoxToggleClass(e){
    $(this).toggleClass('selected-checkbox');
    const checkListClass = 'checkbox-svg-wrapper ' + ($(this).hasClass('selected-checkbox') ? 'selected-checkbox' : '');
    $checkList.forEach((check) => $(check).attr('class', checkListClass));
}

function checkBoxToggle(e){
    $(this).toggleClass('selected-checkbox');
}