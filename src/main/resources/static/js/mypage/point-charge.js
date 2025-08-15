const $cashButton = $('.cash-option-button');
const $payButton= $('.btn');

$cashButton.click(function() {
    // 이전에 선택된 버튼이 있을 경우 active 클래스 제거
    $('.cash-option-selected').removeClass('cash-option-selected');
    // 클릭한 버튼에 active 클래스 추가
    $(this).addClass('cash-option-selected');
    //
    $payButton.addClass('btn-brand-yellow');


    const $selectedButton = $('.cash-option-selected');
    const cashText = $selectedButton.text().split("+");
    const amount = cashText[1];

    console.log(amount);
    $payButton.text(amount + " 충전하기")

  });



