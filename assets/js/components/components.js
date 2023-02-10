class Components {
  constructor(el, name, afterRender) {
    /**
     * @type {HTMLElement}
     */
    this.afterRender = afterRender || function () {};
    this.el = el;
    this.components_name = name;
  }

  fetch() {
    return new Promise(async (resolve, reject) => {
      let res = await fetch(
        "/assets/js/components/markups/" + this.components_name + ".html"
      );
      let html = await res.text();
      let dom = document.createElement("div");
      dom.innerHTML = html;
      dom = dom.firstElementChild;
      this.dom = dom;

      resolve(dom);
    });
  }

  async render(func) {
    await this.fetch();
    if (func) func();
    this.el.parentNode.replaceChild(this.dom, this.el);
    this.afterRender();
  }
}
export default Components;
