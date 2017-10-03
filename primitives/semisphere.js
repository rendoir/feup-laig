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
    var angle = (2 * Math.PI) / this.slices;

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

            this.vertices.push(x, y, h);
            this.normals.push(x, y, h);
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
