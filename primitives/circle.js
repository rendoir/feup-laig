/**
 * Circle
 * @constructor
 */
function Circle(scene, slices, radius) {
    CGFobject.call(this, scene);

    this.radius = radius;
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

        //Vertices
            //Current vertex
        this.vertices.push(x0);
        this.vertices.push(y0);
        this.vertices.push(0);

            //Next vertex
        this.vertices.push(x1);
        this.vertices.push(y1);
        this.vertices.push(0);

            //Center
        this.vertices.push(0);
        this.vertices.push(0);
        this.vertices.push(0); 

        //Indices
        this.indices.push(indice); 
        this.indices.push(indice + 1); 
        this.indices.push(indice + 2); 

        indice += 3;

        //Normals
        this.normals.push(0);
        this.normals.push(0);
        this.normals.push(1);

        this.normals.push(0);
        this.normals.push(0);
        this.normals.push(1);

        this.normals.push(0);
        this.normals.push(0);
        this.normals.push(1);

        //Texture coordinates
        this.texCoords.push(0.5 + 0.5 * Math.cos(angle_now - angle), 0.5 + 0.5 * Math.sin(angle_now - angle));
        this.texCoords.push(0.5 + 0.5 * Math.cos(angle_now), 0.5 + 0.5 * Math.sin(angle_now));
        this.texCoords.push(0.5, 0.5);
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();

};