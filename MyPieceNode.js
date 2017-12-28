class MyPieceNode extends MyGraphNode{
    constructor(nodeID,position,type) {
        super(nodeID);
        this.type = type;
        this.position = position;
        this.isPickable = true;
        this.moveToPosition();
    }

    moveToPosition() {
        let newPosVec = vec3.fromValues(this.position.x + 0.5,0.01,this.position.y + 0.5);
        mat4.fromTranslation(this.transformMatrix, newPosVec);
    }
    rotateInX(){
        let xAxis = vec3.fromValues(1,0,0);
        let rotationM = mat4.create();
        mat4.fromRotation(rotationM,-Math.PI/2,xAxis);
        mat4.multiply(this.transformMatrix, this.transformMatrix, rotationM);
    }

    initByModel(model) {
        this.children = model.children;
        this.leaves = model.leaves;
        this.textureID = model.textureID;
        this.display = model.display;
        this.class = model.class;
    }
}