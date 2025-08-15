const $wrongText1 = $('.p1');
const $wrongText2 = $('.p2');
const $wrongText3 = $('.p3');

const $newPW = $('[name="memberPassword"]');
const $newPW2 = $('[name="newConfirmPassword"]');

$newPW.keyup(function() {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    let $this = $(this);

    if (!regex.test($this.val()) || $this.val().length < 8) {
        $wrongText2.css('display', 'block');
    } else {
        $wrongText2.css('display', 'none');
    }
});

$newPW2.keyup(function() {
    const newPassword = $newPW.val();

    if ($newPW2.val() !== newPassword) {
        $wrongText3.css('display', 'block');
        $('.confirm-button').attr("disabled", true);
    } else {
        $wrongText3.css('display', 'none');
        $('.confirm-button').attr("disabled", false);
    }
});

// 비밀번호 검사하기 (db비밀번호.equal(입력한 비밀번호))
$("#user-password").on("blur",function () {
    $.ajax({
        url:`/password/check-password?memberPassword=${$(this).val()}`,
        success:function (result) {
            if(result){
                $('.check-input-password').text("* 올바른 비밀번호입니다. ");
                $('.check-input-password').css('color','blue');

            }else{
                $('.check-input-password').text( "* 올바른 비밀번호를 입력해주세요.");
                $('.check-input-password').css('color','red');
            }
        }
    })
})
