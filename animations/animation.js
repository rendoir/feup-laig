class Animation {
    constructor(speed) {
        this.speed = speed;
    }

    initAnimation() { throw "Abstract Class: Cannot use initAnimation()"; }
    getMatrix(deltaTime) { throw "Abstract Class: Cannot use getMatrix()"; }
}