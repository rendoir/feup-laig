class BezierAnimation extends Animation {
    constructor(speed, controlPoints) {
        super(speed);
        this.controlPoints = controlPoints;
        this.initAnimation();
    }

    initAnimation() {
        this.distance = this.getDistance();
        this.durantion = this.distance / this.speed;
        this.animationMatrix = mat4.create();
    }

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

    getMatrix(deltaTime) {
        let time;
        if (deltaTime <= this.durantion) {
            time = deltaTime / this.durantion;
        } else
            time = 1;

        mat4.identity(this.animationMatrix);
        //console.log("Tempo: ", time);

        let position = vec3.create();
        //console.log("Old Position: ", this.position);
        position = this.getNextPoint(time);
        //console.log("New Position: ", this.position);

        let angle = vec3.create();
        angle = this.getAngle(time);

        mat4.translate(this.animationMatrix, this.animationMatrix, position);
        mat4.rotateY(this.animationMatrix, this.animationMatrix, angle);

        return this.animationMatrix;
    }

}