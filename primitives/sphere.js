/**
 * Sphere
 * @constructor
 */
function Sphere(scene, radius, slices, stacks) {
    CGFobject.call(this, scene);
    this.radius = radius;
    this.slices = slices;
    this.stacks = stacks;
    this.semisphere = new SemiSphere(scene, slices, stacks, radius);
};

Sphere.prototype = Object.create(CGFobject.prototype);
Sphere.prototype.constructor = Sphere;

Sphere.prototype.display = function() {
    this.scene.pushMatrix();
    this.scene.scale(this.radius, this.radius, this.radius);
    this.semisphere.display();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.semisphere.display();
    this.scene.popMatrix();
};
