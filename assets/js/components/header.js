import Components from "./components.js";

class Header extends Components {
  constructor(el, afterRender) {
    super(el, "header", afterRender);
    if (!el.classList.contains("ignore")) this.render();
    else this.afterRender();
  }
  render() {
    super.render(() => {
      let hasGradient = Boolean(this.el.getAttribute("hasGradient"));
      if (hasGradient) this.dom.classList.add("header__gradient");
    });
  }
  static init() {
    let headers = document.querySelectorAll(".header");
    let tasks = [];
    headers.forEach((header) => {
      tasks.push(() => {
        return new Promise((resolve, reject) => {
          new Header(header, () => {
            resolve();
          });
        });
      });
    });
    return Promise.all(tasks.map((task) => task()));
  }
}

export default Header;
