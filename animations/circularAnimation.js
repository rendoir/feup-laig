class CircularAnimation extends Animation{
    constructor(radius, speed, center, initialAng, rotationAng) {
        super(speed);
        if (radius == 0)
            this.angular_velocity = speed;
        else
            this.angular_velocity = speed / radius;
        this.radius = radius;
        this.center = vec3.fromValues(center[0], center[1], center[2]);
        this.initialAng = initialAng * DEGREE_TO_RAD;
        this.maxAngle = rotationAng * DEGREE_TO_RAD + this.initialAng;
        this.initAnimation();
    }


    initAnimation() {
        this.centerMatrix = mat4.fromTranslation(mat4.create(), this.center);
        this.radiusMatrix = mat4.fromTranslation(mat4.create(), vec3.fromValues(this.radius, 0, 0));
        this.initialRotationMatrix = mat4.fromRotation(mat4.create(), Math.PI, vec3.fromValues(0, 1, 0));
    }


    getMatrix(deltaTime) {
        let deltaAlpha = this.initialAng + this.angular_velocity * deltaTime;
        if (deltaAlpha > this.maxAngle)
            deltaAlpha = this.maxAngle;
        let deltaAlphaMatrix = mat4.fromRotation(mat4.create(), deltaAlpha, vec3.fromValues(0, 1, 0));

        let tmpMatrix = mat4.create();
        mat4.multiply(tmpMatrix, this.centerMatrix, deltaAlphaMatrix);
        mat4.multiply(tmpMatrix, tmpMatrix, this.radiusMatrix);
        mat4.multiply(tmpMatrix, tmpMatrix, this.initialRotationMatrix);

        return tmpMatrix;
    }
}