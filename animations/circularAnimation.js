/**
 * CircularAnimation
 * @constructor
 */
function CircularAnimation(radius, speed, center, initialAng, rotationAng) {
    //Animation.call(this);
    this.radius = radius;
    this.speed = speed;
    this.center = center;
    this.initialAng = initialAng;
    this.rotationAng = rotationAng;
    this.initMatrix();
}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.initMatrix = function() {
    this.initialMatrix = mat4.create();
    let initialX = this.center[0] + Math.cos(this.initialAng) * this.radius;
    let initialZ = this.center[2] + Math.sin(this.initialAng) * this.radius;
    mat4.translate(this.initialMatrix, this.initialMatrix, [initialX, 0, initialZ]);
    this.actualAngle = this.initialAng;
};

CircularAnimation.prototype.getMatrix = function(deltaTime) {
    let animationMatrix = mat4.create();
    let angle;
    if (this.radius != 0) {
        angle = this.speed / this.radius * deltaTime;
    } else {
        angle = this.speed * deltaTime;
    }
    if (this.actualAngle + angle > this.rotationAng) {
        angle = this.rotationAng - this.actualAngle;
        this.actualAngle = this.rotationAng;
    } else {
        this.actualAngle += angle;
    }
    /* AXIS DONT CHANGE
    animationMatrix = this.initialMatrix;
    let X = Math.cos(this.actualAngle) * this.radius - Math.cos(this.actualAngle - angle) * this.radius;
    let Z = Math.sin(this.actualAngle - angle) * this.radius - Math.sin(this.actualAngle) * this.radius;
    mat4.translate(animationMatrix, animationMatrix, [X, 0, Z]);
    */

    /* AXIS ROTATE WITH MOVEMENT */
    mat4.rotateY(animationMatrix, animationMatrix, this.actualAngle);
    mat4.multiply(animationMatrix, animationMatrix, this.initialMatrix);
    return animationMatrix;
};