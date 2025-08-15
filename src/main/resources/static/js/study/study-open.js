// 보윺 기술~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  skill-name-list 클릭
const $skillNameArea = $('.skill-name-list');
const $skillsBox =  $('.skills-selected-box')
$skillNameArea.on('click', function() {
    $(this).toggleClass('selected-skill');

    if ($(this).hasClass('selected-skill')) {
        const skillName = $(this).find('.skill-name').text();
        const selectedSkillElement = `
      <div class="skills-each">
        <div shape="rounded" label="delete" class="selected-skills-name">
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
    } else {
        const skillName = $(this).find('.skill-name').text();
        $('.selected-skills-name').filter(function() {
            return $(this).text().trim() === skillName;
        }).parent().remove();
    }

});


// 개별 스킬 삭제 버튼 클릭

$('.skills-selected-box').on('click', '.button-x', function() {
    const $xButton = $(this);
    const $selectedSkillsName = $xButton.closest('.selected-skills-name');
    const skillNameText = $selectedSkillsName.text().trim();
    $(this).closest('.skills-each').remove();

    $('.skill-name').each(function() {
        if ($(this).text().trim() === skillNameText) {
            $(this).closest('.selected-skill').removeClass('selected-skill');
        }
    });

});

//  삭제 버튼 클릭
$('.delete-button2').on('click', function() {
    $('.selected-skill').removeClass('selected-skill');
    $('.skills-each').remove();
});
