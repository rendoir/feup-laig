class LinearAnimation extends Animation {
    constructor(control_points, speed) {
        super(speed);
        if (control_points.length < 2)
            throw "Insufficient control points!";
        this.control_points = control_points;
        this.linear_speed = speed;
        this.segments = [];
        this.initAnimation();
    }

    initAnimation() {
        this.duration = 0;
        for (let i = 0; i < this.control_points.length - 1; i++) {
            let p1 = vec3.fromValues(this.control_points[i][0], this.control_points[i][1], this.control_points[i][2]);
            let p2 = vec3.fromValues(this.control_points[i + 1][0], this.control_points[i + 1][1], this.control_points[i + 1][2]);

            let subtraction_vector = vec3.subtract(vec3.create(), p2, p1);
            let length = vec3.length(subtraction_vector);

            let vx = this.linear_speed * (p2[0] - p1[0]) / length;
            let vy = this.linear_speed * (p2[1] - p1[1]) / length;
            let vz = this.linear_speed * (p2[2] - p1[2]) / length;
            let speed = [vx, vy, vz];

            let matrix_p1 = mat4.fromTranslation(mat4.create(), p1);
            let projection_xz = vec3.fromValues(subtraction_vector[0], 0, subtraction_vector[2]);
            let unit_vector = vec3.fromValues(0, 0, 1);
            let y_axis = vec3.fromValues(0, 1, 0);
            let angle_y = vec3.angle(projection_xz, unit_vector);
            let matrix_angle = mat4.fromRotation(mat4.create(), angle_y, y_axis);
            this.segments[i] = {
                matrix_p1: matrix_p1,
                matrix_angle: matrix_angle,
                speed: speed,
                init_time: this.duration
            };

            this.duration += length / this.linear_speed;
        }
    }

    getSegment(deltaTime) {
        for (let i = this.segments.length - 1; i >= 0; i--) {
            if (deltaTime >= this.segments[i].init_time) {
                return this.segments[i];
            }
        }
    }

    getMatrix(deltaTime) {
        let segment = this.getSegment(deltaTime);
        if (deltaTime > this.duration)
            deltaTime = this.duration;
        let dT = deltaTime - segment.init_time;
        let deltaX = dT * segment.speed[0];
        let deltaY = dT * segment.speed[1];
        let deltaZ = dT * segment.speed[2];
        let delta_position = vec3.fromValues(deltaX, deltaY, deltaZ);
        let matrix_delta_position = mat4.fromTranslation(mat4.create(), delta_position);
        let temp_matrix = mat4.multiply(mat4.create(), segment.matrix_p1, matrix_delta_position);
        let final_matrix = mat4.multiply(mat4.create(), temp_matrix, segment.matrix_angle);
        return final_matrix;
    }
}