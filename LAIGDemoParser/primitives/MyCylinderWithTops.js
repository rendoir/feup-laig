function MyCylinderWithTops(scene, slices, stacks,radius) {
	CGFobject.call(this,scene);
	this.radius = radius || 1;

	this.cylinder = new MyCylinder(this.scene,slices,stacks,this.radius);
	this.circle = new MyCircle(this.scene,slices,0,1,0,1,this.radius);
};

MyCylinderWithTops.prototype = Object.create(CGFobject.prototype);
MyCylinderWithTops.prototype.constructor=MyCylinderWithTops;

MyCylinderWithTops.prototype.display = function(){
	this.scene.pushMatrix();
		this.cylinder.display();
		this.scene.pushMatrix();
			this.scene.translate(0,0,1);
			this.circle.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI,1,0,0);
			this.circle.display();
		this.scene.popMatrix();

	this.scene.popMatrix();
}