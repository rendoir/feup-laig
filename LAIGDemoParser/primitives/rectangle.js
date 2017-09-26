/**
 * Rectangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Rectangle(scene, ltx,lty,rbx,rby, height, minS, maxS, minT, maxT) {
    CGFobject.call(this, scene);
    this.minS = minS || 0.0;
    this.maxS = maxS || 1.0;
    this.minT = minT || 0.0;
    this.maxT = maxT || 1.0;
    this.ltx = ltx;
    this.lty = lty;
    this.rbx = rbx;
    this.rby = rby;
    this.initBuffers();
};

Rectangle.prototype = Object.create(CGFobject.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.initBuffers = function() {


    this.vertices = [this.ltx,this.rby, 0,
        this.rbx,this.rby, 0, this.ltx,this.lty, 0,
        this.rbx, this.lty, 0
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