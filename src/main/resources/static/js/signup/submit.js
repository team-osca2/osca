const $allAgree = $(".checkbox-checkall-area"),  // 모두 선택
    $essentials = $(".essentials"), // 필수항목
    $seleteds = $(".essentials>div"),
    $confirmPasswordInput = $("#confirmPasswordInput"),
    $submitButton = $(".submit-button"),
    $form = $("#signup_form");

$allAgree.click(ActivationBtn);

$essentials.click(checkSubmitBtmActivationCondition);
$allAgree.click(checkSubmitBtmActivationCondition);

// submit 버튼 클릭 시
$submitButton.click(function () {
    if ( checkAll() ) {
        $(".signup-form").submit();
    } else {
        alert("입력 정보를 다시 한번 확인해 주세요.");
    }
});

function ActivationBtn (){
    $submitButton.attr("disabled", false);
}

function checkSubmitBtmActivationCondition () {
    let count = 0;
    $seleteds.forEach((element, i) => {
        if ($(element).hasClass("selected-checkbox")) {
            count++;
        }
    });
    if (  count === 3 ) {
        ActivationBtn();
    } else {
        $submitButton.attr("disabled", true);
    }
}

function checkAll(){
    return checkName() && $checkAouthCode.val() === aouthCode && emailRegex.test($("input[type=email]").val());
}

console.log($email);

//   && passwordRegex.test($password.val())
//  && $password.val() === $confirmPasswordInput.val()