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

  switch (this.type) {
      case "cylinder":
          this.initCylinder();
          break;
      case "sphere":
          this.initSphere();
          break;
      case "rectangle":
          this.initRectangle();
          break;
      case "triangle":
          this.initTriangle();
          break;
      case "patch":
          this.initPatch();
          break;
      default:
          console.log("Invalid primitive");
  }
}

MyGraphLeaf.prototype.initCylinder = function () {
    if (this.args_array.length == 5)
        this.primitive = new Cylinder(this.scene, parseFloat(this.args_array[0]), parseFloat(this.args_array[1]), parseFloat(this.args_array[2]),
                                      parseInt(this.args_array[3]), parseInt(this.args_array[4]));
    else console.log("Invalid arguments for a cylinder");
}

MyGraphLeaf.prototype.initSphere = function () {
    if (this.args_array.length == 3)
        this.primitive = new Sphere(this.scene, parseFloat(this.args_array[0]), parseInt(this.args_array[1]), parseInt(this.args_array[2]));
    else console.log("Invalid arguments for a sphere");
}

MyGraphLeaf.prototype.initRectangle = function () {
    if (this.args_array.length == 4)
        this.primitive = new Rectangle(this.scene, [parseFloat(this.args_array[0]), parseFloat(this.args_array[1])],
                                       [parseFloat(this.args_array[2]), parseFloat(this.args_array[3])],
                                       afs, aft);
    else console.log("Invalid arguments for a rectangle");
}

MyGraphLeaf.prototype.initTriangle = function () {
    if (this.args_array.length == 9)
        this.primitive = new Triangle(this.scene, [parseFloat(this.args_array[0]), parseFloat(this.args_array[1]), parseFloat(this.args_array[2])],
                                      [parseFloat(this.args_array[3]), parseFloat(this.args_array[4]), parseFloat(this.args_array[5])],
                                      [parseFloat(this.args_array[6]), parseFloat(this.args_array[7]), parseFloat(this.args_array[8])],
                                      afs, aft);
    else console.log("Invalid arguments for a triangle");
}

MyGraphLeaf.prototype.initPatch = function () {
    var degree_u = parseInt(this.args_array[0]);
    var degree_v = parseInt(this.args_array[1]);
    var control_vertices = this.args_array[2];
    /* NO NEED FOR THIS IF ALREADY DONE IN THE PARSER (WHERE IT SHOULD BE DONE)
    var control_vertices = new Array(); //Contains degree_u lines of degree_v 4D points
    for (var i = 0; i < degree_u; i++) {
        var control_point_line = new Array(); //Contains 1 line of degree_v 4D points
        for (var j = 0; j < degree_v; j++) {
            var control_point = new Array(); //Contains 1 4D point
            control_point.push(this.args_array[2][i][j][0]); //x
            control_point.push(this.args_array[2][i][j][1]); //y
            control_point.push(this.args_array[2][i][j][2]); //z
            control_point.push(this.args_array[2][i][j][3]); //w
            control_point_line.push(control_point);
        }
        control_vertices.push(control_point_line);
    }*/
    this.primitive = new Nurbs(this.scene, degree_u, degree_v, control_vertices);
}

MyGraphLeaf.prototype.display = function() {
  this.primitive.display();
}
