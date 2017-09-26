/**
 * MySphere
 * @constructor
 */
function MySphere(scene, slices, stacks, radius ) {
    CGFobject.call(this, scene);
    this.radius = radius || 1;
    this.slices = slices || 16;
    this.stacks = stacks || 16;
    this.Semisphere = new MySemiSphere(scene,slices,stacks,radius);
};

MySphere.prototype = Object.create(CGFobject.prototype);
MySphere.prototype.constructor = MySphere;

MySphere.prototype.display = function() {
    this.scene.pushMatrix();
        this.Semisphere.display();
        this.scene.rotate(Math.PI,0,1,0);
        this.Semisphere.display();
    this.scene.popMatrix();
};