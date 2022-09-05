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

const geometry = new THREE.TorusGeometry(15, 2, 16,100);
const material = new THREE.MeshStandardMaterial({color:0xffffff, wireframe: true}); //35b5ac

const torus = new THREE.Mesh(geometry, material);
const material2 = new THREE.MeshStandardMaterial({color:0x35b5ac, wireframe:true}); //35b5ac

const geo2 = new THREE.TorusGeometry(50, 1, 16, 100);
const torus2 = new THREE.Mesh(geo2, material2);

scene.add(torus, torus2);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(5,5,5);

scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

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

const jadeTexture = new THREE.TextureLoader().load('src/jade.jpg');
scene.background = jadeTexture;

const catburgTexture = new THREE.TextureLoader().load('src/catburg.jpeg');

const catburg = new THREE.Mesh(
  new THREE.BoxGeometry(5,5,5),
  new THREE.MeshBasicMaterial({map: catburgTexture})
);

catburg.position.set(10, 0, 0);

scene.add(catburg);

const neptuneTexture = new THREE.TextureLoader().load('src/neptunemap.jpeg');

const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: neptuneTexture,
  })
);

neptune.position.z = 30; // can use equals to assign
neptune.position.setX(-10); // or use setter function!

scene.add(neptune);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top; // dim of viewport

  neptune.rotation.x += .05;
  neptune.rotation.y += .075;
  neptune.rotation.z += .05;

  catburg.rotation.y += .02;
  catburg.rotation.z += .01;

  camera.position.z = t * -.01;
  camera.position.x = t * -.0002;
  camera.position.y = t * -.0002;

}

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame( animate);
  torus.rotation.x += .002;
  torus.rotation.y += .0007;
  torus.rotation.z += .002;

  torus2.rotation.x += -.001;
  torus2.rotation.y += .0005;
  torus2.rotation.z += .001;

  controls.update();

  renderer.render(scene, camera);
}

animate()