class BezierAnimation extends Animation {
    constructor(speed, controlPoints) {
        super(speed);
        this.controlPoints = controlPoints;
        this.initAnimation();
    }

    initAnimation() {
        this.distance = 1;
        this.durantion = this.distance / this.speed;
        this.animationMatrix = mat4.create();
    }

    getMatrix(time) {
        if (time < 1) {
            mat4.identity(this.animationMatrix);
            //console.log("Tempo: ", time);

            let position = new Array(3);
            //console.log("Old Position: ", this.position);
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

            //console.log("New Position: ", this.position);

            mat4.translate(this.animationMatrix, this.animationMatrix, position);
        }
        return this.animationMatrix;
    }
}