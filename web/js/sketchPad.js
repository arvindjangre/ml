class SketchPad {
  constructor(container, size = 400) {
    // make a canvas where we can draw
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style = `
      background-color: white;
      box-shadow: 0px 0px 10px 2px black;
    `;
    container.appendChild(this.canvas);

    // to draw using mouse
    this.ctx = this.canvas.getContext('2d');
    // # means private method
    this.#addEventListeners();
    this.paths = [];
    this.isDrawing = false;
  }

  #addEventListeners() {
    this.canvas.onmousedown = (evt) => {
      const rect = this.canvas.getBoundingClientRect();
      // coordinates x,y
      const mouse = this.#getMouse(evt);
      // console.log(mouse);

      this.paths.push([mouse]);
      this.isDrawing = true;
    }

    this.canvas.onmousemove = (evt) => {
      if (this.isDrawing) {
        const rect = this.canvas.getBoundingClientRect();
        // coordinates x,y
        const mouse = this.#getMouse(evt);
        // console.log(mouse);
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(mouse);
        this.#redraw();
      }
    }
    this.canvas.onmouseup = () => {
      this.isDrawing = false;
    }

    this.canvas.ontouchstart = (evt) => {
      const loc = evt.touches[0];
      this.canvas.onmousedown(loc);
    }

    this.canvas.ontouchmove = (evt) => {
      const loc = evt.touches[0];
      this.canvas.onmousemove(loc);
    }
    this.canvas.ontouchend = () => {
      this.canvas.onmouseup();
    }
  }

  #getMouse = (evt) => {
    const rect = this.canvas.getBoundingClientRect();
    return [
      Math.round(evt.clientX - rect.left),
      Math.round(evt.clientY - rect.top)
    ];
  }

  #redraw() {
    this.ctx.clearRect(0, 0,
      this.canvas.width, this.canvas.height);
    draw.paths(this.ctx, this.paths);
  }


}