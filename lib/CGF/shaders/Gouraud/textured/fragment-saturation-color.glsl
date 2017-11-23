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

	if (uUseTexture)
	{
		vec4 textureColor = texture2D(uSampler, vTextureCoord);
		gl_FragColor = mix(textureColor * vFinalColor, saturation_color, abs(time_factor));
	}
	else
		gl_FragColor = mix(vFinalColor, saturation_color, abs(time_factor));

}