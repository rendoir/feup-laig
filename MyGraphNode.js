class MyGraphNode {
    constructor(nodeID) {
        this.nodeID = nodeID;
        this.children = [];
        this.leaves = [];
        this.materialID = null;
        this.textureID = null;
        this.animation = null;
        this.initialTimestamp = -1;
        this.rgba = null;
        this.time_range = null;
        this.display = true;
        this.isPickable = false;
        this.class = null;
        this.animationMatrix = mat4.create();
        this.transformMatrix = mat4.create();
    }
    addChild(nodeID) {
        this.children.push(nodeID);
    }
    addLeaf(leaf) {
        this.leaves.push(leaf);
    }
    update(currTime) {
        if (this.animation != null) {
            if (this.initialTimestamp == -1)
                this.initialTimestamp = currTime;
            let deltaTime = (currTime - this.initialTimestamp) / 1000;
            this.animationMatrix = this.animation.getMatrix(deltaTime);
        }
    }
}



