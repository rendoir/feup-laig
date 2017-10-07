/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(scene, type, args_array, afs, aft) {
  this.primitive = null;
  this.type = type;
  this.args_array = args_array;
  this.scene = scene;
  this.afs = afs || 1;
  this.aft = aft || 1;
  if (this.type == 'sphere' || this.type == 'cylinder'){
    this.initSphereOrCylinder();
  }else{
    this.initRectangleOrTriangle(this.afs,this.aft);
  }
}


MyGraphLeaf.prototype.initSphereOrCylinder = function(){
  switch (this.type) {
    case "cylinder": {
      if(this.args_array.length == 5)
        this.primitive = new Cylinder(this.scene, parseFloat(this.args_array[0]), parseFloat(this.args_array[1]), parseFloat(this.args_array[2]),
                                      parseInt(this.args_array[3]), parseInt(this.args_array[4]));
      else console.log("Invalid arguments for a cylinder");
      break;
    }
    case "sphere": {
      if(this.args_array.length == 3)
        this.primitive = new Sphere(this.scene, parseFloat(this.args_array[0]), parseInt(this.args_array[1]), parseInt(this.args_array[2]));
      else console.log("Invalid arguments for a sphere");
      break;
    }
    default:
        console.log("Invalid Primitive, not a cylinder or sphere");
  }
}


/**
 * afs - amplification factor on s axis of the texture.
 * aft - amplification factor on t axis of the texture.
 */
MyGraphLeaf.prototype.initRectangleOrTriangle = function(afs,aft) {
  switch (this.type) {
    case "rectangle": {
        if(this.args_array.length == 4)
          this.primitive = new Rectangle(this.scene, [parseFloat(this.args_array[0]), parseFloat(this.args_array[1])],
                                         [parseFloat(this.args_array[2]), parseFloat(this.args_array[3])],
                                        afs,aft);
        else console.log("Invalid arguments for a rectangle");
      break;
    }
    case "triangle": {
      if(this.args_array.length == 9)
        this.primitive = new Triangle(this.scene, [parseFloat(this.args_array[0]), parseFloat(this.args_array[1]), parseFloat(this.args_array[2])],
                                      [parseFloat(this.args_array[3]), parseFloat(this.args_array[4]), parseFloat(this.args_array[5])],
                                      [parseFloat(this.args_array[6]), parseFloat(this.args_array[7]), parseFloat(this.args_array[8])],
                                      afs,aft);
      else console.log("Invalid arguments for a triangle");
      break;
    }
    default:
        console.log("Invalid Primitive, not a rectangle or triangle");
  }
}

MyGraphLeaf.prototype.display = function() {
  this.primitive.display();
}
