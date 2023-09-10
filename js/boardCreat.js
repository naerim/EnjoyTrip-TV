// articles[] 이 없으면 만든다.
if (localStorage.getItem("articles") === null) {
    let arr = []
    localStorage.setItem("articles", JSON.stringify(arr))
}
// 글 작성 로직.

// 사용자 아이디 가져오기.
let user = JSON.parse(localStorage.getItem("member")).userId;

// 제목에 유저아이디 출력.
document.querySelector("#userId").placeholder = user

// 작성하기 버튼 클릭 이벤트
document.querySelector("#createBtn").addEventListener("click", Create)
function Create() {
    // e.preventDefault();
    let title = document.querySelector("#articleTitle")
    let content = document.querySelector("#content")
    let date = new Date();
    let idx = date.toISOString().replaceAll("-", "").replaceAll(":", "").replaceAll(".", "") + user
    date = date.toLocaleDateString().replaceAll(". ", "/").replace(".", "")

    if (title.value == '' || content.value == '') {
        alert("빈 글은 작성 불가능합니다.")
    } else {

        let article = {// 인덱스,유저,제목,내용,날짜,조회수
            "idx": idx,
            "user": user,
            "title": title.value,
            "content": content.value,
            "date": date,
            "cnt": 0
        }
        let articles = JSON.parse(localStorage.getItem("articles"));

        // 글 추가
        articles.push(article)
        // console.log(articles)
        localStorage.articles = JSON.stringify(articles);
        // console.log("성공!!")
        title.value = ""
        content.value = ""

        // 버튼 비활성화 후 화면 돌림
        document.querySelector("#createBtn").disabled = true;
        alert("글 작성 성공")
        location.href = "board.html"
    }
};


// 여기부터는 Update기능. 업데이트 모드인경우 실행.
if (localStorage.getItem("update") === "true") {
    let articles = JSON.parse(localStorage.getItem("articles"));
    let selectArticle = localStorage.getItem("selectArticle");
    let loginUser = JSON.parse(localStorage.getItem("member"));
    // 화면 세팅
    // 버튼 변경
    document.querySelector("#btnBox").innerHTML = `
    <button type="button" id="deleteBtn">삭제하기</button>
    <button type="button" id="updateBtn">수정하기</button>`
    // input이나 빈칸 채우기
    articles.forEach(article => {
        if (article.idx === selectArticle) {
            // 요소 출력 함수호출
            setPage(article);
            return false;
        }
    });

    function setPage(article) {

        let index = article.idx;
        let title = article.title;
        let user = article.user;
        let content = article.content;
        let date = article.date;

        document.querySelector("#ment").innerText = "여행정보 글 수정하기"
        document.querySelector("#subment").innerText = "내가 작성한 글을 수정할 수 있어요"
        document.querySelector("#userId").value = user
        document.querySelector("#articleTitle").value = title
        document.querySelector("#content").innerText = content

    }

    // 삭제
    document.querySelector("#deleteBtn").addEventListener("click", () => {
        let size = (articles.length);
        // 삭제로직
        articles = articles.filter(article => article.idx !== selectArticle);
        // console.log(articles)
        localStorage.setItem("articles", JSON.stringify(articles));
        alert("삭제되었습니다.")
        localStorage.setItem("selectArticle", '')
        localStorage.setItem("update", "false")
        location.href = "board.html"

    })


    document.querySelector("#updateBtn").addEventListener("click", Update)


    function Update(e) {
        articles.forEach(article => {
            if (article.idx === selectArticle) {
                // 내용 변경 함수호출
                change(article);
                localStorage.setItem("update", "false")
                return false;
            }
        });


    }
    function change(article) {
        let title = document.querySelector("#articleTitle").value
        let content = document.querySelector("#content").value
        let date = new Date();
        if (title == '' || content == '') {
            alert("빈 글은 작성 불가능합니다.")
        } else {

            date = date.toLocaleDateString().replaceAll(". ", "/").replace(".", "")
            article.title = title
            article.content = content
            article.date = date
            localStorage.setItem("articles", JSON.stringify(articles))
            alert("수정되었습니다.")
            location.href = 'board.html'
        }
    }
}
