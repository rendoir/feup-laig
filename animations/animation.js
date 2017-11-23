class Animation {
    constructor(speed) {
        this.speed = speed;
        this.duration = 0;
    }

    initAnimation() { throw "Abstract Class: Cannot use initAnimation()"; }
    getMatrix(deltaTime) { throw "Abstract Class: Cannot use getMatrix()"; }
}