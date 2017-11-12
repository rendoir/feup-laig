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
    this.animation_matrix = null;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);
}

MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
};

MyGraphNode.prototype.addLeaf = function(leaf) {
    this.leaves.push(leaf);
};

MyGraphNode.prototype.update = function(deltaTime) {
    if (this.animation != null) {
        this.animation_matrix = this.animation.getMatrix(deltaTime);
        this.transformMatrix = mat4.asMul(this.transformMatrixm, this.animation_matrix);
    }

    //just for tests
    let matrix = mat4.create();
    mat4.rotateY(matrix, matrix, 1 * DEGREE_TO_RAD);
    //just for tests
    mat4.multiply(this.transformMatrix, matrix, this.transformMatrix);
};