let articles = JSON.parse(localStorage.getItem("articles"));
let selectArticle = localStorage.getItem("selectArticle");
let loginUser = JSON.parse(localStorage.getItem("member"));

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
    let cnt = article.cnt;
    document.querySelector("#cnt").innerText = `조회수 ${cnt}`
    document.querySelector("#ment").innerText = title
    document.querySelector("#subment").innerText = date
    document.querySelector("#userId").value = user
    document.querySelector("#content").innerText = content
    if (article.user === loginUser.userId) { // 게시글 작성자와 로그인한 사람이 같을때
        // 수정하기 목록으로 출력.(버튼)
        document.querySelector("#btnBox").style.display = 'flex';
        document.querySelector("#updateBtn").style.display = 'block';
        // 삭제하기 출력.
    }
}
// 스타일 적용
document.querySelector("#mentBox").style.display = 'flex';
document.querySelector("#mentBox").style.flexDirection = 'column';
// 수정버튼
document.querySelector("#updateBtn").addEventListener("click", () => {
    localStorage.setItem("update", "true")
    location.href = "boardCreate.html"
})
