class Box {
    constructor(scene, width, height, depth) {
        CGFobject.call(this, scene);
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        for(i = 0; i < 6; i++){
            this.vertices.push(0,0,z);
            this.vertices.push(this.width,0,z);
            this.vertices.push(this.width,this.height,z);
            this.vertices.push(0,this.height,z);
        }
        let backnormal = [0,0,-1];
        let frontnormal = [0,0,1];
        let leftnormal = [-1,0,0];
        let rightnormal = [1,0,0];
        let topnormal = [0,1,0];
        let bottomnormal = [0,-1,0];
        this.normals.push(backnormal,backnormal,backnormal,backnormal);
        this.normals.push(frontnormal,frontnormal,frontnormal,frontnormal);
        this.normals.push(bottomnormal,bottomnormal,topnormal,topnormal);
        this.normals.push(bottomnormal,bottomnormal,topnormal,topnormal);
        this.normals.push(leftnormal,rightnormal,rightnormal,leftnormal);
        this.normals.push(leftnormal,rightnormal,rightnormal,leftnormal);
        this.indices.push(2,1,0,0,3,2); //backface
        this.indices.push(4,5,6,4,6,7); //frontface
        this.indices.push(7,6,2,7,2,3); //topface
        this.indices.push(1,5,4,1,4,0); //bottomface
        this.indices.push(1,2,6,1,6,5); //rightface
        this.indices.push(0,7,3,0,4,7); //leftface
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
};

Box.prototype = Object.create(CGFobject.prototype);
Box.prototype.constructor = Box;

