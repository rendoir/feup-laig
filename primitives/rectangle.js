/**
 * Rectangle
 * @constructor
 */
function Rectangle(scene, left_top, right_bottom) {
    CGFobject.call(this, scene);
    this.minS = 0.0;
    this.maxS = 1.0;
    this.minT = 0.0;
    this.maxT = 1.0;
    this.left_top = left_top;
    this.right_bottom = right_bottom;
    this.initBuffers();
};

Rectangle.prototype = Object.create(CGFobject.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.initBuffers = function() {
    this.vertices = [
        this.left_top[0],     this.right_bottom[1], 0,
        this.right_bottom[0], this.right_bottom[1], 0,
        this.left_top[0],     this.left_top[1],     0,
        this.right_bottom[0], this.left_top[1],     0
    ];

    this.indices = [
        0, 1, 2,
        3, 2, 1
    ];
    this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ];

    this.texCoords = [
        this.minS, this.maxT,
        this.maxS, this.maxT,
        this.minS, this.minT,
        this.maxS, this.minT
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
