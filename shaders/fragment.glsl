uniform float time;
uniform sampler2D uTexture;

varying float pulse;
varying vec2 vUv;
varying vec3 vNormal;

void main(){
			//gl_FragColor = vec4(1.,0.,1.,pulse);
			vec4 myimage = texture(
				uTexture,
				vUv + 0.07*sin(vUv/3.0 * time)
			);
			//gl_FragColor = vec4(vUv,1.,1.);
			float sinePulse = (0.7 + sin(vUv.y*1.0 + (time*1.0)))*0.5;
			gl_FragColor = vec4(sinePulse,0.0,1.0,1.0);
			gl_FragColor = myimage;
			//gl_FragColor = vec4(0.0,(pulse + 0.777),0.7,1.0);

}