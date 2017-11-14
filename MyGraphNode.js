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

    this.selected = true;

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
