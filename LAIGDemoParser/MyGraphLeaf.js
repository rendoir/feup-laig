/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
 **/

function MyGraphLeaf(scene, leafObject) {
	this.leafObject = leafObject;
}

MyGraphLeaf.prototype.display = function() {
    this.leafObject.display();
}