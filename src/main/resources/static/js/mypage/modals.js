//경력사항 모달 (모달1)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const $periodInputArea = $('.period-input-area');
const $modal1 = $('.mod1');
const $closeM = $('.close-button-modal');

$periodInputArea.on('click', function () {
    $modal1.css('display', 'block');
});

$closeM.on('click', function () {
    $modal1.css('display', 'none');
    $modal2.css('display', 'none');
    $modal3.css('display', 'none');
});

// 경력사항~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const $freelance = $('.freelance');
const $tickM = $('.tick-m');

var isFreelanceClicked = false;

$freelance.on('click', function () {
    // 모든 지역에서 클래스 초기화
    $freelance.toggleClass('freelance-clicked');
    $tickM.toggleClass('ticked-m');

    // 프리랜스 버튼 클릭 여부 업데이트
    isFreelanceClicked = $freelance.hasClass('freelance-clicked');

    // 프리랜스 버튼 클릭 여부에 따라 input 상태 업데이트
    if (isFreelanceClicked) {
        $('.input-m').prop('disabled', true);
        $('.free-t').css('background-color', 'rgb(250, 250, 252)');
        $('.input-inner').css('background-color', 'rgb(250, 250, 252)');
    } else {
        $('.input-m').prop('disabled', false);
        $('.free-t').css('background-color', 'initial');
        $('.input-inner').css('background-color', 'initial');
    }

    // 버튼 상태 업데이트
    updateButtonState();
});

// 입력 제한~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const $InputNo1 = $('.no1');
const $no1count = $('.no1-1');
const $InputNo2 = $('.no2');
const $no2count = $('.no2-1');
const $InputNo3 = $('.no3');
const $no3count = $('.no3-1');

const maxLengthM = 10; // 최대 길이 설정

$InputNo1.on('input', function () {
    const currentLength = $(this).val().length;
    $no1count.text(`${currentLength}/${maxLengthM}`);

    if (currentLength > maxLengthM) {
        $(this).val($(this).val().substring(0, maxLengthM));
    }
});
$InputNo2.on('input', function () {
    const currentLength = $(this).val().length;
    $no2count.text(`${currentLength}/${maxLengthM}`);

    if (currentLength > maxLengthM) {
        $(this).val($(this).val().substring(0, maxLengthM));
    }
});
$InputNo3.on('input', function () {
    const currentLength = $(this).val().length;
    $no3count.text(`${currentLength}/${maxLengthM}`);

    if (currentLength > maxLengthM) {
        $(this).val($(this).val().substring(0, maxLengthM));
    }
});

//  모달1 지역 입력칸~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const $localInputM = $('.click-location');
const $locationMenusM = $('.location-menu-container'); //
const $locationTextM = $('.location-option'); //
const $SelectedLocM = $('.location-option-selected'); //
const $locationListM = $('.location-list'); //
const $LocationSingleValue = $('.location-single-value');

$localInputM.on('click', function () {
    $locationMenusM.css('display', 'block');
});

$locationTextM.on('click', function () {
    // 모든 지역에서 클래스 초기화
    $locationListM.children().addClass('location-option').removeClass('location-option-selected');
    // 클릭된 지역에 클래스 추가
    $(this).addClass('location-option-selected').removeClass('location-option');

    $locationMenusM.css('display', 'none');
    const selectedTextM = $(this).find('.location-text').text();
    $('.location-single-value').text(selectedTextM);
    $('.location-single-value').removeClass('click-location-placeholder');
});

// 모달 1 전부 입력시 버튼 활성화~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const $InputNo5 = $('.no5');
const $InputNo6 = $('.no6');
const $ButtonM1 = $('.button-m1');

function updateButtonState() {
    if (isFreelanceClicked) {
        const allInputsFilled = $InputNo5.val() && $InputNo6.val();
        $ButtonM1.prop('disabled', !allInputsFilled);
    } else {
        const allInputsFilled =
            $InputNo1.val() &&
            $InputNo2.val() &&
            $InputNo3.val() &&
            $InputNo5.val() &&
            $InputNo6.val() &&
            $LocationSingleValue.text().trim() !== '선택해 주세요';
        $ButtonM1.prop('disabled', !allInputsFilled);
    }
}

$InputNo1.on('input', updateButtonState);
$InputNo2.on('input', updateButtonState);
$InputNo3.on('input', updateButtonState);
$InputNo5.on('input', updateButtonState);
$InputNo6.on('input', updateButtonState);
$locationTextM.on('click', updateButtonState);

// 정보 입력

$ButtonM1.on('click', function () {
    const $careers = $('.careers');
    const $careerText = $('.career-text');

    if (isFreelanceClicked) {
        const duration = `${$InputNo5.val()}년 ${$InputNo6.val()}개월`;
        const newCareerHTML = `<span class="career-list">
                                  <div class="career-text">프리랜서·${duration}</div>
                                  <button type="button" class="career-single-close">
                                    <span role="img" color="#727585" rotate="0" class="career-close-wrap">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" class="career-close-svg">
                                        <path xmlns="http://www.w3.org/2000/svg" d="M4.99999 6.4142C4.60946 6.02367 4.60946 5.39051 4.99999 4.99999C5.39051 4.60946 6.02368 4.60946 6.4142 4.99999L12 10.5858L17.5858 4.99999C17.9763 4.60946 18.6095 4.60946 19 4.99999C19.3905 5.39051 19.3905 6.02367 19 6.4142L13.4142 12L19 17.5858C19.3905 17.9763 19.3905 18.6095 19 19C18.6095 19.3905 17.9763 19.3905 17.5858 19L12 13.4142L6.4142 19C6.02368 19.3905 5.39051 19.3905 4.99999 19C4.60946 18.6095 4.60946 17.9763 4.99999 17.5858L10.5858 12L4.99999 6.4142Z"></path></svg>
                                    </span>
                                  </button>
                                </span>`;

        $careers.append(newCareerHTML);
    } else {
        const company = `${$InputNo1.val()}`;
        const department = `${$InputNo2.val()}`;
        const position = `${$InputNo3.val()}`;
        const location = $LocationSingleValue.text();
        const duration = `${$InputNo5.val()}년 ${$InputNo6.val()}개월`;

        const newCareerHTML = `<span class="career-list">
                                  <div class="career-text">${company}·${department}·${position}·${location}·${duration}</div>
                                  <button type="button" class="career-single-close">
                                    <span role="img" color="#727585" rotate="0" class="career-close-wrap">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" class="career-close-svg">
                                        <path xmlns="http://www.w3.org/2000/svg" d="M4.99999 6.4142C4.60946 6.02367 4.60946 5.39051 4.99999 4.99999C5.39051 4.60946 6.02368 4.60946 6.4142 4.99999L12 10.5858L17.5858 4.99999C17.9763 4.60946 18.6095 4.60946 19 4.99999C19.3905 5.39051 19.3905 6.02367 19 6.4142L13.4142 12L19 17.5858C19.3905 17.9763 19.3905 18.6095 19 19C18.6095 19.3905 17.9763 19.3905 17.5858 19L12 13.4142L6.4142 19C6.02368 19.3905 5.39051 19.3905 4.99999 19C4.60946 18.6095 4.60946 17.9763 4.99999 17.5858L10.5858 12L4.99999 6.4142Z"></path></svg>
                                    </span>
                                  </button>
                                </span>`;

        $careers.append(newCareerHTML);
    }

    // 모달 닫기
    $modal1.css('display', 'none');
    updateButtonState(); // 버튼 상태 업데이트
});

//입력된 경력 삭제
$(document).on('click', '.career-single-close', function () {
    $(this).closest('.career-list').remove();
});

//모달2 학력/전공~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// status-single-value

const $schoolInputArea = $('.school-area');
const $modal2 = $('.mod2');

$schoolInputArea.on('click', function () {
    $modal2.css('display', 'block');
});

// 입력 제한~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const $InputNo7 = $('.no7');
const $no7count = $('.no7-1');
const $InputNo8 = $('.no8');
const $no8count = $('.no8-1');

const maxLengthM2 = 24; // 최대 길이 설정

$InputNo7.on('input', function () {
    const currentLength = $(this).val().length;
    $no7count.text(`${currentLength}/${maxLengthM2}`);

    if (currentLength > maxLengthM2) {
        $(this).val($(this).val().substring(0, maxLengthM2));
    }
});
$InputNo8.on('input', function () {
    const currentLength = $(this).val().length;
    $no8count.text(`${currentLength}/${maxLengthM2}`);

    if (currentLength > maxLengthM2) {
        $(this).val($(this).val().substring(0, maxLengthM2));
    }
});

//  모달2 상태 입력칸~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const $inputM2 = $('.status-open');
const $containerM2 = $('.status-container');
const $textM2 = $('.status-option');
const $selectedM2 = $('.status-option-selected');
const $listM2 = $('.status-list');
const $singleValueM2 = $('.status-single-value');

$inputM2.on('click', function () {
    $containerM2.css('display', 'block');
});

$textM2.on('click', function () {
    $listM2.children().addClass('status-option').removeClass('status-option-selected');
    $(this).addClass('status-option-selected').removeClass('status-option');

    $containerM2.css('display', 'none');
    const selectedTextM = $(this).find('.status-text').text();
    $('.status-single-value').text(selectedTextM);
    $('.status-single-value').removeClass('click-location-placeholder');

    updateButtonState2();
});

// 모달 2 전부 입력시 버튼 활성화~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const $ButtonM2 = $('.button-m2');

$InputNo7.on('input', updateButtonState2);
$InputNo8.on('input', updateButtonState2);

function updateButtonState2() {
    const input7Filled = $InputNo7.val() !== '';
    const input8Filled = $InputNo8.val() !== '';
    const input9Filled = $singleValueM2.text().trim() !== '선택해 주세요';

    if (input7Filled && input8Filled && input9Filled) {
        $ButtonM2.prop('disabled', false);
    } else {
        $ButtonM2.prop('disabled', true);
    }
}
// 정보 입력

$ButtonM2.on('click', function () {
    const schoolName = `${$InputNo7.val()}`;
    const major = `${$InputNo8.val()}`;
    const status = `${$singleValueM2.text().trim()}`;
    const $myStatus = $('.school-history');

    const newHistoryHTML = `<span class="school-list">
    <div class="school-text">${schoolName}·${major}·${status}</div>
    <button
      type="button"
      class="school-single-close"
    >
      <span
        role="img"
        color="#727585"
        rotate="0"
        class="school-close-wrap"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          class="school-close-svg"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M4.99999 6.4142C4.60946 6.02367 4.60946 5.39051 4.99999 4.99999C5.39051 4.60946 6.02368 4.60946 6.4142 4.99999L12 10.5858L17.5858 4.99999C17.9763 4.60946 18.6095 4.60946 19 4.99999C19.3905 5.39051 19.3905 6.02367 19 6.4142L13.4142 12L19 17.5858C19.3905 17.9763 19.3905 18.6095 19 19C18.6095 19.3905 17.9763 19.3905 17.5858 19L12 13.4142L6.4142 19C6.02368 19.3905 5.39051 19.3905 4.99999 19C4.60946 18.6095 4.60946 17.9763 4.99999 17.5858L10.5858 12L4.99999 6.4142Z"
          ></path></svg
      ></span></button></span
  >`;

    $myStatus.append(newHistoryHTML);

    $modal2.css('display', 'none');
    updateButtonState2();
});

// 입력된 학력 삭제
$(document).on('click', '.school-single-close', function () {
    $(this).closest('.school-list').remove();
});


//모달3 자격증~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const $certInputArea = $('.cert-input-area');
const $modal3 = $('.mod3');

$certInputArea.on('click', function () {
    $modal3.css('display', 'block');
});

// 입력 제한~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const $InputNo10 = $('.no10');
const $no10count = $('.no10-1');
const $InputNo11 = $('.no11');
const $no11count = $('.no11-1');

const maxLengthM3 = 40; // 최대 길이 설정
const maxLengthM4 = 15;

$InputNo10.on('input', function () {
    const currentLength = $(this).val().length;
    $no10count.text(`${currentLength}/${maxLengthM3}`);

    if (currentLength > maxLengthM3) {
        $(this).val($(this).val().substring(0, maxLengthM3));
    }
});
$InputNo11.on('input', function () {
    const currentLength = $(this).val().length;
    $no11count.text(`${currentLength}/${maxLengthM4}`);

    if (currentLength > maxLengthM4) {
        $(this).val($(this).val().substring(0, maxLengthM4));
    }
});

// 달력 나옴
const $calendar = $('.calender-modal');
$calendar.on('click', function () {
    $('.tippy-box').toggleClass('show-display-m');
});

// 년도 수정
const $yearMin1 = $('.y-left');
const $yearPlus1 = $('.y-right');
const $year = $('.year');

var currentYear = new Date().getFullYear();

$yearMin1.on('click', function () {
    currentYear -= 1;
    $year.text(`${currentYear}년`);
});

$yearPlus1.on('click', function () {
    currentYear += 1;
    $year.text(`${currentYear}년`);
});

// 달력 클릭시 노란색, 그리고 날짜 입력

const $calendarMonth = $('.date__months_text');
const $InputNo12 = $('.no12');


$calendarMonth.on('click', function () {
    $calendarMonth.removeClass('yellow');
    $(this).toggleClass('yellow');
    $('.tippy-box').toggleClass('show-display-m');

    var selectedMonth = $(this).text().trim().split("월");
    $InputNo12.val(`${currentYear}-${selectedMonth[0]}`);
    updateButtonState3();
});


// 모달 3 전부 입력시 버튼 활성화~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const $ButtonM3 = $('.button-m3');

$InputNo10.on('input', updateButtonState3);
$InputNo11.on('input', updateButtonState3);

function updateButtonState3() {
    const input10Filled = $InputNo10.val() !== '';
    const input11Filled = $InputNo11.val() !== '';
    const input12Filled = $InputNo12.val() !== '';

    if (input10Filled && input11Filled && input12Filled) {
        $ButtonM3.prop('disabled', false);
    } else {
        $ButtonM3.prop('disabled', true);
    }
}

// 정보 입력
$ButtonM3.on('click', function () {
    const certName = $InputNo10.val();
    const certifiedDate = $InputNo12.val();
    const certAuth= $InputNo11.val();


    const newCertHTML = `<span class="school-list">
    <div class="school-text">${certName}·${certifiedDate}·${certAuth}</div>
    <button
      type="button"
      class="school-single-close"
    >
      <span
        role="img"
        color="#727585"
        rotate="0"
        class="school-close-wrap"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          class="school-close-svg"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M4.99999 6.4142C4.60946 6.02367 4.60946 5.39051 4.99999 4.99999C5.39051 4.60946 6.02368 4.60946 6.4142 4.99999L12 10.5858L17.5858 4.99999C17.9763 4.60946 18.6095 4.60946 19 4.99999C19.3905 5.39051 19.3905 6.02367 19 6.4142L13.4142 12L19 17.5858C19.3905 17.9763 19.3905 18.6095 19 19C18.6095 19.3905 17.9763 19.3905 17.5858 19L12 13.4142L6.4142 19C6.02368 19.3905 5.39051 19.3905 4.99999 19C4.60946 18.6095 4.60946 17.9763 4.99999 17.5858L10.5858 12L4.99999 6.4142Z"
          ></path></svg
      ></span></button></span
  >`;

    $('.certification-list').append(newCertHTML);

    $modal3.css('display', 'none');
    updateButtonState3();
});


