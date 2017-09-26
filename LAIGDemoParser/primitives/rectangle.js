/**
 * Rectangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Rectangle(scene, minS, maxS, minT, maxT, width, height) {
    CGFobject.call(this, scene);
    this.minS = minS || 0.0;
    this.maxS = maxS || 1.0;
    this.minT = minT || 0.0;
    this.maxT = maxT || 1.0;
    this.halfWidth = width / 2.0 || 0.5;
    this.halfHeight = height / 2.0 || 0.5;
    this.initBuffers();
};

Rectangle.prototype = Object.create(CGFobject.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.initBuffers = function() {


    this.vertices = [-this.halfWidth, -this.halfHeight, 0,
        this.halfWidth, -this.halfHeight, 0, -this.halfWidth, this.halfHeight, 0,
        this.halfWidth, this.halfHeight, 0
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