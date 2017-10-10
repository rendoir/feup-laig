function Nurbs(scene, div_u, div_v, control_vertices) {
    CGFobject.call(this, scene);
    this.div_u = div_u;
    this.div_v = div_v;
    this.control_vertices = control_vertices;
    this.object = null;
    this.initObject();
};

Nurbs.prototype = Object.create(CGFobject.prototype);
Nurbs.prototype.constructor = Nurbs;

Nurbs.prototype.initObject = function () {
    let degree_u = this.control_vertices.length - 1;
    let degree_v = this.control_vertices[0].length - 1;
    let knots_u = this.getKnotsVector(degree_u);
    let knots_v = this.getKnotsVector(degree_v);

    let nurbsSurface = new CGFnurbsSurface(degree_u, degree_v, knots_u, knots_v, this.control_vertices);

    getSurfacePoint = function (u, v) {
        return nurbsSurface.getPoint(u, v);
    };

    this.object = new CGFnurbsObject(this.scene, getSurfacePoint, this.div_u, this.div_v);
}

Nurbs.prototype.getKnotsVector = function (degree) {
    var v = new Array();
    for (var i = 0; i <= degree; i++) {
        v.push(0);
    }
    for (var i = 0; i <= degree; i++) {
        v.push(1);
    }
    return v;
}

Nurbs.prototype.display = function() {
    this.object.display();
}
