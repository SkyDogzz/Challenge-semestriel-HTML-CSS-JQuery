function hideCookieModal() {
    const cookieModal = document.querySelector("#cookie-modal");
    cookieModal.style.display = "none";
}

window.addEventListener("load", () => {
    const cookieModal = document.querySelector("#cookie-modal");
    cookieModal.style.display = "block";
});

const cookieAcceptBtn = document.querySelector("#cookie-accept-btn");
cookieAcceptBtn.addEventListener("click", hideCookieModal);
