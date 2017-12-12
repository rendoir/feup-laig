class MySoldierNode extends MyGraphNode{
    constructor(nodeID,position){
        super(nodeID);
        this.position = position;
        this.transform();
        this.display = true;
        this.isPickable = true;
    }
    transform(){
        let newPosVec = vec3.fromValues(this.position.x + 0.5,0,this.position.y + 0.5);
        mat4.fromTranslation(this.transformMatrix,newPosVec);
    }
}