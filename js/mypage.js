// 로그아웃
document.querySelector("#logout-btn").addEventListener("click", function () {
  window.localStorage.removeItem("member");
  location.href = "/";
});

// 나의 정보 수정하기
document.querySelector("#amend-btn").addEventListener("click", function (e) {
  e.preventDefault();

  let userId = document.querySelector("#userId");
  let username = document.querySelector("#username");
  let userPwd = document.querySelector("#userPwd");
  let userPwdChk = document.querySelector("#userPwdChk");
  let email1 = document.querySelector("#email1");
  let email2 = document.querySelector("#email2");
  let region1 = document.querySelector("#region1");
  let region2 = document.querySelector("#region2");

  if(userId.value=="" || username.value=="" || userPwd.value=="" || userPwdChk.value=="" 
      || email1.value=="" || email2.value=="" || region1.value=="" || region2.value==""){
    alert("값을 입력해주세요.");
    return;
  }

  if (userPwdChk.value != userPwd.value) {
    alert("비밀번호가 일치하지 않습니다.");
    userPwdChk.focus() = true;
    return;
  }
  
    let member = {
      userId: userId.value,
      username: username.value,
      userPwd: userPwd.value,
      email1: email1.value,
      email2: email2.value,
      region1: region1.value,
      region1_name: region1.options[region1.selectedIndex].text,
      region2: region2.value,
      region2_name: region2.options[region2.selectedIndex].text,
    };

    let localMembers = window.localStorage.getItem("members");
    localMembers = JSON.parse(localMembers);
    for(i=0; i<localMembers.length; i++) {
        if(localMembers[i].userId == userId.value) {
            localMembers[i] = member;
            window.localStorage.setItem("member", JSON.stringify(member));
            window.localStorage.setItem("members", JSON.stringify(localMembers));
            alert("나의 정보가 수정되었습니다.");
            return;
        }
    }
  alert("나의 정보 수정 실패...");
});

window.onload = function () {
// 로그인된 유저 있는지 확인
  let member = localStorage.getItem("member");
  let menulist = document.querySelector("#menulist");
  menulist.innerHTML = "";
  let html = menulist.innerHTML;

  let path = window.location.pathname == "/" ? "pages/" : "";

  html += `<div id="menuitem"><a href="${path}tourinfo.html">지역별여행지</a></div>`;
  html += `<div id="menuitem"><a href="${path}plan.html">나의여행계획</a></div>`;
  html += `<div id="menuitem"><a href="${path}board.html">공유게시판</a></div>`;

  if (member == null) {
    html += `<div id="menuitem"><a href="${path}signup.html">회원가입</a></div>`;
    html += `<div id="menuitem"><a href="${path}login.html">로그인</a></div>`;
  } else {
    html += `<div id="menuitem"><a href="${path}mypage.html">마이페이지</a></div>`;
  }

  menulist.innerHTML = html;
  // 현재 로그인된 유저 정보 불러오기
  let username = document.querySelector("#username");
  let userId = document.querySelector("#userId");
  let email1 = document.querySelector("#email1");
  let email2 = document.querySelector("#email2");

  member = JSON.parse(member);
 
  username.value = member.username;
  userId.value = member.userId;
  email1.value = member.email1;
  email2.value = member.email2;
};

document.querySelector("#hamburger").addEventListener("click", function () {
  menulist.classList.toggle("open");
});

// 회원 탈퇴
document.querySelector("#withdraw-btn").addEventListener("click", function (e) {
    const result = confirm("정말로 탈퇴하시겠습니까?");

    if(result) {
        let localMembers = window.localStorage.getItem("members");
        localMembers = JSON.parse(localMembers);

        for(i=0; i<localMembers.length; i++) {
            if(localMembers[i].userId == userId.value) {
                localMembers.splice(i, 1);
                window.localStorage.setItem("members", JSON.stringify(localMembers));
                window.localStorage.removeItem("member");
                location.href = "/";
            }
        }
    }
});