#ifdef GL_ES
precision highp float;
#endif

varying vec4 selected_color;

void main() {
	gl_FragColor = selected_color;
}
