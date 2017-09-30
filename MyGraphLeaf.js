/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlLeaf) {
  this.primitive = null;
  this.graph = graph;
  this.scene = graph.scene;
  this.initPrimitive(xmlLeaf);
}

MyGraphLeaf.prototype.initPrimitive = function(xmlLeaf) {
  var type = this.graph.reader.getItem(xmlLeaf, 'type', ['rectangle', 'cylinder', 'sphere', 'triangle']);
  var args_string = this.graph.reader.getString(xmlLeaf,'args');
  var args_array = args_string.split(" ");

  switch (type) {
    case "rectangle": {
        if(args_array.length == 4)
          this.primitive = new Rectangle(this.scene, [parseFloat(args_array[0]), parseFloat(args_array[1])],
                                         [parseFloat(args_array[2]), parseFloat(args_array[3])]);
        else console.log("Invalid arguments for a rectangle");
      break;
    }

    case "cylinder": {
      if(args_array.length == 5)
        this.primitive = new Cylinder(this.scene, parseFloat(args_array[0]), parseFloat(args_array[1]), parseFloat(args_array[2]),
                                      parseInt(args_array[3]), parseInt(args_array[4]));
      else console.log("Invalid arguments for a cylinder");
      break;
    }

    case "sphere": {
      if(args_array.length == 3)
        this.primitive = new Sphere(this.scene, parseFloat(args_array[0]), parseInt(args_array[1]), parseInt(args_array[2]));
      else console.log("Invalid arguments for a sphere");
      break;
    }

    case "triangle": {
      if(args_array.length == 9)
        this.primitive = new Triangle(this.scene, [parseFloat(args_array[0]), parseFloat(args_array[1]), parseFloat(args_array[2])],
                                      [parseFloat(args_array[3]), parseFloat(args_array[4]), parseFloat(args_array[5])],
                                      [parseFloat(args_array[6]), parseFloat(args_array[7]), parseFloat(args_array[8])]);
      else console.log("Invalid arguments for a triangle");
      break;
    }
    default:
        console.log("Invalid primitive");
  }
}

MyGraphLeaf.prototype.display = function() {
  this.primitive.display();
}
