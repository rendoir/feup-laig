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

	vec3 pulse_color = vec3(saturation_color) * time_factor;

	if (uUseTexture)
	{
		vec4 textureColor = texture2D(uSampler, vTextureCoord);
		gl_FragColor = textureColor * vFinalColor  + vec4(pulse_color, saturation_color.a);
	}
	else
		gl_FragColor = vFinalColor + vec4(pulse_color, saturation_color.a);

}