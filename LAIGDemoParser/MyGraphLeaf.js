/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
 **/

function MyGraphLeaf(scene) {
    this.type = graph.reader.getItem(xmlelem, 'type', ['rectangle', 'cylinder', 'sphere', 'triangle']);

    switch (this.type) {
        case 'rectangle':
            this.element = new Rectangle(scene);
            break;
        case 'cylinder':
            this.element = new Cylinder(scene, 12, 12);
            break;
        case 'sphere':
            this.element = new Sphere(scene);
            break;
        case 'triangle':
            this.element = new Triangle(scene);
            break;
    }
}

MyGraphLeaf.prototype.display = function() {
    this.element.display();
}