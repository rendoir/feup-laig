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
            {
                this.initCylinder();
                break;
            }
        case "sphere":
            {
                this.initSphere();
                break;
            }
        case "rectangle":
            {
                this.initRectangle();
                break;
            }
        case "triangle":
            {
                this.initTriangle();
                break;
            }
        case "patch":
            {
                this.initPatch();
                break;
            }
        default:
            console.log("Invalid primitive");
    }
}

/**
 * Initializes and assigns a cylinder to this graph leaf.
 */
MyGraphLeaf.prototype.initCylinder = function() {
    if (this.args_array.length == 7)
        this.primitive = new Cylinder(this.scene, parseFloat(this.args_array[0]), parseFloat(this.args_array[1]), parseFloat(this.args_array[2]),
            parseInt(this.args_array[3]), parseInt(this.args_array[4]),
            parseInt(this.args_array[5]), parseInt(this.args_array[6]));
    else console.log("Invalid arguments for a cylinder");
};
/**
 * Initializes and assigns a sphere to this graph leaf.
 */
MyGraphLeaf.prototype.initSphere = function() {
    if (this.args_array.length == 3)
        this.primitive = new Sphere(this.scene, parseFloat(this.args_array[0]), parseInt(this.args_array[1]), parseInt(this.args_array[2]), this.afs, this.aft);
    else console.log("Invalid arguments for a sphere");
};

/**
 * Initializes and assigns a rectangle to this graph leaf.
 */
MyGraphLeaf.prototype.initRectangle = function() {
    if (this.args_array.length == 4)
        this.primitive = new Rectangle(this.scene, [parseFloat(this.args_array[0]), parseFloat(this.args_array[1])], [parseFloat(this.args_array[2]), parseFloat(this.args_array[3])],
            this.afs, this.aft);
    else console.log("Invalid arguments for a rectangle");
};

/**
 * Initializes and assigns a Triangle to this graph leaf.
 */
MyGraphLeaf.prototype.initTriangle = function() {
    if (this.args_array.length == 9)
        this.primitive = new Triangle(this.scene, [parseFloat(this.args_array[0]), parseFloat(this.args_array[1]), parseFloat(this.args_array[2])], [parseFloat(this.args_array[3]), parseFloat(this.args_array[4]), parseFloat(this.args_array[5])], [parseFloat(this.args_array[6]), parseFloat(this.args_array[7]), parseFloat(this.args_array[8])],
            this.afs, this.aft);
    else console.log("Invalid arguments for a triangle");
};

/**
 * Initializes and assigns a patch to this graph leaf.
 */
MyGraphLeaf.prototype.initPatch = function() {
    const degree_u = parseInt(this.args_array[0]);
    const degree_v = parseInt(this.args_array[1]);
    let control_vertices = this.args_array[2];
    this.primitive = new Nurbs(this.scene, degree_u, degree_v, control_vertices);
};

/**
 * Calls the display of the primitive associated with this graph leaf.
 */
MyGraphLeaf.prototype.display = function() {
    this.primitive.display();
};

MyGraphLeaf.prototype.displayOutline = function() {
    this.primitive.displayOutline();
};