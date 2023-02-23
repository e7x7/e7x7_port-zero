import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

import testTexture from './images/edgestars.jpg'
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
		this.camera.position.z = -0.5;
		this.camera.position.y = -0.585;
		this.camera.position.x = 0.5;
		this.scene = new THREE.Scene();

		//////:::::::::::::::::::::::::::::::: RENDERER
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		this.renderer.setPixelRatio(window.devicePixelRatio)
		//this.renderer.setPixelRatio(2)
		this.container.appendChild(this.renderer.domElement);
		//////:::::::::::::::::::::::::::::::: CONTROLS
		this.controls = new OrbitControls(this.camera, this.renderer.domElement)

		this.time = 0
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
		//////:::::::::::::::::::::::::::::::: LOADER
		const home = document.getElementById('home');
		const container2 = document.getElementById('container2');
		const container3 = document.getElementById('container3');
		//
		const loadingScreen = document.getElementById('loading-screen');
		// LOADING MANAGER
		const loadingManager = new THREE.LoadingManager();
		// FUNCTIONS
		function fadeout() {
			loadingScreen.classList.add('fade-out');
		}
		function displayout() {
			loadingScreen.style['display'] = "none"
			container2.style['display'] = 'block';
			container3.style['display'] = 'block';
			home.style['display'] = 'flex';
		}
		// useFUNCTIONS in LOADING MANAGER
		loadingManager.onStart = function () {
			console.log("sphere loading...");
			setTimeout(fadeout, 1477)
		}
		loadingManager.onLoad = function () {
			setTimeout(displayout, 3577)
			console.log("hello sphere :)");
			console.log("♡☆♡◭♡☆♡");
			loadingScreen.addEventListener('transitionend', onTransitionEnd);
		}
		//
		//////:::::::::::::::::::::::::::::::: OBJECT
		// geometry + (shader)material = mesh
		// => Xscene.add(Xmesh)
		this.geometry = new THREE.TetrahedronGeometry(0.21, 1);
		//this.geometry = new THREE.SphereGeometry(.21, 777, 77);
		console.log('hello, meet my sphere:');
		console.log(this.geometry);
		//
		this.material = new THREE.ShaderMaterial({
			//wireframe: true,
			uniforms: {
				time: { value: 7 },
				uTexture: { value: new THREE.TextureLoader(loadingManager).load(testTexture) },
				resolution: { value: new THREE.Vector2() }
			},
			vertexShader: vertex,
			fragmentShader: fragment,
		})

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.scene.add(this.mesh);
	}
	render() {
		this.time += 0.049
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
// REMOVE LOADER FROM DOM
function onTransitionEnd(event) {
	event.target.remove();
	console.log('loadingscreen "vanished"')
}