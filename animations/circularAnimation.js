/**
 * CircularAnimation
 * @constructor
 */
function CircularAnimation(radius, speed, center, initialAng, rotationAng) {
    Animation.call(this);
    this.radius = radius;
    this.speed = speed;
    this.center = center;
    this.initialAng = initialAng;
    this.rotationAng = rotationAng;
}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.getMatrix = function(deltaTime) {
    this.actualTime += deltaTime;
};