const $infoArea = $('.information');
const $expertArea = $('.area-of-expertise');
const $skillArea = $('.skills');
const $periodArea = $('.workperiod');
const $certArea = $('.cert-area');
const $menu = $('.aside-menu');

function changeMenu() {
    $menu.find('.selected-menu').removeClass('selected-menu');
}

$infoArea.on('click', function () {
    changeMenu();
    $menu.find('.menu-list').first().addClass('selected-menu');
});

$expertArea.on('click', function () {
    changeMenu();
    $menu.find('.menu-list').eq(1).addClass('selected-menu');
});

$skillArea.on('click', function () {
    changeMenu();
    $menu.find('.menu-list').eq(2).addClass('selected-menu');
});

$periodArea.on('click', function () {
    changeMenu();
    $menu.find('.menu-list').eq(3).addClass('selected-menu');
});

$certArea.on('click', function () {
    changeMenu();
    $menu.find('.menu-list').eq(4).addClass('selected-menu');
});

const $introInput = $('.intro-text-input');
const $introCount = $('.intro-text-count');
const introMaxLength = 255; // 최대 길이 설정
// 소개 입력 제한
$introInput.on('input', function () {
    const currentIntroLength = $(this).val().length;
    $introCount.text(`${currentIntroLength}/${introMaxLength}`);

    if (currentIntroLength > introMaxLength) {
        $(this).val($(this).val().substring(0, introMaxLength));
    }
});

// 보윺 기술~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const $skillIds = $('#exist-skillIds');
const $skillNameArea = $('.skill-name-list');
const $skillsBox = $('.skills-selected-box');

$(document).ready(function() {
    const skillIdsText = $skillIds.text(); // div 내용을 가져옴
    const numbers = skillIdsText.match(/\d+/g); // 숫자만 추출하여 배열로 반환

    if (numbers) {
        for (var i = 0; i < numbers.length; i++) {
            const skillNumber = parseInt(numbers[i]);
            const skillNameElement = $skillNameArea.find(`[value="${skillNumber}"]`);
            const skillName = skillNameElement.text();

            if (skillNameElement.length > 0) {
                skillNameElement.closest('.skill-name-list').addClass('selected-skill');
            }

            const selectedSkillElement = `
                  <div class="skills-each">
                    <div shape="rounded" label="delete" class="selected-skills-name">
                        <input type="hidden" name="skillListIds" class="skillListId" value="${skillNumber}">
                        ${skillName}<div type="button" class="button-x">
                        <span role="img" color="#c8cad2" rotate="0" class="span-x">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" focusable="false" preserveAspectRatio="xMidYMid meet" class="svg-x">
                            <path xmlns="http://www.w3.org/2000/svg" d="M6.34314575,4.92893219 L12.000039,10.585039 L17.6568542,4.92893219 C18.0473785,4.5384079 18.6805435,4.5384079 19.0710678,4.92893219 C19.4615921,5.31945648 19.4615921,5.95262146 19.0710678,6.34314575 L13.415039,12.000039 L19.0710678,17.6568542 C19.4615921,18.0473785 19.4615921,18.6805435 19.0710678,19.0710678 C18.6805435,19.4615921 18.0473785,19.4615921 17.6568542,19.0710678 L12.000039,13.415039 L6.34314575,19.0710678 C5.95262146,19.4615921 5.31945648,19.4615921 4.92893219,19.0710678 C4.5384079,18.6805435 4.5384079,18.0473785 4.92893219,17.6568542 L10.585039,12.000039 L4.92893219,6.34314575 C4.5384079,5.95262146 4.5384079,5.31945648 4.92893219,4.92893219 C5.31945648,4.5384079 5.95262146,4.5384079 6.34314575,4.92893219 Z"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                `;
            $skillsBox.append(selectedSkillElement);
        }
    }
});

$skillNameArea.on('click', function () {
    $(this).toggleClass('selected-skill');

    const skillNumber = parseInt($(this).find('.skill-name').attr("value"));
    const skillName = $(this).find('.skill-name').text();
    const selectedSkillElement = `
      <div class="skills-each">
        <div shape="rounded" label="delete" class="selected-skills-name">
            <input type="hidden" name="skillListIds" class="skillListId" value="${skillNumber}">
            ${skillName}<div type="button" class="button-x">
            <span role="img" color="#c8cad2" rotate="0" class="span-x">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" focusable="false" preserveAspectRatio="xMidYMid meet" class="svg-x">
                <path xmlns="http://www.w3.org/2000/svg" d="M6.34314575,4.92893219 L12.000039,10.585039 L17.6568542,4.92893219 C18.0473785,4.5384079 18.6805435,4.5384079 19.0710678,4.92893219 C19.4615921,5.31945648 19.4615921,5.95262146 19.0710678,6.34314575 L13.415039,12.000039 L19.0710678,17.6568542 C19.4615921,18.0473785 19.4615921,18.6805435 19.0710678,19.0710678 C18.6805435,19.4615921 18.0473785,19.4615921 17.6568542,19.0710678 L12.000039,13.415039 L6.34314575,19.0710678 C5.95262146,19.4615921 5.31945648,19.4615921 4.92893219,19.0710678 C4.5384079,18.6805435 4.5384079,18.0473785 4.92893219,17.6568542 L10.585039,12.000039 L4.92893219,6.34314575 C4.5384079,5.95262146 4.5384079,5.31945648 4.92893219,4.92893219 C5.31945648,4.5384079 5.95262146,4.5384079 6.34314575,4.92893219 Z"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    `;

    if ($(this).hasClass('selected-skill')) {
        $skillsBox.append(selectedSkillElement);
    } else {
        $('.selected-skills-name')
            .filter(function () {
                return $(this).text().trim() === skillName;
            })
            .parent()
            .remove();
    }
});

// 개별 스킬 삭제 버튼 클릭
$('.skills-selected-box').on('click', '.button-x', function () {
    const $xButton = $(this);
    const $selectedSkillsName = $xButton.closest('.selected-skills-name');
    const skillNameText = $selectedSkillsName.text().trim();
    $(this).closest('.skills-each').remove();

    $('.skill-name').each(function () {
        if ($(this).text().trim() === skillNameText) {
            $(this).closest('.selected-skill').removeClass('selected-skill');
        }
    });


    const skillListId = $(this).closest('.selected-skills-name').find('.skillListId').val();
});

// 전체 삭제 버튼 클릭
$('.delete-button2').on('click', function () {
    $('.selected-skill').removeClass('selected-skill');
    $('.skills-each').remove();
});

// $(document).ready(function() {
//     $('.button-x').on('click', function() {
//         const skillListId = $(this).closest('.selected-skills-name').find('.skillListId').val();
//
//         $.ajax({
//             type: 'POST',
//             url: '/mypage/remove-skill', // 실제 백엔드 URL로 수정해야 함
//             data: {
//                 memberId: 193, // 멤버 ID 수정 필요
//                 skillListId: skillListId
//             },
//             success: function(response) {
//                 console.log('Skill removed successfully.');
//             },
//             error: function(error) {
//                 // 에러 처리
//                 console.error('Error removing skill:', error);
//             }
//         });
//     });
//
// });


// 경력기간 입력칸~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const $periodInput = $('.workperiod-input-area');
const $periodMenus = $('.workperiod-menu-container');
const $periodText = $('.workperiod-option');
const $Selectedperiod = $('.workperiod-option-selected');
const $periodList = $('.workperiod-list');
$periodInput.on('click', function () {
    $periodMenus.css('display', 'block');
});

$periodText.on('click', function () {
    $('.period-holder').text('');
    // 모든 지역에서 클래스 초기화
    $periodList.children().addClass('workperiod-option').removeClass('workperiod-option-selected');
    // 클릭된 지역에 클래스 추가
    $(this).addClass('workperiod-option-selected').removeClass('workperiod-option');

    $periodMenus.css('display', 'none');
    const selectedPeriText = $(this).find('.workperiod-text').text();
    $('.workperiod-singleValue').text(selectedPeriText);
});

// expert-loc-input-area
// 직업 입력칸~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const $expertInput = $('.expert-input-area');
const $expertMenus = $('.expert-menu-container');
const $expertText = $('.expert-text');
const $selectedExpert = $('.expert-text-selected');
const $expertList = $('.expert-list');

$expertInput.on('click', function () {
    $expertMenus.css('display', 'block');
});

$expertText.on('click', function () {
    $('.expert-text-holder').text('');
    $expertList.children().addClass('expert-option').removeClass('expert-option-selected');
    $(this).addClass('expert-option-selected').removeClass('expert-option');

    $expertMenus.css('display', 'none');
    const selectedExpertText = $(this).find('.expert-option-text').text();
    const selectedExpertNumber = $(this).find('.expert-option-text').attr("val");
    $('.job-number').text(selectedExpertNumber);
    $('.expert-singleValue').text(selectedExpertText);
});

// 데이터 넘기기
$('#submit').on("click", function () {
    // 직업
    const $job = $('#job').text();
    $('#generalJobId').val($job);

    // 경력
    const $career = $('#career').text();
    $('#generalCareer').val($career);

    $('#edit-general-profile').submit();
});