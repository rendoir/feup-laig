/**
 * Circle
 * @constructor
 */
function Circle(scene, slices, minS, maxS, minT, maxT, rad) {
    CGFobject.call(this, scene);

    this.minS = minS || 0;
    this.maxS = maxS || 1;
    this.minT = minT || 0;
    this.maxT = maxT || 1;
    this.radius = rad || 1;
    this.slices = slices;
    this.initBuffers();

};

Circle.prototype = Object.create(CGFobject.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.initBuffers = function() {


    var angle = 2 * Math.PI / this.slices;

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var angle_now = 0;
    var indice = 0;

    for (i = 0; i < this.slices; i++) {

        var x0 = Math.cos(angle_now) * this.radius;
        var y0 = Math.sin(angle_now) * this.radius;

        angle_now += angle;

        var x1 = Math.cos(angle_now) * this.radius;
        var y1 = Math.sin(angle_now) * this.radius;

        this.vertices.push(x0);
        this.vertices.push(y0);
        this.vertices.push(0); // vertice 0

        this.vertices.push(x1);
        this.vertices.push(y1);
        this.vertices.push(0); // vertice 1

        this.vertices.push(0)
        this.vertices.push(0);
        this.vertices.push(0); // vertice 2

        this.indices.push(indice); // 0
        this.indices.push(indice + 1); // 1
        this.indices.push(indice + 2); // 2

        indice += 3;

        // normal a vertice 0
        this.normals.push(0);
        this.normals.push(0);
        this.normals.push(1);

        // normal a vertice 1
        this.normals.push(0);
        this.normals.push(0);
        this.normals.push(1);

        // normal a vertice 2
        this.normals.push(0);
        this.normals.push(0);
        this.normals.push(1);

        // coordenadas textura

        this.texCoords.push(0.5 * (x0 + 1), 0.5 * (1 - y0));
        this.texCoords.push(0.5 * (x1 + 1), 0.5 * (1 - y1));
        this.texCoords.push(0.5, 0.5);
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();

};