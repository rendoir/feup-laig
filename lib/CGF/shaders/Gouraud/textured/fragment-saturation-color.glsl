#ifdef GL_ES
precision highp float;
#endif

varying vec4 vFinalColor;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform bool uUseTexture;

//Pulse
uniform float time_factor;
uniform vec4 saturation_color;

void main() {
	float ranged_time_factor;

	if(time_factor == 0.0)
	  ranged_time_factor = 0.0;
	else
	  ranged_time_factor = (1.0 + time_factor) / 2.0;

	if (uUseTexture) {
	  vec4 textureColor = texture2D(uSampler, vTextureCoord);
	  gl_FragColor = mix(textureColor * vFinalColor, saturation_color, ranged_time_factor / 2.0);
	}
	else
	  gl_FragColor = mix(vFinalColor, saturation_color, ranged_time_factor / 2.0);
}