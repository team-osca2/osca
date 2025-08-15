<!--    ajax로 관리자 코드만 가져오기 -->



function gotoAdminpage() {
    $.ajax({
        type : 'GET',           // 타입 (get, post, put 등등)
        url : '/checkAdmin',           // 요청할 서버url
        dataType : 'text',       // 데이터 타입 (html, xml, json, text 등등
        success : function(result) { // 결과 성공 콜백함수
            const inputString = prompt('관리자 코드를 입력하세요');
            if (result == inputString){
                location.href="http://localhost:10000/admin/member";
            }
        },
        error : function(request, status, error) { // 결과 에러 콜백함수
            console.log(error)
        }
    })

}