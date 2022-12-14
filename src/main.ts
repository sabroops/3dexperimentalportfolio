import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// import { ArrayCamera } from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { FloatType } from 'three';

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
const material2 = new THREE.MeshStandardMaterial({color:0x81aed9, wireframe:true}); //35b5ac

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

// const jadeTexture = new THREE.TextureLoader().load('src/jade.jpg'); //#81aed9
const jadeTexture = new THREE.Color(0x81aed9); //#81aed9
scene.background = jadeTexture;

// const catburgTexture = new THREE.TextureLoader().load('src/catburg.jpeg');

// const catburg = new THREE.Mesh(
//   new THREE.BoxGeometry(5,5,5),
//   new THREE.MeshBasicMaterial({map: catburgTexture})
// );

// catburg.position.set(10, 0, 0);

// scene.add(catburg);

// const neptuneTexture = new THREE.TextureLoader().load('src/neptunemap.jpeg');

// const neptune = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial( {
//     map: neptuneTexture,
//   })
// );

// neptune.position.z = 30; // can use equals to assign
// neptune.position.setX(-10); // or use setter function!

// scene.add(neptune);

let bmo: THREE.Group | THREE.Object3D<THREE.Event>;
const loader = new GLTFLoader();
loader.load(
    'src/bmo/scene.gltf',
    ( gltf ) => {
        // called when the resource is loaded
        bmo = gltf.scene;
        bmo.rotation.y = Math.PI;
        bmo.position.x = -10;
        bmo.position.y = -10;
        bmo.position.z = -30;
        scene.add( bmo );
    },
    ( xhr ) => {
        // called while loading is progressing
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
    },
    ( error ) => {
        // called when loading has errors
        console.error( 'An error happened', error );
    },
);

let cookiecat: THREE.Group | THREE.Object3D<THREE.Event>;
const loader2 = new GLTFLoader();
loader2.load(
    'src/cookiecat/scene.gltf',
    ( gltf ) => {
        // called when the resource is loaded
        cookiecat = gltf.scene;
        cookiecat.scale.set(.01,.01,.01);
        cookiecat.rotation.y = Math.PI;
        cookiecat.position.set(9,5,5);
        scene.add( cookiecat );
    },
    ( xhr ) => {
        // called while loading is progressing
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
    },
    ( error ) => {
        // called when loading has errors
        console.error( 'An error happened', error );
    },
);

let puppycat: THREE.Group | THREE.Object3D<THREE.Event>;
const loader3 = new GLTFLoader();
loader3.load(
    'src/puppycat/scene.gltf',
    ( gltf ) => {
        // called when the resource is loaded
        puppycat = gltf.scene;
        puppycat.scale.set(.011,.011,.011);
        puppycat.rotation.set(-Math.PI/6,0,0);
        puppycat.position.set(0,-2,42);
        scene.add( puppycat );
    },
    ( xhr ) => {
        // called while loading is progressing
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
    },
    ( error ) => {
        // called when loading has errors
        console.error( 'An error happened', error );
    },
);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top; // dim of viewport

  // neptune.rotation.x += .005;
  // neptune.rotation.y += .0075;
  // neptune.rotation.z += .005;

  cookiecat.rotation.y += .02;
  cookiecat.rotation.z += .01;

  camera.position.z = t * -.01;
  camera.position.x = t * -.0002;
  camera.position.y = t * -.0002;


}

// var tlLogo = new TimelineMax({paused: true});
// tlLogo.to('#logo>path',1,{stroke:'#ff6600'});
// tlLogo.to('#logo g path',1,{fill:'#ff6600'},'-=1');


// document.addEventListener("scroll", onScroll);

// function onScroll() {
//   var scrollY = window.pageYOffset || 0;
//   tlLogo.tweenTo(scrollY/1000);
// }

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame( animate);
  torus.rotation.x += .0002;
  torus.rotation.y += .0007;
  torus.rotation.z += .0002;

  torus2.rotation.x += -.001;
  torus2.rotation.y += .0005;
  torus2.rotation.z += .001;

  bmo.rotation.x += .0005;
  bmo.rotation.y += .00004;
  bmo.rotation.z += .000025;

  controls.update();

  renderer.render(scene, camera);
}

animate()