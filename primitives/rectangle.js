/**
 * Rectangle
 * @constructor
 * @param afs - Amplification factor on S axis.
 * @param aft - Amplification factor on T axis.
 */
function Rectangle(scene, left_top, right_bottom, afs, aft) {
    CGFobject.call(this, scene);
    this.afs = afs || 1;
    this.aft = aft || 1;
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
    const length = Math.abs(this.right_bottom[0] - this.left_top[0]);
    const height = Math.abs(this.left_top[1] - this.right_bottom[1]);

    const texCoordsMaxS = length / this.afs;
    const texCoordsMaxT = height / this.aft;
    this.texCoords = [
        0, 0,
        texCoordsMaxS, 0,
        0, texCoordsMaxT,
        texCoordsMaxS, texCoordsMaxT
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
