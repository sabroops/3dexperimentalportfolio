import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// import { ArrayCamera } from 'three';

// 1. Scene
const scene = new THREE.Scene();

//2. Camera : Field of View, Aspect Ratio (based off browser windw), View Frustrum - what obj visible
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//3. Renderer; needs dom elemend


const renderer = new THREE.WebGLRenderer({
  canvas: <HTMLCanvasElement> document.querySelector('#bg'), //BRUH Ask krischin about syntax
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30); // move along z axis; better persp. w shapes

renderer.render(scene, camera); // render

const geometry = new THREE.TorusGeometry(10, 3, 16,100);
const material = new THREE.MeshStandardMaterial({color:0xFF69B4});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(5,5,5);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh (geometry, material);

  const [x,y,z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100) );
  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill(0).forEach(addStar);

function animate() {
  requestAnimationFrame( animate);
  torus.rotation.x += .01;
  torus.rotation.y += .005;
  torus.rotation.z += .01;

  controls.update();

  renderer.render(scene, camera);
}

animate()