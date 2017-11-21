class Animation {
    constructor(speed) {
        this.speed = speed;
    }
    getMatrix(deltaTime) { throw "Abstract Class: Cannot use getMatrix()"; }
}