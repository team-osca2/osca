// ================ 사업자 번호 검사하기 (-,- 두 개 포함해서 총 12자리 나올 수 있게) ================  //
const $businessNo = $('.redborder');

$businessNo.keyup(function () {
    var $this = $(this);
    $(".number-10").type="hidden";
    if ($this.val().length == 12) {
        $(".businessNum-explanation").text("사용가능한 사업자 번호 입니다.");
        $(".businessNum-explanation").css('color', 'blue');
        $(".modify-businessNum").attr("disabled", false);
    } else {
        $(".businessNum-explanation").text("10자리를 입력해주세요");
        $(".businessNum-explanation").css('color', 'red');
    }
});

// ================ 닉네임 중복 검사하기 ================  //
$("#change-nickname").on("blur",function () {
    $.ajax({
        url: `/setting/check-nickname/${$(this).val()}`,
        success: function(result){
            $(".modify-nickname").type="hidden";
            if(result==1){
                $(".nickname-explanation").text("사용중인 닉네임입니다.");
                $(".nickname-explanation").css('color', 'red')
            }else{
                $(".nickname-explanation").text("사용 가능한 닉네임입니다!");
                $(".nickname-explanation").css('color', 'blue');
                $(".modify-nickname").attr("disabled", false);
            }
        }
    });
})

// ================ 전화번호 인증 ================  //
const telRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
const $phoneNumber = $("#tel");
const $verificationbtn = $("#verificationbtn");
const $checkAouthCode = $("#checkAouthCode");
const $aouthCodeErrBox = $(".verification .input-error-message");
const aouthCodeErrMsg = "인증번호가 일치하지 않습니다.";
let aouthCode;


$phoneNumber.keyup(function(){

    if ( telRegex.test($(this).val()) ) {
        $verificationbtn.attr("disabled", false);
    } else {
        $verificationbtn.attr("disabled", true);
    }
});

$verificationbtn.click(function() {
    $.ajax({
        type: "POST",
        url: "/sign-up/check-tel",
        data: `phonenumber=${$phoneNumber.val()}`,
        dataType: "text",
        async: false,
        success: function(data){
            console.log(data);
            $(".verification>div").removeClass( 'disable' );
            $("#checkAouthCode").attr("readonly", false);
            aouthCode = data;
        },
        error: function(xhr, status, error){
            console.log(xhr, status, error);
        }
    });
});

$checkAouthCode.keyup(function (){
    $this = $(this);
    if (aouthCode !== $this.val()) {
        $aouthCodeErrBox.text(aouthCodeErrMsg);
    } else {
        $aouthCodeErrBox.text("");
        $(".phone-button").attr("disabled", false);
    }
});

// ================ 핸드폰 번호 수정하기 ================  //
$(document).ready(function() {
    $("#modify-phone-button").click(function() {
        var inputValue = $("#tel").val();
        $("input[name='memberPhonenumber']").val(inputValue);
        $("#phoneNumberForm").submit();
    });
});


