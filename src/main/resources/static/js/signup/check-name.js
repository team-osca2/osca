const $name = $(".name-input-area input[type=text]");
const $inputs = $("input[type=text]");
const $nameErrBox = $(".name-input-area .input-error-message");
const nameErrMsg = "이름을 입력해 주새요.";

$inputs.keyup(function (){
    if (!checkName()) {
        $nameErrBox.text(nameErrMsg);
    } else {
        $nameErrBox.text("");
    }
});

function checkName(){
    return $name.val().length > 0;
}