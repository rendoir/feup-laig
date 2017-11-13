class BezierAnimation extends Animation {
    constructor(speed, controlPoints) {
        super(speed);
        this.controlPoints = controlPoints;
        this.initAnimation();
    }

    initAnimation() {
        this.t = 0;
        this.distance = 1;
        this.durantion = this.distance / this.speed;
        this.animationMatrix = mat4.create();
    }

    getMatrix(deltaTime) {
        if (this.t < 1) {
            mat4.identity(this.animationMatrix);
            // console.log("deltaTime: ", deltaTime * 0.001);
            this.t += deltaTime / this.durantion;
            if (this.t > 1) {
                this.t = 1;
            }
            //console.log("Tempo: ", this.t);

            let position = new Array(3);
            //console.log("Old Position: ", this.position);
            position[0] =
                Math.pow((1 - this.t), 3) * this.controlPoints[0][0] +
                3 * this.t * Math.pow((1 - this.t), 2) * this.controlPoints[1][0] +
                3 * Math.pow(this.t, 2) * (1 - this.t) * this.controlPoints[2][0] +
                Math.pow(this.t, 3) * this.controlPoints[3][0];

            position[1] =
                Math.pow((1 - this.t), 3) * this.controlPoints[0][1] +
                3 * this.t * Math.pow((1 - this.t), 2) * this.controlPoints[1][1] +
                3 * Math.pow(this.t, 2) * (1 - this.t) * this.controlPoints[2][1] +
                Math.pow(this.t, 3) * this.controlPoints[3][1];

            position[2] =
                Math.pow((1 - this.t), 3) * this.controlPoints[0][2] +
                3 * this.t * Math.pow((1 - this.t), 2) * this.controlPoints[1][2] +
                3 * Math.pow(this.t, 2) * (1 - this.t) * this.controlPoints[2][2] +
                Math.pow(this.t, 3) * this.controlPoints[3][2];

            //console.log("New Position: ", this.position);

            mat4.translate(this.animationMatrix, this.animationMatrix, position);
        }
        return this.animationMatrix;
    }
}