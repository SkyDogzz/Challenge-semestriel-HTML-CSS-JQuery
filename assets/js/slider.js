class Slider {
  constructor(el) {
    this.container = el;
    this.slides = el.querySelectorAll(".slider-item");
    this.posSlider = 0;
    this.isDrag = false;
    this.startClickPos = null;
    this.clickPos = null;
    this.handle();
    this.clear = this.loop();
  }

  get translate() {
    return Math.max(
      Math.min(this.posSlider * 100 + this.gap, 0),
      (this.slides.length - 1) * -100
    );
  }
  get gap() {
    if (!this.startClickPos && !this.clickPos) return 0;
    return (this.startClickPos - this.clickPos) * -0.3;
  }

  get currentSlide() {
    console.log("compete", this.translate, this.gap);
    return Math.round(this.translate / 100);
  }

  handleMouseDown(e) {
    e.preventDefault();
    this.clear();
    this.isDrag = true;
    this.startClickPos = e.clientX;
  }
  handleMouseMove(e) {
    e.preventDefault();
    if (!this.isDrag) return;
    this.clickPos = e.clientX;

    this.render();
  }
  handleMouseUp(e) {
    e.preventDefault();
    this.isDrag = false;
    this.changeSlide();
    this.startClickPos = null;
    this.clickPos = null;
    this.clear = this.loop();
  }

  handle() {
    this.container.addEventListener(
      "mousedown",
      this.handleMouseDown.bind(this)
    );
    this.container.addEventListener(
      "mousemove",
      this.handleMouseMove.bind(this)
    );
    this.container.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }

  changeSlide(pos = this.currentSlide) {
    this.posSlider = pos;
    console.log(this.translate, pos);
    this.startClickPos = null;
    this.clickPos = null;
    this.animate();
    this.render();
    //console.log(this);
  }

  setup() {
    this.container.style.width = `${this.slides.length * 100}vw`;
  }

  animate() {
    this.slides.forEach((slide) => {
      slide.classList.add("slider-item__transition");
      setTimeout(() => {
        slide.classList.remove("slider-item__transition");
      }, 500);
    });
  }

  render() {
    this.container.classList[this.isDrag ? "add" : "remove"](
      "slider-container__grabbing"
    );
    this.slides.forEach((slide) => {
      slide.style.transform = `translateX(${this.translate}%)`;
    });
  }

  loop() {
    let interval = setInterval(() => {
      let i = Math.abs(this.posSlider) + 1;
      if (i == this.slides.length) i = 0;
      this.changeSlide(-i);
    }, 5000);
    return () => clearInterval(interval);
  }
}

new Slider(document.querySelector(".slider-container"));
