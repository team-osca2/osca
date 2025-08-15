//  결제 API부분
const clientKey = "test_ck_ORzdMaqN3woqnxGoLLq35AkYXQGw"
const secretKey = "test_sk_nRQoOaPz8L9bNzzGm453y47BMw6v"
const customerKey = "Ou8yMu5lnYcx4Bh0q0Epy" // 내 상점에서 고객을 구분하기 위해 발급한 고객의 고유 ID
const button = document.getElementById("payment-button")

// ------  결제위젯 초기화 ------
// 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
const paymentWidget = PaymentWidget(clientKey, customerKey) // 회원 결제
// const paymentWidget = PaymentWidget(clientKey, PaymentWidget.ANONYMOUS) // 비회원 결제

// ------  결제위젯 렌더링 ------
// 결제수단 UI를 렌더링할 위치를 지정합니다. `#payment-method`와 같은 CSS 선택자와 결제 금액 객체를 추가하세요.
// DOM이 생성된 이후에 렌더링 메서드를 호출하세요.
// https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
paymentWidget.renderPaymentMethods("#payment-method", { value: 50000 })

// ------  이용약관 렌더링 ------
// 이용약관 UI를 렌더링할 위치를 지정합니다. `#agreement`와 같은 CSS 선택자를 추가하세요.
// https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
paymentWidget.renderAgreement('#agreement')

// ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
// 더 많은 결제 정보 파라미터는 결제위젯 SDK에서 확인하세요.
// https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
button.addEventListener("click", function () {
    paymentWidget.requestPayment({
        orderId: "txrn9C96CHKs_5Mg90yuR",
        orderName: "50,000POINT",
        successUrl: "https://my-store.com/success",
        failUrl: "https://my-store.com/fail",
        customerEmail: "dbwls123@gmail.com",
        customerName: "정유진"
    })
})

// const paymentMethodWidget = paymentWidget.renderPaymentMethods('#payment-method',
//     {
//         value: 10000,
//         currency: 'KRW',
//         country: 'KR',
//     },
//     { variantKey: 'widgetA' }
// )
