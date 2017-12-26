class MyPieceNode extends MyGraphNode{
    constructor(nodeID,position,type){
        super(nodeID);
        this.type = type;
        this.position = position;
        this.transform();
        this.display = true;
        this.isPickable = true;
        this.class = "piece";
    }
    transform(){
        let newPosVec = vec3.fromValues(this.position.x + 0.5,0,this.position.y + 0.5);
        mat4.fromTranslation(this.transformMatrix,newPosVec);
    }
    initByModel(model){
        this.children = model.children;
        this.leaves = model.leaves;
        this.materialID = model.materialID;
        this.textureID = model.textureID;
    }
}