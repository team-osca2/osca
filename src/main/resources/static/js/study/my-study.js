// 메뉴 클릭 이벤트
$(".side-menu-content").on("click",function(){
    $(".side-content-all-weight").removeClass("side-content-all-weight");
    $(this).addClass("side-content-weight");
    $(".side-menu-content").not(this).removeClass("side-content-weight");
});


$(".card-dropdown").on("mouseover",function(){
    $(".my-gigs-settings-dropdown-menu").removeClass("dropdown-menu");
    $(".my-gigs-settings-dropdown-menu").addClass("display-open");
});

$(".card-dropdown").on("mouseout",function(){
    $(".my-gigs-settings-dropdown-menu").addClass("dropdown-menu");
    $(".my-gigs-settings-dropdown-menu").removeClass("display-open");
});


//   // 모달창 띄우기
const open1 = () => {
    document.querySelector(".modal").classList.remove("hidden");
}

const open2 = () => {
    document.querySelector(".modal2").classList.remove("hidden");
}

const close1 = () => {
    document.querySelector(".modal").classList.add("hidden");
}

const close2 = () => {
    document.querySelector(".modal2").classList.add("hidden");
}

const click1 = document.querySelector(".my-apply");
const click2 = document.querySelector(".btn-step");
const click3 = document.querySelector(".my-apply-media");
const deleteBtn = document.querySelector(".delete-btn");
const colseBtn =  document.querySelector(".close-button");

click1.addEventListener("click",open1);
click1.addEventListener("click",function(){
    $(".header-wrapper").addClass("z-index-style");
    $(".content-wrapper").addClass("z-index-style");
});

click3.addEventListener("click",open1);
click3.addEventListener("click",function(){
    $(".header-wrapper").addClass("z-index-style");
    $(".content-wrapper").addClass("z-index-style");
});

click2.addEventListener("click", close1);
colseBtn.addEventListener("click", close1);

click2.addEventListener("click",function(){
    $(".header-wrapper").removeClass("z-index-style");
    $(".content-wrapper").removeClass("z-index-style");
});

colseBtn.addEventListener("click",function(){
    $(".header-wrapper").removeClass("z-index-style");
    $(".content-wrapper").removeClass("z-index-style");
});

deleteBtn.addEventListener("click",open2);
document.querySelector(".cancel-btn1").addEventListener("click", close2);
document.querySelector(".accept-btn1").addEventListener("click", close2);


// 메뉴 클릭 이벤트
$(".media-menu-content").on("click",function(){
    $(".all-content-color").removeClass("all-content-color");
    $(this).addClass("change-bottom-color");
    $(".media-menu-content").not(this).removeClass("change-bottom-color");
});