// 모달창
const open1 = () => {
    document.querySelector(".modal").classList.remove("hidden");
}

const open2 = () => {
    document.querySelector(".modal2").classList.remove("hidden");
}

const open3 = () => {
    document.querySelector(".modal3").classList.remove("hidden");
}


const close1 = () => {
    document.querySelector(".modal").classList.add("hidden");
}

const close2 = () => {
    document.querySelector(".modal2").classList.add("hidden");
}

const close3 = () => {
    document.querySelector(".modal3").classList.add("hidden");
}

const $click = $(".open-request-form");
const $click2 = $(".open-request-form2");

const $check = $(".open-check-button");
const $check2 = $(".open-check-button2");

const $reject = $(".open-reject-button");
const $reject2 = $(".open-reject-button2");


$click.on("click",open1);
$click2.on("click",open1);

$(".btn-step").on("click", close1);
$(".close-button").on("click",close1);

$check.on("click",open2);
$check2.on("click",open2);
$(".cancel-btn1").on("click", close2);
$(".accept-btn1").on("click", close2);

$reject.on("click",open3);
$reject2.on("click",open3);
$(".cancel-btn2").on("click", close3);
$(".accept-btn2").on("click", close3);


// 메뉴 클릭 이벤트
$(".badge-wrapper").on("click",function(){
    $(".side-content-all-weight").removeClass("side-content-all-weight");
    $(this).addClass("side-content-weight");
    $(".badge-wrapper").not(this).removeClass("side-content-weight");
});

// 메뉴 클릭 이벤트 : 미디어 쿼리
$(".media-menu-content").on("click",function(){
    $(".media-content-color").removeClass("media-content-color");
    $(this).addClass("change-bottom-color");
    $(".media-menu-content").not(this).removeClass("change-bottom-color");
});

