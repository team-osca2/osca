      
const /** 배너 감싸고 있는 div */
      bannerSlides = document.querySelector(".slick-track"), 
      /** 실제 보여줄 배너 낱개 */
      bannerSlide = document.querySelectorAll(".slick-slide"), 
      /** 이전 버튼 */
      prevBtn = document.querySelector(".prev-button"), 
      /** 다음 버튼 */
      nextBtn = document.querySelector(".next-button"), 
      /** 현재 카운트 보여줄 위치 */
      showIndex = document.querySelector(".current-cnt"), 
      /** 배너 총 개수 */
      bannerCount = bannerSlide.length, 
      /** 배너 낱개 너비 */
      slideWidth = bannerSlide[0].offsetWidth, 
      /** 처음 위치 가운데가 1이 오도록 하기 위한 bannerCount - 2 // 62는 padding 50과 배너 마진 12더한 값*/
      firstPos = -slideWidth * (bannerCount - 2) - 62, 
      /** 1에서 6으로 갈때 index 조건 */
      ONE_BEFORE_THE_START = -1 ,
      /** 6에서 1로 갈때 index 조건 */
      ONE_AFTER_THE_END = bannerCount, 
      /** 6에서 1로 갈때 바뀌어야할 index */
      START_INDEX = 0, 
      /** 1에서 6으로 갈때 바뀌어야할 index */
      END_INDEX = bannerCount - 1, 
      /** 다음 버튼 누를 때 변해야하는 index의 크기 */
      NEXT = 1, 
      /** 이전 버튼 누를 때 변해야하는 index의 크기 */
      PREV = -1; 

let /** 현재 index */
    currentIndex = 0,
    /** 클론 포함한 전체 배너들 */
    slidesWidthClonesOpacityDiv = null;

// 배너들 opacity 변경
const changeBlur = (index) => {    
    /** 전체 슬라이드 opacity 0.5만들기 */
    slidesWidthClonesOpacityDiv.forEach(slides => slides.classList.add("bannerBlur"));
    /** 현재 슬라이드만 opacity 1만들기 */
    slidesWidthClonesOpacityDiv[bannerCount + index].classList.remove("bannerBlur");
}

/** 1에서 6갈 때와 6에서 1갈 때 포지션 변경 */
const changeIndexAndPositionWhenStartAndEndByIndex = (index) => {
    /** 현재 index 업데이트 */
    currentIndex = index;

    /** 현재 이동중인 애니메이션 완료 후에 적용 */
    /** 포지션 변경 */
    setTimeout(() => {
        /** 적용된 애니메이션 지운 후 */
        bannerSlides.classList.remove("animated");
        /** 밖에 보여주는 배너 번호 변경 후 */
        showIndex.innerText = "0" + (currentIndex + 1);
        /** 변해야 하는 index로 이동하기 */
        moveSlide(currentIndex);
    }, 500);
    /** 지웠던 애니메이션 넣어주기 */
    setTimeout(() => {
        bannerSlides.classList.add("animated");
    }, 600);
}

/** 배너 이동 */
const moveSlide = (index) => {
    /** 배너 움직일 때 마다 opacity 업데이트 */
    changeBlur(index);

    /** 배너 움직이기 (첫 위치에서 슬라이드 한개의 너비만큼 좌로) */
    bannerSlides.style.transform = "translateX(" + (-index * slideWidth + firstPos) + "px)";
    /** 현재 index 업데이트  */
    currentIndex = index;

    /** 6에서 1로 갈 때 */
    if (currentIndex >= ONE_AFTER_THE_END) 
    {
        /** 시작 index로 보내기 */
        changeIndexAndPositionWhenStartAndEndByIndex(START_INDEX);
    } 
    /** 1에서 6으로 갈 때 */
    else if (currentIndex <= ONE_BEFORE_THE_START) 
    {
        /** 마지막 index로 보내기 */
        changeIndexAndPositionWhenStartAndEndByIndex(END_INDEX);
    }

    /** 현재 배너 index 출력하기 */
    showIndex.innerText = "0" + (currentIndex + 1);
}

/** 무한 슬라이드 함수 */
const autoSlide = () => moveSlide(currentIndex + 1);

/** 클론 해서 만들어진 배너들로 인한 슬라이드 전체 너비 업데이트 */
const updateWidth = () => {
    /** 클론 포함 전체 슬라이드 opacity에 쓸 배경 가져오기 */
    slidesWidthClonesOpacityDiv = document.querySelectorAll('.slick-slide>div>a>div');
    /** 클론 포함 전체 슬라이드 가져오고 */
    const allSlides = document.querySelectorAll(".slick-slide");
    /** 가져온 슬라이드 개수 구한 다음 */
    const newSlideCount = allSlides.length;
    /** 개수만큼 너비 구해서 */
    const newWidth = slideWidth * newSlideCount + "px";
    /** 배너 감싸고 있는 div너비 변경 */
    bannerSlides.style.width = newWidth;
}

/** 배너 클론 만들고 처음 위치 설정 */
const makeCloneAndInitailizeBanner = () => {
    /** 기존 배너 뒤에 클론 추가  */
    for (var i = 0; i < bannerCount; i++) {
        let cloneSlide = bannerSlide[i].cloneNode(true);
        cloneSlide.classList.add("clone");
        bannerSlides.appendChild(cloneSlide);
    }

    /** 기존 배너 앞에 클론 추가 */
    for (var i = bannerCount - 1; i >= 0; i--) {
        let cloneSlide = bannerSlide[i].cloneNode(true);
        cloneSlide.classList.add("clone");
        bannerSlides.prepend(cloneSlide);
    }
    /** 만들어진 클론으로 인한 너비 변경 */
    updateWidth();
    /** 배너 시작할 위치로 이동 */
    moveSlide(currentIndex);
    /** 이동 후 애니메이션 부여하기 */
    setTimeout(() => {
        bannerSlides.classList.add("animated");
    }, 100);
}

/** 배너 초기화 */
makeCloneAndInitailizeBanner();

/** 무한 슬라이드 시작 */
let interval = setInterval(autoSlide, 4000);

/** 연속 클릭해서 배너 슬라이드 꼬이는걸 막기위한 변수 @default true : 클릭 했음을 나타냄 */
let flag = true;

 /** 버튼에 쓸 콜백 */
let btnCallBack = (callback) => (direction) => () => callback(direction);

/** 버튼 클릭 이벤트 */
const btnFunc = (direction) => {
    /** 이미 클릭해서 배너 이동하고 있으면 */
    if(!flag){/** 이벤트 없게 막기 */ return;}
    /** 다음 버튼 클릭 이벤트 막기위한 값 변경 */
    flag = false;
    /** 클릭 중에 슬라이드 이동해서 두 번 이동하게 되는 경우 막기위해 무한 스크롤 이벤트 없애기 */
    clearInterval(interval);
    /** 버튼에 다른 위치 이동 */
    moveSlide(currentIndex + direction);
    /** 이동 후 무한 스크롤 적용 */
    interval = setInterval(autoSlide, 4000);
    /** 배너 이동 후 버튼 클릭 할 수 있게 풀어주기 */
    setTimeout(() => flag = true, 600);
}

/** 다음으로 */
nextBtn.addEventListener("click", btnCallBack(btnFunc)(NEXT));
/** 이전으로 */
prevBtn.addEventListener("click", btnCallBack(btnFunc)(PREV));