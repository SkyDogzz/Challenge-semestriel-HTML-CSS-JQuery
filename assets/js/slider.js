class Slider {
  constructor(el) {
    this.container = el;
    this.slides = el.querySelectorAll(".slider-item");

    //this.itemsVisible = Number(el.getAttribute("data-element-visible")) || 1;
    this.autoLoop = Boolean(el.getAttribute("data-auto-loop"));

    this.posSlider = 0;
    this.isDrag = false;
    this.startClickPos = null;
    this.clickPos = null;

    this.setup(); // create the wrapper
    this.handle(); // set up the event listener
    this.clear = this.loop(); // start the loop
    console.log(this);
  }

  get itemsVisible() {
    let avgSlideWidth = this.totalWidth / this.slides.length;
    return this.container.offsetWidth / avgSlideWidth;
  }
  get totalWidth() {
    return Array.from(this.slides).reduce(
      (acc, slide) => acc + slide.offsetWidth,
      0
    );
  }
  /**
   * GETTERs
   */
  /**
   * Get the current translation of the slider
   * relative to the window width
   * @returns {number} return the translation in percentage
   */
  get translate() {
    return Math.max(
      Math.min(this.posSlider * 100 + this.gap, 0),
      (this.slides.length - 1) * -100
    );
  }
  /**
   * Get the gap between the start click position and the drag position
   * @returns {number} return the gap in percentage
   */
  get gap() {
    if (!this.startClickPos || !this.clickPos) return 0;
    return (
      ((this.startClickPos - this.clickPos) / this.container.offsetWidth) *
      (-130 * this.itemsVisible)
    );
  }

  /**
   * Get the current slide
   * @returns {number} return the current slide index
   */
  get currentSlide() {
    return Math.round(this.translate / 100);
  }

  /**
   * EVENT HANDLER METHODS
   */
  handleMouseDown(e) {
    e.preventDefault();
    if (e.type == "touchstart") e.clientX = e.touches[0].clientX;

    this.clear(); // clear the loop
    this.isDrag = true;
    this.startClickPos = e.clientX;
  }
  handleMouseMove(e) {
    if (!this.isDrag) return;

    e.preventDefault();
    if (e.type == "touchmove") e.clientX = e.touches[0].clientX;

    this.clickPos = e.clientX;
    this.render();
  }
  handleMouseUp(e) {
    e.preventDefault();

    this.isDrag = false;
    this.changeSlide();
    this.startClickPos = null;
    this.clickPos = null;
    this.clear = this.loop(); // restart the loop
  }
  /**
   * Seting up the event listener
   * @returns {void}
   */
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
    //touh event
    this.container.addEventListener(
      "touchstart",
      this.handleMouseDown.bind(this)
    );
    this.container.addEventListener(
      "touchmove",
      this.handleMouseMove.bind(this)
    );
    this.container.addEventListener("touchend", this.handleMouseUp.bind(this));
  }
  /**
   * Change the current slide to the next or previous call by end drag and auto loop
   * go to the targeted slide with animation
   * @param {number} pos the targeted slide
   */
  changeSlide(pos = this.currentSlide) {
    this.posSlider = pos;
    this.startClickPos = null;
    this.clickPos = null;
    this.animate();
    this.render();
  }
  /**
   * Create a div to wrap all the slides and set the width of the wrapper (usefull to hide the overflow)
   */
  setup() {
    this.swipeTrack = document.createElement("div");
    this.swipeTrack.classList.add("slider-swipe-track");
    this.swipeTrack.style.width = `${this.totalWidth}px`;
    this.slides.forEach((slide) => {
      //slide.style.minWidth = `${100 / this.itemsVisible}%`;
      this.swipeTrack.appendChild(slide);
    });
    this.container.appendChild(this.swipeTrack);
  }
  /**
   * add transition class to the slide to get smooth animation
   */
  animate() {
    this.slides.forEach((slide) => {
      slide.classList.add("slider-item__transition");
      setTimeout(() => {
        slide.classList.remove("slider-item__transition");
      }, 500);
    });
  }
  /**
   * render the slider with the current translation
   */
  render() {
    this.container.classList[this.isDrag ? "add" : "remove"](
      "slider-container__grabbing"
    );
    this.slides.forEach((slide) => {
      slide.style.transform = `translateX(${this.translate}%)`;
    });
  }
  /**
   * auto loop to change the slide every 5s
   * @returns {function} return a function to clear the interval
   */
  loop() {
    if (!this.autoLoop) return () => {};
    let interval = setInterval(() => {
      let i = Math.abs(this.posSlider) + 1;
      if (i == this.slides.length) i = 0;
      this.changeSlide(-i);
    }, 5000);
    return () => clearInterval(interval);
  }
}

let sliders = document.querySelectorAll(".slider-container");
sliders.forEach((slider) => new Slider(slider));
