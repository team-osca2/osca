// phonenumber
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
    }
});



