/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
 **/

function MyGraphNode(nodeID) {
    this.nodeID = nodeID;

    this.children = [];

    this.leaves = [];

    this.materialID = null;

    this.textureID = null;

    this.animation = null;

    //this.animation = new CircularAnimation(5, 300, [0, 0, 0], 0, 360);
    /*this.animation = new BezierAnimation(0.1, [
        [0, 0, 0],
        [1, 0, 0],
        [1, 3, 0],
        [0, 3, 0]
    ]);*/

    this.animationMatrix = mat4.create();
    this.transformMatrix = mat4.create();
}

MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
};

MyGraphNode.prototype.addLeaf = function(leaf) {
    this.leaves.push(leaf);
};

MyGraphNode.prototype.update = function(deltaTime) {
    if (this.animation != null) {
        this.animationMatrix = this.animation.getMatrix(deltaTime / 1000);
    }
};