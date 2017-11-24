/**
 * Class that handles a cubic Bezier curve animation
 */
class BezierAnimation extends Animation {
    /**
     * @constructor
     * @param control_points - 3D Points that represent the convex hull
     * @param speed - Linear speed
     */
    constructor(speed, controlPoints) {
        super();
        this.speed = speed;
        this.controlPoints = controlPoints;
        this.initAnimation();
    }

    /**
     * Initializes a cubic Bezier curve animation to optimize rendering by pre-calculating needed information
     * Calculates the length of the curve and the duration of the animation
     */
    initAnimation() {
        this.distance = this.getDistance();
        this.duration = this.distance / this.speed;
    }

    /**
     * Calculates the length of the curve using 0.01 intervals
     * @return The length of the curve
     */
    getDistance() {
        let lastPoint = vec3.create();
        let distance = 0;
        for (let i = 0; i <= 1; i += 0.01) {
            let nextPoint = this.getNextPoint(i);
            distance += vec3.distance(nextPoint, lastPoint);
            lastPoint = nextPoint;
        }
        return distance;
    }

    /**
     * Calculates a 3D point based on the interpolated time
     * @param time - Interpolated time with time in [0, 1]
     * @return 3D position point
     */
    getNextPoint(time) {
        let position = new Array(3);
        position[0] =
            Math.pow((1 - time), 3) * this.controlPoints[0][0] +
            3 * time * Math.pow((1 - time), 2) * this.controlPoints[1][0] +
            3 * Math.pow(time, 2) * (1 - time) * this.controlPoints[2][0] +
            Math.pow(time, 3) * this.controlPoints[3][0];

        position[1] =
            Math.pow((1 - time), 3) * this.controlPoints[0][1] +
            3 * time * Math.pow((1 - time), 2) * this.controlPoints[1][1] +
            3 * Math.pow(time, 2) * (1 - time) * this.controlPoints[2][1] +
            Math.pow(time, 3) * this.controlPoints[3][1];

        position[2] =
            Math.pow((1 - time), 3) * this.controlPoints[0][2] +
            3 * time * Math.pow((1 - time), 2) * this.controlPoints[1][2] +
            3 * Math.pow(time, 2) * (1 - time) * this.controlPoints[2][2] +
            Math.pow(time, 3) * this.controlPoints[3][2];
        return position;
    }

    /**
     * Calculates the angle to rotate around the Y axis based on the interpolated time
     * @param time - Interpolated time with time in [0, 1]
     * @return Angle to rotate around the Y axis
     */
    getAngle(time) {
        let direction = vec3.create();
        let angle = 0;
        direction[0] =
            3 * Math.pow((1 - time), 2) * (this.controlPoints[1][0] - this.controlPoints[0][0]) +
            6 * (1 - time) * time * (this.controlPoints[2][0] - this.controlPoints[1][0]) +
            3 * Math.pow(time, 2) * (this.controlPoints[3][0] - this.controlPoints[2][0]);

        direction[2] =
            3 * Math.pow((1 - time), 2) * (this.controlPoints[1][2] - this.controlPoints[0][2]) +
            6 * (1 - time) * time * (this.controlPoints[2][2] - this.controlPoints[1][2]) +
            3 * Math.pow(time, 2) * (this.controlPoints[3][2] - this.controlPoints[2][2]);

        if (direction[2] > 0)
            angle = Math.atan(direction[0] / direction[2]);
        else if (direction[2] < 0)
            angle = Math.atan(direction[0] / direction[2]) + Math.PI;
        else if (direction[2] == 0)
            angle = 0;
        return angle;
    }

    /**
     * Calculates the bezier animation matrix.
     * @param deltaTime - Time in seconds since the beginning of the animation
     * @return Animation matrix
     */
    getMatrix(deltaTime) {
        let time;
        if (deltaTime <= this.duration) {
            time = deltaTime / this.duration;
        } else
            time = 1;

        let animationMatrix = mat4.create();

        let position = vec3.create();
        position = this.getNextPoint(time);

        let angle = vec3.create();
        angle = this.getAngle(time);

        mat4.translate(animationMatrix, animationMatrix, position);
        mat4.rotateY(animationMatrix, animationMatrix, angle);

        return animationMatrix;
    }

}