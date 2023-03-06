import burgerMenuInit from "./burger.js";
import initSliders from "./slider.js";
import inputInit from "./inputs.js";
import componentsInit from "./components/main.js";
import iconsInit from "./icons.js";
import mapInit from "./map.js";

(async () => {
  await componentsInit();
  burgerMenuInit();
  initSliders();
  inputInit();
  iconsInit();
  mapInit();

  document.querySelectorAll("[scroll-smooth]").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("ici", this.getAttribute("href").startsWith("#"));
      if (this.getAttribute("href").startsWith("#")) {
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
        return;
      }

      const url = new URL(location.origin + this.getAttribute("href"));

      if (
        url.pathname.replace(/\/$/gi, "") !=
        location.pathname.replace(/\/$/gi, "")
      )
        location.href = url.href;
      else {
        const anchor = url.hash; // "#reviews"
        document.querySelector(anchor).scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
})();
