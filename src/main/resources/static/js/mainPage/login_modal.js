const emailInput = document.querySelector('input[name="email"]'),
      passwordInput = document.querySelector('input[name="password"]'),
      submitBtn = document.querySelector('button[type="submit"]'),
      
      emailErrorMessageArea = document.querySelector('#email-error-log'),
      emailErrorMessage = "올바른 이메일 형식으로 입력해 주세요.",
      passwordErrorMessageArea = document.querySelector('#password-error-log'),

      emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

const checkRegex = (callback) => (messageArea) => (event) => callback(messageArea, event);

const checkInputType = (messageArea, event) => {
      const content = event.target.value;
      const type = event.target.type;
      if(content == ''){
            messageArea.innerText = (type == 'email' ? '이메일을' : '비밀번호를') + ' 입력해주세요';
            return;
      }
      if(type == 'email')
      {
            if(content.match(emailRegex)) 
            {
                  messageArea.innerText = '';
                  return;
            }
            messageArea.innerText = emailErrorMessage;
      }
      else
      {
            messageArea.innerText = '';
      }
};
      
submitBtn.addEventListener('click', (e)=>{
      // 아이디 틀렸을 때
      emailInput.addEventListener('input', checkRegex(checkInputType)(emailErrorMessageArea));
      passwordInput.addEventListener('input', checkRegex(checkInputType)(passwordErrorMessageArea));

      if(emailInput.value != 'yhj3855@naver.com'){
            emailErrorMessageArea.innerText = '크몽에 가입되어 있지 않은 이메일 주소 입니다.'
            emailInput.focus();
            e.preventDefault();
            return false;
      }
      if(passwordInput.value != '1234'){
            passwordErrorMessageArea.innerText = '비밀번호가 맞지 않습니다.';
            passwordInput.focus();
            e.preventDefault();
            return false;
      }
      console.log("성공");
})
