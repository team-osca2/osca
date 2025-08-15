$(document).ready(function(){
    let text = ``;
    skills.forEach(skill => {
        text += `<div class="ProfileSkillSection-tag">${skill.skill}</div>`
    });
    $(".skill-lists").append(text);
});