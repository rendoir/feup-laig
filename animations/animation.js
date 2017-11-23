class Animation {
    constructor() {
        this.duration = 0;
    }

    initAnimation() { throw "Abstract Class: Cannot use initAnimation()"; }
    getMatrix(deltaTime) { throw "Abstract Class: Cannot use getMatrix()"; }
}