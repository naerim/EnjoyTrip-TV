let articleTbl = document.querySelector(".table")
let articles = JSON.parse(localStorage.getItem("articles"));
document.querySelector("#goCreate").addEventListener("click", () => {
    localStorage.setItem("update", "false")
    location.href = "boardCreate.html"
})
articles.forEach(article => {
    let index = article.idx;
    let title = article.title;
    let user = article.user;
    // let content = article.content;
    let date = article.date;
    let cnt = article.cnt;
    articleTbl.insertAdjacentHTML("beforeend",
        `<tr>
    <th scope="row">${cnt}</th>
    <td><a style="cursor: pointer;color: black;text-decoration-line: blink;" onclick=detail("${index}")>${title}</a></td>
    <td>${user}</td>
    <td>${date}</td>
  </tr>`)
});

// 디테일 페이지로 이동하기위해서 글의 인덱스를 받고 저장한다.
function detail(index) {
    // 조회수 올리는 함수 호출.
    cntUp(index);
    // console.log(index)
    localStorage.setItem("selectArticle", index)
    // 페이지 이동.
    location.href = "boardDetail.html"

}

function cntUp(index) {
    articles.forEach(article => {
        if (article.idx === index) {
            article.cnt = article.cnt + 1;
            // 조회수 올리고 바로 articles 갱신한다.
            localStorage.setItem("articles", JSON.stringify(articles))
            // 갱신 후 빠져나가기
            return
        }

    })
    // index에 해당하는 글 찾아서 cnt값 올려준다.
}