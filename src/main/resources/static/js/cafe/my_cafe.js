

$(document).ready(function () {
   const list = $('.list-panel-wrapper');
    const openToggle = () => $(".modal2").toggleClass("hidden");
   $(".cancel-btn1").on("click", openToggle);
   $(".accept-btn1").on("click", openToggle);
   const elapsedTime = (date) => {
      const end = new Date(date);
      const start = new Date();

      const diff = end - start;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor(diff / (1000 * 60));
      const secs = Math.floor(diff / 1000);

      const d = days;
      const h = hours - days * 24;
      const m = mins - hours * 60;
      const s = secs - mins * 60;
      if(d < 0){
         return ``;
      }
      return `${d}일 ${h}시간 ${m}분 ${s}초`;
   }
   const getDataSet = (data) => {
      let id = data.id, backgroundColor = "#144F79", status = "홍보 중", title = data.cafeAdTitle,
          contents = data.cafeAdContents, btnText = "홍보 기간 연장하기", btnLink = `/cafe/ticket-purchase?cafeAdId=${id}&type=`, type = 0,
          deadLineDate = data.cafeAdDeadlineDate, image = data.cafeImages;

      if(elapsedTime(data.cafeAdDeadlineDate) === ``){
         backgroundColor = "#d51e14"; status = "홍보기간 만료됨";
         btnText = "다시 홍보하기"; type = 1;
      }

      btnLink += type;
      return {id, backgroundColor, status,title,contents, btnText, btnLink, deadLineDate, image};
   }

   const dropdown = (`
            <div class="card-dropdown dropdown">
                <img src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/ic_more.svg" alt="더보기 아이콘">
                <ul class="dropdown-menu my-gigs-settings-dropdown-menu ">
                    <!-- 수정시 카페 detail페이지로 이동하기 -->
                    <li><a class="dropdown-link">수정</a></li>

<!--                    <li><a class="dropdown-link delete-btn">삭제</a></li>-->
                </ul>
            </div>
        `)

   const panel = (data) => {
      const dataSet = getDataSet(data);
      const img = dataSet.image ?? "/images/main-page/default/cafeDefaultImage.jfif";
      const deadlineDate = elapsedTime(dataSet.deadLineDate);
      return (`
                <div class="panel-wrapper">
                    <div class="item-wrapper position-relative flex-center-center">
                   ` +
                      (deadlineDate === '' ? '' : dropdown)
                      +`
                        <div class="main-image-wrapper border-opacity" style="background-image: url('${img}'); background-repeat : no-repeat; background-size : 100px;"></div>
                        <div class="item-content-wrapper">
                            <div>
                                <div class="breadcrumb-wrapper flex-left-center" style="margin-top: 1px;">
                                    <div class="status-label">
                                        <span class="label-chip font-medium" style="background-color: ${dataSet.backgroundColor};">${dataSet.status}</span>
                                    </div>
                                    <span class="border-color margin-left-5 margin-right-5">|</span>
                                    <span>${dataSet.title}</span>
                                </div>
                                <div class="item-title-wrapper">
                                    <a href="/cafe/detail/${dataSet.id}">
                                        ${dataSet.contents}
                                    </a>
                                </div>
                            </div>
                            <div class="date-wrapper">
                                <span class="margin-right-5" style="font-size: 14px;">${deadlineDate === '' ? "" : "홍보기간 만료까지"} </span>
                                <span style="font-size: 18px;">
                                    <span class="tahoma" data-date="${dataSet.deadLineDate}">${deadlineDate}</span>
                                </span>
                            </div>
                        </div>
                        <div class="button-wrapper position-relative">
                            <button class="NGB btn btn-custom-project"  onclick="location.href='${dataSet.btnLink}'">
                                ${dataSet.btnText}
                            </button>
                        </div>
                    </div>
                </div>
        `)
   }

    const panel2 = (data) => {
       const backgroundColor = data.cafeAdCount !== 0 ? "#144F79" : "#d51e14";
       const content = data.cafeAdCount !== 0 ? "홍보 중" : "홍보 미진행";
        return (`
                <div class="panel-wrapper">
                    <div class="panel-cafe-wrapper">
                       
                        <div style="width: 40%">
                            <div class="breadcrumb-wrapper flex-left-center" style="margin-top: 1px;">
                                <div class="status-label">
                                    <span class="label-chip font-medium" style="background-color: ${backgroundColor};">${content}</span>
                                </div>
                                <span class="border-color margin-left-5 margin-right-5">|</span>
                                <span>${data.cafeName}</span>
                            </div>
                        </div>
                        <div class="date-wrapper" style="width: 100%">
                            <span class="margin-right-5" style="font-size: 14px;">주소 :  ${data.cafeLocation}</span>
                        </div>
                        
                        <div class="card-dropdown cafe-wrapper-dropdown">
                            <img src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/ic_more.svg" alt="더보기 아이콘">
                            <ul class="dropdown-menu my-gigs-settings-dropdown-menu ">
                                <li><a class="dropdown-link">수정</a></li>
                                <li><a class="dropdown-link delete-btn">삭제</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
        `)
    }

   const drawPanel = (cafes, isCafe = false) => {
       let text = '';
       cafes?.forEach((cafe) => {
           text += isCafe ? panel2(cafe) : panel(cafe);
       });
       if(text === ''){
           text = '<h3 style="color: #c1c1c1;position: absolute; top: 50%; left: 50%">아직 아무런 게시물이 없어요.</h3>'
       }
       list.html(text);
       setInterval(() => list.find('.tahoma').each((idx, data) => $(data).text(elapsedTime($(data).attr('data-date')))), 1000);

       $(".card-dropdown").on(
           {"mouseover":function(){
                   const $dropdown = $(this).find('.my-gigs-settings-dropdown-menu');
                   $dropdown.removeClass("dropdown-menu");
                   $dropdown.addClass("display-open");
               },
               "mouseout": function(){
                   const $dropdown = $(this).find('.my-gigs-settings-dropdown-menu');
                   $dropdown.addClass("dropdown-menu");
                   $dropdown.removeClass("display-open");
               }
           }
       );
       $(".delete-btn").on("click",openToggle);
   }

    drawPanel(myCafeList);

   const myCafes = [];
    (async () => await fetch("/cafe/my-cafe-info").then(response => response.json()).then(datas => Array.isArray(datas) ? datas.forEach(data => myCafes.push(data)) : myCafes.push(datas)))();

   const datas = [myCafeList,
       myCafeList.filter(cafe => elapsedTime(cafe.cafeAdDeadlineDate) !== ''),
       myCafeList.filter(cafe => elapsedTime(cafe.cafeAdDeadlineDate) === ''),
       myCafes
   ];

    $('.panel').each((idx, data) => {
        $(data).on('click', () => {
            $('.panel').removeClass('side-content-all-weight');
            $(data).addClass('side-content-all-weight');
            drawPanel(datas[idx], idx === 3);
        });
    })
})
