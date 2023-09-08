// 초기화함수
function initWindow() {
  document.querySelector("#userId").value = "";
  document.querySelector("#userId").focus();
  document.querySelector("#userPwd").value = "";
}

// 로그인 버튼 클릭 이벤트
document.querySelector("#login-btn").addEventListener("click", function (e) {
  e.preventDefault();

  let userId = document.querySelector("#userId").value;
  let userPwd = document.querySelector("#userPwd").value;

  if (userId == "" || userPwd == "") {
    alert("값을 입력해주세요.");
    return;
  }

  let members = localStorage.getItem("members");
  members = JSON.parse(members);

  for (i = 0; i < members.length; i++) {
    console.log(members[i].userId, members[i].userPwd);
    if (members[i].userId == userId && members[i].userPwd == userPwd) {
      window.localStorage.setItem("member", JSON.stringify(members[i]));
      alert("로그인에 성공하였습니다.");
      location.href = "/";
      return;
    }
  }
  alert("아이디/비밀번호를 확인해주세요.");
  initWindow();
});
