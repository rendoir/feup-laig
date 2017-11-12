function LinerAnimation(control_points, speed) {
    if (control_points.length < 2)
        throw "Insufficient control points!";
    this.control_points = control_points;
    this.linear_speed = speed;
    this.isInitialized = false;
    this.current_animation = -1;
    this.initNextAnimation();
}

LinerAnimation.prototype.initNextAnimation = function() {
    this.current_animation++;
    this.p1 = vec3.fromValues(this.control_points[this.current_animation]);
    this.p2 = vec3.fromValues(this.control_points[this.current_animation + 1]);
    let subtraction_vector = vec3.subtract(subtraction_vector, this.p2, this.p1); //error can't be used before declared
    let length = vec3.length(subtraction_vector);
    let time = length / this.linear_speed;
    let vx = (this.p2[0] - this.p1[0]) / time;
    let vy = (this.p2[1] - this.p1[1]) / time;
    let vz = (this.p2[2] - this.p1[2]) / time;
    this.speed = [vx, vy, vz];
    this.matrix_p1 = mat4.fromTranslation(create(), this.p1);
    let projection_xz = vec3.fromValues(subtraction_vector[0], 0, subtraction_vector[2]);
    let projection_xy = vec3.fromValues(subtraction_vector[0], subtraction_vector[1], 0);
    let unit_vector = vec3.fromValues(0, 0, 1);
    angle_y = vec3.angle(projection_xz, unit_vector); //Angle to rotate in y
    angle_z = vec3.angle(projection_xy, unit_vector); //Angle to rotate in z
    let matrix_angle_y = mat4.fromRotation(mat4.create(), matrix_angle_y, unit_vector); //error can't be used before declared
    let matrix_angle_z = mat4.fromRotation(mat4.create(), matrix_angle_z, unit_vector); //error can't be used before declared
    this.matrix_angle = mat4.multiply(mat4.create(), matrix_angle_z, matrix_angle_y);
};

LinearAnimation.prototype.checkEndOfCurrentAnimation = function(deltaT) {
    if (deltaT * this.linear_speed >= this.length)
        initNextAnimation();
};

LinearAnimation.prototype.getMatrix = function(deltaT) {
    if (this.current_animation >= control_points.length - 1)
        return null;
    let deltaX = deltaT * this.speed[0];
    let deltaY = deltaT * this.speed[1];
    let deltaZ = deltaT * this.speed[2];
    let delta_position = vec3.fromValues(deltaX, deltaY, deltaZ);
    let matrix_delta_position = mat4.fromTranslation(mat4.create(), delta_position);
    let temp_matrix = mat4.multiply(mat4.create(), matrix_delta_position, this.matrix_p1);
    let final_matrix = mat4.multiply(mat4.create(), temp_matrix, this.matrix_angle);
    checkEndOfCurrentAnimation(deltaT);
    return final_matrix;
};