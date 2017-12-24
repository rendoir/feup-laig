/**
 * Abstract class that specifies an animation.
 */
class Animation {
    /**
     * @constructor
     */
    constructor() {
        this.duration = 0;
        this.ended = false;
    }

    /**
     * Initializes an animation to optimize rendering by pre-calculating needed information.
     * @abstract
     */
    initAnimation() { throw "Abstract Class: Cannot use initAnimation()"; }

    /**
     * Calculates the animation matrix.
     * @abstract
     * @param deltaTime - Time in seconds since the beginning of the animation
     * @return Animation matrix
     */
    getMatrix(deltaTime) { throw "Abstract Class: Cannot use getMatrix()"; }
}
