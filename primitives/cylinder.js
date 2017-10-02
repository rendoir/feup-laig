/**
 * Cylinder
 * @constructor
 */
function Cylinder(scene, height, bottom_radius, top_radius, stacks, slices, has_caps) {
    CGFobject.call(this, scene);

    this.height = height;
    this.has_caps = has_caps || false;
    this.body = new CylinderBody(this.scene, bottom_radius, top_radius, slices, stacks);

    if(has_caps) {
       this.bottom_cap = new Circle(this.scene, slices, bottom_radius);
       this.top_cap    = new Circle(this.scene, slices, top_radius);
    }
};

Cylinder.prototype = Object.create(CGFobject.prototype);
Cylinder.prototype.constructor = Cylinder;

Cylinder.prototype.display = function() {
    this.scene.pushMatrix();
      this.scene.scale(1, 1, this.height);
      this.body.display();
      if (this.has_caps) {
          this.scene.pushMatrix();
            this.scene.translate(0, 0, 1);
            this.top_cap.display();
          this.scene.popMatrix();
          this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 1, 0, 0);
            this.bottom_cap.display();
          this.scene.popMatrix();
      }
    this.scene.popMatrix();
}

/**
 * CylinderBody
 * @constructor
 */
function CylinderBody(scene, bottom_radius, top_radius, slices, stacks) {
    CGFobject.call(this, scene);

    this.bottom_radius = bottom_radius;
    this.top_radius = top_radius;
    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
};

CylinderBody.prototype = Object.create(CGFobject.prototype);
CylinderBody.prototype.constructor = CylinderBody;

CylinderBody.prototype.initBuffers = function() {
    var angle = (2 * Math.PI) / this.slices;

    this.vertices  = [];
    this.indices   = [];
    this.normals   = [];
    this.texCoords = [];

    for (stack = 0; stack <= this.stacks; stack++) {
      var radius = (this.top_radius - this.bottom_radius)*(stack / this.stacks) + this.bottom_radius;
        for (slice = 0; slice <= this.slices; slice++) {
            this.vertices.push(Math.cos(slice * angle) * radius, Math.sin(slice * angle) * radius, stack / this.stacks);
            this.normals.push(Math.cos(slice * angle), Math.sin(slice * angle), 0);
            this.texCoords.push(slice / this.slices, stack / this.stacks);
        }
    }

    var stack_const = this.slices + 1;
    for (stack = 0; stack < this.stacks; stack++) {
        for (slice = 0; slice < this.slices; slice++) {
            this.indices.push(slice + (stack * stack_const), slice + 1 + (stack * stack_const), slice + this.slices + 1 + (stack * stack_const));
            this.indices.push(slice + 1 + (stack * stack_const), (slice + this.slices + 2) + (stack * stack_const), slice + this.slices + 1 + (stack * stack_const));
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
