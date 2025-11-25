export let character = {
    x: 50,
    y: 50,
    w: 50,
    h: 50,
    draw() {
        rect(this.x, this.y, this.w, this.h);
    },
};
