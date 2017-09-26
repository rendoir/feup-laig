/**
 * Triangle
 * @constructor
 */
function Triangle(scene,args) {
    CGFobject.call(this, scene);
	this.v1 = [args[0],args[1],args[2]];
	this.v2 = [args[3],args[4],args[5]];
	this.v3 = [args[6],args[7],args[8]];
    this.initBuffers();
};

Triangle.prototype = Object.create(CGFobject.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
	this.normals = [];
	let v1=this.v1;
	let v2=this.v2;
	let v3=this.v3;

    this.vertices.push(v1);
    this.vertices.push(v2);
    this.vertices.push(v3);

    this.indices.push(0, 1, 2);

	// Normals need to be fixed
	/*
    this.normals.push(0, 1, 0);
    this.normals.push(0, 1, 0);
    this.normals.push(0, 1, 0);*/
	//To calculate the normal, get 2 vectors of the plane and make the cross product between them
	let v12 = [v2[0]-v1[0],v2[1]-v1[1],v2[2]-v1[2]];
	let v13 = [v3[0]-v1[0],v3[1]-v1[1],v3[2]-v1[2]];
	let normalVector = [
		v12[1]*v13[2] - v12[2]*v13[1],
		v12[2]*v13[0] - v12[0]*v13[2],
		v12[0]*v13[1] - v12[1]*v13[0]
		];
	this.normals.push(normalVector);
	this.normals.push(normalVector);
	this.normals.push(normalVector);

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};