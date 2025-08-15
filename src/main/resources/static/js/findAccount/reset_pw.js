const $newPW = $('#newPassword'),
    $checkPW = $('#checkPassword'),
    $wrongText1 = $('.wrong-msg1'),
    $wrongText2 = $('.wrong-msg2'),
    $submitBtn = $('.submit-btn');

$newPW.keyup(function() {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    let $this = $(this);

    if (!regex.test($this.val()) || $this.val().length < 8) {
        $wrongText1.css('display', 'block');
    } else {
        $wrongText1.css('display', 'none');
    }

});

$newPW.focus(function () {
    $('.new-pw-input-wrapper').css('border', '1px solid #8e8e90');
});
$newPW.blur(function () {
    $('.new-pw-input-wrapper').css('border', '1px solid #e4e5ed');
});

$checkPW.focus(function () {
    $('.check-pw-input-wrapper').css('border', '1px solid #8e8e90');
});
$checkPW.blur(function () {
    $('.check-pw-input-wrapper').css('border', '1px solid #e4e5ed');
});

$checkPW.keyup(function() {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    let $this = $(this);

    if ($this.val().length < 8 || !regex.test($this.val()) || $this.val() != $newPW.val()) {
        $wrongText2.css('display', 'block');
    } else {
        $wrongText2.css('display', 'none');
    }

});

$submitBtn.click(function(){
//    체크
    let password1 = $newPW.val(), password2 = $checkPW.val();
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/,
        isSame = password1 === password2,
        isOk = regex.test(password1),
        checkAllCondition = isSame && isOk;

    if ( checkAllCondition ) {
        document.getElementById('frm').submit();
    }

});