class UIElement {
  constructor(scene, vertices, text_coords, indices, texture_path) {
    this.scene = scene;
    this.vertices = vertices;
    this.text_coords = text_coords;
    this.indices = indices;
    this.texture = new CGFtexture(this.scene, "./scenes/" + texture_path);
    this.init();
  }

  init() {
    let gl = this.scene.gl;

    this.vertsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    this.indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

    this.texCoordsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.text_coords), gl.STATIC_DRAW);

    this.indicesBuffer.numValues = this.indices.length;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  render() {
    let shader = this.scene.activeShader;
    let gl = this.scene.gl;

    gl.enableVertexAttribArray(shader.attributes.aVertexPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertsBuffer);
    gl.vertexAttribPointer(shader.attributes.aVertexPosition, 2, gl.FLOAT, false, 0, 0);

    this.texture.bind();
    gl.enableVertexAttribArray(shader.attributes.aTextureCoord);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordsBuffer);
    gl.vertexAttribPointer(shader.attributes.aTextureCoord, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
    gl.drawElements(this.scene.gl.TRIANGLES, this.indicesBuffer.numValues, gl.UNSIGNED_SHORT, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    this.scene.enableTextures(true);
  }
}
