attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

void main() {
  vTextureCoord = aTextureCoord;
  gl_Position = uPMatrix * vertex;
}
