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

Rectangle.prototype.initBuffers = function () {
    let x_min = this.left_top[0];
    let x_max = this.right_bottom[0];
    let y_min = this.right_bottom[1];
    let y_max = this.left_top[1];

    this.vertices = [
        x_min, y_min, 0,
        x_max, y_min, 0,
        x_min, y_max, 0,
        x_max, y_max, 0
    ];

    this.indices = [
        0, 1, 2,
        1, 3, 2
    ];
    this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ];

    const length = Math.abs(x_max - x_min);
    const height = Math.abs(y_max - y_min);
    const texCoordsMaxS = length / this.afs;
    const texCoordsMaxT = height / this.aft;

    this.texCoords = [
        0, texCoordsMaxT,
        texCoordsMaxS, texCoordsMaxT,
        0, 0,
        texCoordsMaxS, 0
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
