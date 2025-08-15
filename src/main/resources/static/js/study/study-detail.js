const open = () => {
    document.querySelector(".modal1").classList.remove("hidden");
}

const check = () => {
    document.querySelector(".modal1").classList.add("hidden");
    document.querySelector(".modal2").classList.remove("hidden");
}

const open3 = () => {
    document.querySelector(".modal3").classList.remove("hidden");
}


const close1 = () => {
    document.querySelector(".modal1").classList.add("hidden");
}

const close2 = () => {
    document.querySelector(".modal2").classList.add("hidden");
}

const close3 = () => {
    document.querySelector(".modal3").classList.add("hidden");
}

const addIndex = () => {
    $(".header-wrapper").addClass("z-index-style");
}

const deleteIndex = () => {
    $(".header-wrapper").removeClass("z-index-style");
}

const $apply = $(".apply-button");
const $shortcut = $(".shortCut-wrapper");
const $media_shortCut = $(".shortCut-content");
const $closeBtn = $(".close-button");

$apply.on("click",open);
$apply.on("click",addIndex);

$shortcut.on("click",open);
$shortcut.on("click",addIndex);

$media_shortCut.on("click",addIndex);

$(".fl-1").on("click", check);

$closeBtn.on("click", close1);
$closeBtn.on("click", deleteIndex);

$(".modal2").on("click", close2);
$(".modal2").on("click", deleteIndex);

// 댓글 수정 버튼 누르면 input 부분 나오기
$(".reply-modify-button").on("click",function(){
    $(".reply").addClass("hidden");
    $(".reply-modify").removeClass("hidden");
});

// 댓글 완료 버튼 누르면 입력한 내용 나오기 (수정 완료된 경우!!)
$(".reply-complete-button").on("click",function(){
    $(".reply").removeClass("hidden");
    $(".reply-modify").addClass("hidden");
});

// 답글 버튼 클릭시 답글 입력 input 부분 나옴
$(".re-reply-button").on("click",function(){
    $(".re-reply-write").toggle();
});

// 대댓글 작성 완료 버튼 누르면 등록
$(".re-reply-register-button").on("click",function(){
    $(".input").addClass("hidden");
    $(".re-reply-register-button").addClass("hidden");
    $(".re-reply").removeClass("hidden");
});

// 대댓글 수정 버튼 누르면 input 부분 나오게 조정
$(".re-reply-modify-button").on("click",function(){
    $(".input").removeClass("hidden");
    $(".re-reply-register-button").removeClass("hidden");
    $(".re-reply").addClass("hidden");
});

$(".re-reply-delete-button").on("click",open3);
$(".reply-delete-button").on("click",open3);
$(".cancel-btn2").on("click",close3);
$(".accept-btn2").on("click",close3);
