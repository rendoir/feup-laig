/**
 * Sphere
 * @constructor
 */
function Sphere(scene, radius, slices, stacks) {
    CGFobject.call(this, scene);
    this.radius = radius || 1;
    this.slices = slices || 16;
    this.stacks = stacks || 16;
    this.semisphere = new SemiSphere(scene, slices, stacks, radius);
};

Sphere.prototype = Object.create(CGFobject.prototype);
Sphere.prototype.constructor = Sphere;

Sphere.prototype.display = function() {
    this.scene.pushMatrix();
    this.semisphere.display();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.semisphere.display();
    this.scene.popMatrix();
};