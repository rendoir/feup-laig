function Nurbs(scene, degree_u, degree_v, control_vertices) {
    CGFobject.call(this, scene);
    this.degree_u = degree_u;
    this.degree_v = degree_v;
    this.control_vertices = control_vertices;
    this.object = null;
    this.initObject();
};

Nurbs.prototype = Object.create(CGFobject.prototype);
Nurbs.prototype.constructor = Nurbs;

Nurbs.prototype.initObject = function () {
    let knots_u = this.getKnotsVector(this.degree_u);
    let knots_v = this.getKnotsVector(this.degree_v);

    let nurbsSurface = new CGFnurbsSurface(this.degree_u, this.degree_v, knots_u, knots_v, this.control_vertices);

    getSurfacePoint = function (u, v) {
        return nurbsSurface.getPoint(u, v);
    };

    this.object = new CGFnurbsObject(this.scene, getSurfacePoint, 20, 20);
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
