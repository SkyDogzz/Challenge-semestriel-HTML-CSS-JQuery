function hideCookieModal() {
    const cookieModal = document.querySelector("#cookie-modal");
    cookieModal.style.display = "none";
    localStorage.setItem("cookie-accept", "true");
}

window.addEventListener("load", () => {
    const cookieAccept = localStorage.getItem("cookie-accept");
    if (cookieAccept) {
        return;
    }
    const cookieModal = document.querySelector("#cookie-modal");
    cookieModal.style.display = "block";
});

const cookieAcceptBtn = document.querySelector("#cookie-accept-btn");
cookieAcceptBtn.addEventListener("click", hideCookieModal);
