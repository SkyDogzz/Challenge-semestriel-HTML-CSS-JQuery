import burgerMenuInit from "./burger.js";
import initSliders from "./slider.js";
import inputInit from "./inputs.js";
import componentsInit from "./components/main.js";
import iconsInit from "./icons.js";

(async () => {
  await componentsInit();
  burgerMenuInit();
  initSliders();
  inputInit();
  iconsInit();
})();