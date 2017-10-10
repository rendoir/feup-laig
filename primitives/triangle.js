/**
 * Triangle
 * @constructor
 */
function Triangle(scene, vertex_1, vertex_2, vertex_3, afs, aft) {
    CGFobject.call(this, scene);
    this.vA = vertex_1;
    this.vB = vertex_2;
    this.vC = vertex_3;
    this.afs = afs || 1;
    this.aft = aft || 1;
    this.initBuffers();
};

Triangle.prototype = Object.create(CGFobject.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.initBuffers = function() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];


    /**
     * ---------------C--------------
     * --------------/\--------------
     * -------------/  \-------------
     * ------------/    \------------
     * -----------/______\-----------
     * ----------A--------B----------
     */

    this.vertices.push(this.vA[0], this.vA[1], this.vA[2]);
    this.vertices.push(this.vB[0], this.vB[1], this.vB[2]);
    this.vertices.push(this.vC[0], this.vC[1], this.vC[2]);

    this.indices.push(0, 1, 2);

    const AB = [this.vB[0] - this.vA[0], this.vB[1] - this.vA[1], this.vB[2] - this.vA[2]];
    const AC = [this.vC[0] - this.vA[0], this.vC[1] - this.vA[1], this.vC[2] - this.vA[2]];
    const BC = [this.vC[0] - this.vB[0], this.vC[1] - this.vB[1], this.vC[2] - this.vB[2]];

    const ab = Math.sqrt(AB[0]*AB[0] + AB[1]*AB[1] + AB[2] * AB[2]);
    const ac = Math.sqrt(AC[0]*AC[0] + AC[1]*AC[1] + AC[2] * AC[2]);
    const bc = Math.sqrt(BC[0]*BC[0] + BC[1]*BC[1] + BC[2] * BC[2]);

    const normalVector = [
        AB[1] * AC[2] - AB[2] * AC[1],
        AB[2] * AC[0] - AB[0] * AC[2],
        AB[0] * AC[1] - AB[1] * AC[0]
    ];

    this.normals.push(normalVector[0], normalVector[1], normalVector[2]);
    this.normals.push(normalVector[0], normalVector[1], normalVector[2]);
    this.normals.push(normalVector[0], normalVector[1], normalVector[2]);

    //Let alpha be the angle made by the segments AB and AC
    const cosAlpha = (-(bc*bc) + (ac*ac) + (ab*ab))/(2 * ac * ab);
    const sinAlpha = Math.sqrt(1 - (cosAlpha*cosAlpha));

    this.texCoords.push(0, ac * sinAlpha / this.aft); // Point A texture coords.
    this.texCoords.push(ab/this.afs, ac * sinAlpha / this.aft); // Point B texture coords.
    this.texCoords.push(ac * cosAlpha / this.afs, 0); // Point C texture coords

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
