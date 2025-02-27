import * as THREE from 'three';
import { addGridToTheScene } from '/lib/grid.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { initializeAllEvents } from './lib/events.js';
import { generateHighlightMesh } from './lib/highlight.js';

// THREEJS DEFAULTS
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// BACKGORUND COLOR
const backgroundColor = new THREE.Color("rgb(230, 230, 230)");
scene.background = backgroundColor;

// ADDING THE FRID
const grid = {
    origin: new THREE.Vector3(0, 0, 0),
    size: 10,
    divisions: 11,
};

addGridToTheScene(scene, grid);

// SETTING UP RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(mainLoop);
document.body.appendChild(renderer.domElement);

// SETTING UP ORBIT CAMERA
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.z = 15;
orbit.update();

const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.z = 2
scene.add(directionalLight)

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1)
directionalLight2.position.z = -3
directionalLight2.rotateX(1 / 3);
scene.add(directionalLight)

// MAIN LOOP
function mainLoop() {
    renderer.render(scene, camera);
}

const GLOBALS = { scene, renderer, camera, };

initializeAllEvents();
generateHighlightMesh();

export { GLOBALS };