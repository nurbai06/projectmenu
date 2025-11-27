
const currentPage = window.location.pathname.split("/").pop();

const items = document.querySelectorAll(".bottom-bar .item");

items.forEach(item => {
  const link = item.getAttribute("href");

  if (link === currentPage) {
    item.classList.add("active");
  }
});
