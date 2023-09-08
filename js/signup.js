// 회원들 아이디 정보 담은 배열
let memberIdList = [];

// 회원의 아이디 정보 가져오기
function getMembersLocalStorage() {
  let members = localStorage.getItem("members");
  members = JSON.parse(members);
  for (i = 0; i < members.length; i++) {
    memberIdList[i] = members[i].memberId;
  }
}

// 초기화함수
function initWindow() {
  document.querySelector("#showMessage").innerText = "";
  document.querySelector("#btnUse").disabled = "disabled";
  document.querySelector("#memberIdCheck").value = "";
  document.querySelector("#memberIdCheck").focus();
}

// 아이디 중복체크 함수
document.querySelector("#userIdChkBtn").addEventListener("click", function () {
  let userId = document.querySelector("#userId").value;
  let userIdChkBtn = document.querySelector("#userIdChkBtn");

  for (i = 0; i < memberIdList.length; i++) {
    if (memberIdList[i] == userId) {
      alert("이미 존재하는 아이디입니다.");
      return;
    }
  }
  document.querySelector("#userId").readOnly = true;
  document.querySelector("#userId").style.backgroundColor = "#F2F4F6";
  userIdChkBtn.disabled = "disabled";
  userIdChkBtn.style.backgroundColor = "#F2F4F6";
  userIdChkBtn.style.color = "#8B95A1";
  userIdChkBtn.style.pointerEvents = "none";
});

// 회원가입 버튼 클릭 이벤트
document.querySelector("#signup-btn").addEventListener("click", function (e) {
  e.preventDefault();

  let userIdChkBtn = document.querySelector("#userIdChkBtn");
  let userId = document.querySelector("#userId");
  let username = document.querySelector("#username");
  let userPwd = document.querySelector("#userPwd");
  let userPwdChk = document.querySelector("#userPwdChk");
  let email1 = document.querySelector("#email1");
  let email2 = document.querySelector("#email2");
  let region1 = document.querySelector("#region1");
  let region2 = document.querySelector("#region2");

  if (!userIdChkBtn.disabled) {
    alert("아이디 중복확인이 필요합니다.");
    userId.focus() = true;
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
    }
    
    console.log(member);
    window.localStorage.setItem("member", JSON.stringify(member));
    
    let localMembers = window.localStorage.getItem("members");
    if (localMembers === null) {
        localMembers = [member];
      } else {
        localMembers = JSON.parse(localMembers);
        localMembers.push(member);  
      }
      window.localStorage.setItem("members", JSON.stringify(localMembers));

      alert(`${username}님 "${userId}" 아이디로 가입 정상 완료하였습니다.\n로그인 후 회원 전용 서비스를 이용하시기 바랍니다.`);
      location.href = "login.html";
});
