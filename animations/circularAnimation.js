/**
 * Class that handles a circular animation
 */
class CircularAnimation extends Animation{
    /**
     * @constructor
     * @param radius - Sets the distance between the center and the object
     * @param speed - Linear speed
     * @param center - 3D Point that determines the center of the animation
     * @param initialAng - Sets the initial angle of the object
     * @param rotationAng - Sets the angle that the object will rotate over the course of the animation
     */
    constructor(radius, speed, center, initialAng, rotationAng) {
        super();
        if (rotationAng < 0)
          speed *= -1;
        this.speed = speed;
        if (radius == 0)
            this.angular_velocity = speed;
        else
            this.angular_velocity = speed / radius;
        this.radius = radius;
        this.center = vec3.fromValues(center[0], center[1], center[2]);
        this.initialAng = initialAng * DEGREE_TO_RAD;
        this.rotationAng = rotationAng * DEGREE_TO_RAD;
        this.maxAngle = this.rotationAng + this.initialAng;
        this.duration = Math.abs(this.rotationAng / this.angular_velocity);
        this.initAnimation();
    }

    /**
     * Initializes a circular animation to optimize rendering by pre-calculating needed information
     * Calculates the center, radius and initial rotation matrices
     */
    initAnimation() {
        this.centerMatrix = mat4.fromTranslation(mat4.create(), this.center);
        this.radiusMatrix = mat4.fromTranslation(mat4.create(), vec3.fromValues(this.radius, 0, 0));
        if(this.rotationAng > 0)
          this.initialRotationMatrix = mat4.fromRotation(mat4.create(), Math.PI, vec3.fromValues(0, 1, 0));
        else
          this.initialRotationMatrix = mat4.create();
    }

    /**
     * Calculates the animation matrix.
     * @param deltaTime - Time in seconds since the beginning of the animation
     * @return Animation matrix
     */
    getMatrix(deltaTime) {
        let deltaAlpha = this.initialAng + this.angular_velocity * deltaTime;
        if(Math.abs(deltaAlpha) > Math.abs(this.maxAngle)) {
          deltaAlpha = this.maxAngle;
          this.ended = true;
        }
        let deltaAlphaMatrix = mat4.fromRotation(mat4.create(), deltaAlpha, vec3.fromValues(0, 1, 0));

        let tmpMatrix = mat4.create();
        mat4.multiply(tmpMatrix, this.centerMatrix, deltaAlphaMatrix);
        mat4.multiply(tmpMatrix, tmpMatrix, this.radiusMatrix);
        mat4.multiply(tmpMatrix, tmpMatrix, this.initialRotationMatrix);

        return tmpMatrix;
    }
}
