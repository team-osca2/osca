const $radiolist = $('.list-label');
$radiolist.on('click', function() {
    const radioInner = $(this).find('.radio__inner');
    
    $('.radio__inner.selected').removeClass('selected');

    radioInner.addClass('selected');
    
    const radioInput = $(this).find('.radio__input');
    radioInput.prop('checked', true);


    const $self = $('.self-input');
    if ($radiolist.last().is(this)) {
        $self.removeClass('displayNone');
    } else {
        $self.addClass('displayNone');
    }
});

// 비밀번호 검사하기 (db비밀번호.equal(입력한 비밀번호))
$(".password-input").on("blur",function () {
    $.ajax({
        url:`/password/check-password?memberPassword=${$(this).val()}`,
        success:function (result) {
            if(result){
                $('.check-input-password').text("* 올바른 비밀번호입니다. ");
                $('.check-input-password').css('color','blue');
                const $checkClick = $('.check-wrapper');
                const $checked = $('.checkbox__inner');
                const $finalButton = $('#final-button');

                $checkClick.on('click', function() {
                    $checked.toggleClass('check-selected');
                    if ($checked.hasClass('check-selected')) {
                        $finalButton.attr('disabled', false);
                    } else {
                        $finalButton.attr('disabled', true);
                    }
                });

            }else{
                $('.check-input-password').text( "* 올바른 비밀번호를 입력해주세요.");
                $('.check-input-password').css('color','red');
                $('#final-button').attr('disabled', true);
            }
        }
    });
})

// 삭제하기
// $.ajax({
//     url:`/setting/withdraw`,
//     type:"POST",
//     dataType:"json",
//     data : $("#deleteMember").serializeArray(),
//     success:function (result) {
//         return
//     }
// });