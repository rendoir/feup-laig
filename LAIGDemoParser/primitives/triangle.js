/**
 * Triangle
 * @constructor
 */
function Triangle(scene) {
    CGFobject.call(this, scene);

    this.initBuffers();
};

Triangle.prototype = Object.create(CGFobject.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];

    this.vertices.push(0.5, 0.3, 0);
    this.vertices.push(-0.5, 0.3, 0);
    this.vertices.push(0, 0.3, 2);

    this.indices.push(0, 1, 2);

    this.normals.push(0, 1, 0);
    this.normals.push(0, 1, 0);
    this.normals.push(0, 1, 0);


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};