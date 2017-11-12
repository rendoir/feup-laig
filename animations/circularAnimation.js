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
    this.actualTime = 0;
};

CircularAnimation.prototype.correctionAxis = function(animationMatrix, angle) {
    let actualAngle = this.speed / this.radius * this.actualTime;
    if (angle < 0) {
        actualAngle *= -1;
    }
    let actualX = this.center[0] + Math.cos(actualAngle) * this.radius;
    let actualZ = this.center[2] + Math.sin(actualAngle) * this.radius;
    mat4.translate(animationMatrix, animationMatrix, [-actualX, 0, -actualZ]);
    mat4.rotateY(animationMatrix, animationMatrix, -angle);
    mat4.translate(animationMatrix, animationMatrix, [actualX, 0, actualZ]);
};

CircularAnimation.prototype.getMatrix = function(deltaTime) {
    let animationMatrix;
    if (this.actualTime == 0) {
        animationMatrix = this.initialMatrix;
    } else {
        animationMatrix = mat4.create();
    }
    this.actualTime += deltaTime;
    let angle;
    if (this.radius != 0) {
        angle = this.speed / this.radius * deltaTime;
        //this.correctionAxis(animationMatrix, angle); //NEED TO BE FIXED, with this rotate to the wrong side
    } else {
        angle = this.speed * deltaTime;
    }
    mat4.translate(animationMatrix, animationMatrix, [-this.center[0], 0, -this.center[2]]);
    mat4.rotateY(animationMatrix, animationMatrix, angle);
    mat4.translate(animationMatrix, animationMatrix, [this.center[0], 0, this.center[2]]);
    return animationMatrix;
};