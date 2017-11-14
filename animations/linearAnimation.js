function LinearAnimation(control_points, speed) {
    if (control_points.length < 2)
        throw "Insufficient control points!";
    this.control_points = control_points;
    this.linear_speed = speed;
    this.isInitialized = false;
    this.current_animation = -1;
    this.initNextAnimation();
}

LinearAnimation.prototype.initNextAnimation = function() {
    this.current_animation++;
    this.p1 = vec3.fromValues(this.control_points[this.current_animation][0], this.control_points[this.current_animation][1], this.control_points[this.current_animation][2]);
    this.p2 = vec3.fromValues(this.control_points[this.current_animation + 1][0], this.control_points[this.current_animation + 1][1], this.control_points[this.current_animation + 1][2]);
    let subtraction_vector = vec3.subtract(vec3.create(), this.p2, this.p1);
    this.length = vec3.length(subtraction_vector);
    let vx = this.linear_speed * (this.p2[0] - this.p1[0]) / this.length;
    let vy = this.linear_speed * (this.p2[1] - this.p1[1]) / this.length;
    let vz = this.linear_speed * (this.p2[2] - this.p1[2]) / this.length;
    this.speed = [vx, vy, vz];
    this.matrix_p1 = mat4.fromTranslation(mat4.create(), this.p1);
    let projection_xz = vec3.fromValues(subtraction_vector[0], 0, subtraction_vector[2]);
    //let projection_xy = vec3.fromValues(subtraction_vector[0], subtraction_vector[1], 0);
    let unit_vector = vec3.fromValues(0, 0, 1);
    const y_axis = vec3.fromValues(0, 1, 0);
    angle_y = vec3.angle(projection_xz, unit_vector); //Angle to rotate in y
    //angle_z = vec3.angle(projection_xy, unit_vector); //Angle to rotate in z
    //let matrix_angle_y = mat4.fromRotation(mat4.create(), angle_y, unit_vector);
    //let matrix_angle_z = mat4.fromRotation(mat4.create(), angle_z, unit_vector);
    //this.matrix_angle = mat4.multiply(mat4.create(), matrix_angle_z, matrix_angle_y);
    this.matrix_angle = mat4.fromRotation(mat4.create(), angle_y, y_axis);
    this.duration = this.length / Math.sqrt(this.speed[0] ^ 2 + this.speed[2] ^ 2 + this.speed[2] ^ 2);
};

LinearAnimation.prototype.checkEndOfCurrentAnimation = function(time) {
    if (time * this.linear_speed >= this.length) {
        if (this.current_animation < this.control_points.length - 2) {
            this.initNextAnimation();
            time = 0;
        } else this.current_animation++;
    }
};

LinearAnimation.prototype.getMatrix = function(time) {
    let deltaX = time * this.speed[0];
    let deltaY = time * this.speed[1];
    let deltaZ = time * this.speed[2];
    let delta_position = vec3.fromValues(deltaX, deltaY, deltaZ);
    let matrix_delta_position = mat4.fromTranslation(mat4.create(), delta_position);
    let temp_matrix = mat4.multiply(mat4.create(), matrix_delta_position, this.matrix_p1);
    let final_matrix = mat4.multiply(mat4.create(), temp_matrix, this.matrix_angle);
    this.checkEndOfCurrentAnimation(time);
    return final_matrix;
};