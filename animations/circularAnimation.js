class CircularAnimation extends Animation {
    constructor(radius, speed, center, initialAng, rotationAng) {
        super(speed * DEGREE_TO_RAD);
        this.radius = radius;
        this.center = center;
        this.initialAng = initialAng * DEGREE_TO_RAD;
        this.rotationAng = rotationAng * DEGREE_TO_RAD;
        this.initAnimation();
    }
    initAnimation() {
        this.initialMatrix = mat4.create();
        let initialX = this.center[0] + Math.cos(this.initialAng) * this.radius;
        let initialZ = this.center[2] + Math.sin(this.initialAng) * this.radius;
        mat4.translate(this.initialMatrix, this.initialMatrix, [initialX, 0, initialZ]);
        this.actualAngle = this.initialAng;
        if (this.radius > 0) {
            this.duration = Math.abs(this.rotationAng) / (this.speed / this.radius);
        } else {
            this.duration = Math.abs(this.rotationAng) / this.speed;
        }
    }
    getMatrix(time) {
        let animationMatrix = mat4.create();
        if (time < 1) {
            this.actualAngle = this.initialAng + time * this.rotationAng;
        } else {
            this.actualAngle = this.initialAng + this.rotationAng;
        }
        /* AXIS DONT CHANGE 
        let X = this.center[0] + Math.cos(this.actualAngle) * this.radius;
        let Z = this.center[2] - Math.sin(this.actualAngle) * this.radius;
        mat4.translate(animationMatrix, animationMatrix, [X, 0, Z]);
        //*/
        /* AXIS ROTATE WITH MOVEMENT */
        mat4.rotateY(animationMatrix, animationMatrix, this.actualAngle);
        mat4.multiply(animationMatrix, animationMatrix, this.initialMatrix);
        //*/
        return animationMatrix;
    }
}