import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

import testTexture from './images/edge.jpg'
//import testTexture from './img/cable6.png'
//console.log(testTexture)
//const testT = testTexture
export default class Sketch {
	constructor(options) {
		this.container = options.domElement
		this.width = this.container.offsetWidth
		this.height = this.container.offsetHeight
		////:::::::::::::::::::::::::::::::: CAMERA + SCENE
		this.camera = new THREE.PerspectiveCamera(14, window.innerWidth / window.innerHeight, .00000001, 707);
		this.camera.position.z = 0.5;
		this.camera.position.y = 0.57;
		this.camera.position.x = -0.5;
		this.scene = new THREE.Scene();
		//////:::::::::::::::::::::::::::::::: RENDERER
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		this.renderer.setPixelRatio(window.devicePixelRatio)
		//this.renderer.setPixelRatio(2)
		this.container.appendChild(this.renderer.domElement);
		//////:::::::::::::::::::::::::::::::: CONTROLS
		this.controls = new OrbitControls(this.camera, this.renderer.domElement)

		this.time = 7
		this.resize()
		this.addObjects()
		this.render()
		this.setupResize()
	}

	resize() {
		this.width = this.container.offsetWidth
		this.height = this.container.offsetHeight
		this.renderer.setSize(this.width, this.height);
		this.camera.aspect = this.width / this.height
		this.camera.updateProjectionMatrix()
	}
	setupResize() {
		window.addEventListener('resize', this.resize.bind(this))
	}

	addObjects() {
		//this.geometry = new THREE.SphereGeometry(.21, 777, 77);
		this.geometry = new THREE.TetrahedronGeometry(0.21, 1);

		//console.log(this.geometry);
		this.material = new THREE.ShaderMaterial({
			//wireframe: true,
			uniforms: {
				time: { value: 0.7 },
				uTexture: { value: new THREE.TextureLoader().load(testTexture) },
				resolution: { value: new THREE.Vector2() }
			},
			vertexShader: vertex,
			fragmentShader: fragment,
		})

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.scene.add(this.mesh);
	}
	render() {
		this.time += 0.07
		this.material.uniforms.time.value = this.time

		this.mesh.rotation.x = this.time / 2000;
		this.mesh.rotation.y = this.time / 1000;
		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.render.bind(this))
	}
}
new Sketch({
	domElement: document.getElementById('script-container')
})
