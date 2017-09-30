/**
 * SemiSphere
 * @constructor
 */
function SemiSphere(scene, slices, stacks, radius) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.radius = radius || 1;
    this.initBuffers();
};

SemiSphere.prototype = Object.create(CGFobject.prototype);
SemiSphere.prototype.constructor = SemiSphere;

SemiSphere.prototype.initBuffers = function() {
    /*
     * TODO:
     * Replace the following lines in order to build a Cylinder with a **single mesh**.
     *
     * How can the vertices, indices and normals arrays be defined to
     * build a prism with varying number of slices and stacks?
     */

    var angle = (2 * Math.PI) / this.slices;

    //console.log("Angle: " + angle);

    //console.log("Number Of Slices " + this.slices);
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    var diameter = 2 * this.radius;
    for (stack = 0; stack <= this.stacks; stack++) {
        h = this.radius * Math.sqrt(stack / this.stacks);
        sub_radius = Math.sqrt((this.radius * this.radius) - (h * h));
        for (i = 0; i <= this.slices; i++) {
            var x = Math.cos(i * angle) * sub_radius;
            var y = Math.sin(i * angle) * sub_radius;
            //Vertice 0
            this.vertices.push(x, y, h);
            //Add Normals
            this.normals.push(x, y, h);
            //New Mode

            this.texCoords.push((x + this.radius) / (diameter), (-y + this.radius) / (diameter));

        }
    }
    for (stack = 0; stack < this.stacks; stack++) {
        stack_const = this.slices + 1;
        for (i = 0; i < this.slices; i++) {
            this.indices.push(i + (stack * stack_const), (i + 1) + (stack * stack_const), i + 1 + this.slices + (stack * stack_const));
            this.indices.push(i + 1 + (stack * stack_const), (i + this.slices + 2) + (stack * stack_const), i + this.slices + 1 + (stack * stack_const));
        }
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};