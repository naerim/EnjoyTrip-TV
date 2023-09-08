document.querySelector("#hamburger").addEventListener("click", function () {
  let hamburger = document.querySelector("#hamburger");
  let menulist = document.querySelector("#menulist");
  console.log(menulist);
  menulist.classList.toggle("open");
});
