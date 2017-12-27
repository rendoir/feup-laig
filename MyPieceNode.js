class MyPieceNode extends MyGraphNode{
    constructor(nodeID,position,type) {
        super(nodeID);
        this.type = type;
        this.position = position;
        this.transform();
        this.display = true;
        this.isPickable = true;
        this.class = "piece";
    }

    transform() {
        let newPosVec = vec3.fromValues(this.position.x + 0.5,0,this.position.y + 0.5);
        mat4.fromTranslation(this.transformMatrix, newPosVec);
        this.world_position = mat4.getTranslation(vec4.create(), this.transformMatrix);

        //TODO Remove - Testing
        let control_points = [
            [this.world_position[0], this.world_position[1], this.world_position[2]],
            [this.world_position[0], 10, this.world_position[2]],
            [8, 10, 8],
            [8, this.world_position[1], 8]
        ]
        this.animation = new BezierAnimation(5, control_points);
    }

    initByModel(model) {
        this.children = model.children;
        this.leaves = model.leaves;
        this.materialID = model.materialID;
        this.textureID = model.textureID;
    }
}