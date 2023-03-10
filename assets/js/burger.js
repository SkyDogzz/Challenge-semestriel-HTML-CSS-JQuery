const burgerMenuInit = () => {
  let burgerMenu = document.querySelector(".burger-menu");
  let header = document.querySelector(".header");
  if (!burgerMenu || !header) return;
  burgerMenu.addEventListener("click", function () {
    burgerMenu.classList.toggle("burger-menu-active");
    header.classList.toggle("header-active");
  });
};

export default burgerMenuInit;
