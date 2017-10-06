/**
 * Sphere
 * @constructor
 */
function Sphere(scene, radius, slices, stacks) {
    CGFobject.call(this, scene);
    this.radius = radius;
    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
};

Sphere.prototype = Object.create(CGFobject.prototype);
Sphere.prototype.constructor = Sphere;

Sphere.prototype.initBuffers = function() {
   this.vertices  = [];
   this.indices   = [];
   this.normals   = [];
   this.texCoords = [];

    var phi = 0.0;
    var theta = 0.0;

    for(var stack = 0; stack <= this.stacks; stack++) {
      var y = this.radius * Math.cos(phi);
      var v = 1 - (stack / this.stacks);
      for(var slice = 0; slice <= this.slices; slice++) {
          var z = this.radius * Math.sin(phi) * Math.cos(theta);
          var x = this.radius * Math.sin(phi) * Math.sin(theta);
          var u = 1 - (slice / this.slices);
          this.vertices.push(x, y, z);
          this.normals.push(x, y, z);
          this.texCoords.push(u, v);
          theta += 2 * Math.PI / this.slices;
      }
      theta = 0.0;
      phi += Math.PI / this.stacks;
    }

    for(var stack = 0; stack < this.stacks; stack++) {
      for(var slice = 0; slice < this.slices; slice++) {
        var i1 = slice + stack * (this.slices + 1);
        var i2 = slice + stack * (this.slices + 1) + 1;
        var i3 = slice + (stack + 1) * (this.slices + 1);
        var i4 = slice + (stack + 1) * (this.slices + 1) + 1;
        this.indices.push(i1, i3, i4);
        this.indices.push(i4, i2, i1);
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
