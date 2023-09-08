document.querySelector("#hamburger").addEventListener("click", function () {
  menulist.classList.toggle("open");
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
};
