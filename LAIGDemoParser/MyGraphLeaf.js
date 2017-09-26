/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
 **/

function MyGraphLeaf(graph, xmlelem) {
    this.graph = graph;

    this.type = graph.reader.getItem(xmlelem, 'type', ['rectangle', 'cylinder', 'sphere', 'triangle']);

    switch (this.type) {
        case 'rectangle':
            this.element = new Rectangle(this.graph.scene);
            break;
        case 'cylinder':
            this.element = new Cylinder(this.graph.scene, 12, 12);
            break;
        case 'sphere':
            this.element = new Sphere(this.graph.scene);
            break;
        case 'triangle':
            this.element = new Triangle(this.graph.scene);
            break;
    }
}

MyGraphLeaf.prototype.display = function() {
    this.element.display();
}