// 메뉴 클릭 이벤트
$(".media-menu-content").on("click",function(){
    $(".all-content-color").removeClass("all-content-color");
    $(this).addClass("change-bottom-color");
    $(".media-menu-content").not(this).removeClass("change-bottom-color");
});

// 페이지 변경하기
$(".color-style").on("click",function(){
    $(".number-color").removeClass("number-color");
    $(this).addClass("active");
    $(".color-style").not(this).removeClass("active");
});

// 이미지 변경하기
$(".bookmark-add-color").on("click",function(){
    var src=($(this).attr('src')==='/images/study-images/bookmark.png')?'/images/study-images/bookmark-color.png':'/images/study-images/bookmark.png';
    $(this).attr('src',src);

});