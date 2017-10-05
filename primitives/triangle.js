/**
 * Triangle
 * @constructor
 */
function Triangle(scene, vertex_1, vertex_2, vertex_3) {
    CGFobject.call(this, scene);
    this.v1 = vertex_1;
    this.v2 = vertex_2;
    this.v3 = vertex_3;
    this.initBuffers();
};

Triangle.prototype = Object.create(CGFobject.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.initBuffers = function() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var v1 = this.v1;
    var v2 = this.v2;
    var v3 = this.v3;

    this.vertices.push(v1[0], v1[1], v1[2]);
    this.vertices.push(v2[0], v2[1], v2[2]);
    this.vertices.push(v3[0], v3[1], v3[2]);

    this.indices.push(0, 1, 2);

    var v12 = [v2[0] - v1[0], v2[1] - v1[1], v2[2] - v1[2]];
    var v13 = [v3[0] - v1[0], v3[1] - v1[1], v3[2] - v1[2]];

    var normalVector = [
        v12[1] * v13[2] - v12[2] * v13[1],
        v12[2] * v13[0] - v12[0] * v13[2],
        v12[0] * v13[1] - v12[1] * v13[0]
    ];

    this.normals.push(normalVector[0], normalVector[1], normalVector[2]);
    this.normals.push(normalVector[0], normalVector[1], normalVector[2]);
    this.normals.push(normalVector[0], normalVector[1], normalVector[2]);

    this.texCoords.push(0, 0);
    this.texCoords.push(1, 0);
    this.texCoords.push(0.5, 1);

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};