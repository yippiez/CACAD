import * as THREE from 'three';
import { GLOBALS } from '../cacad.js';
import { getCurrentColor } from './pallate.js';

//

var currentCubes = [];

/**
 * Adds a cube to the scene givin coordinates and a color.
 * 
 * @param {number} x x coordinate of the cube 
 * @param {number} y y coordinate of the cube
 * @param {number} z z coordinate of the cube
 * @param {THREE.Color} color three color acceptable
 * string or number. Used for the color of the cube.
 */
function addCubeByCoords(x, y, z) {
    let name = "(" + x + "," + y + "," + z + ")";
    if (GLOBALS.scene.getObjectByName(name))
        return;

    const size = document.getElementById('gridSize').value;
    const division = document.getElementById('gridDivisions').value;
    const spacing = size / division;

    const cubeMesh = new THREE.Mesh(
        new THREE.BoxGeometry(spacing, spacing, spacing),
        new THREE.MeshBasicMaterial({ color: getCurrentColor() })
    );

    cubeMesh.position.set(x, y, z);
    cubeMesh.name = name;

    currentCubes = [...currentCubes, name];

    GLOBALS.scene.add(cubeMesh);
}

/**
 * Removes the cube at coordinate.
 * 
 * @param {number} x x coordinate of the cube 
 * @param {number} y y coordinate of the cube
 * @param {number} z z coordinate of the cube
 */
function removeCubeByCoords(x, y, z) {
    GLOBALS.scene.remove(GLOBALS.scene.getObjectByName("(" + x + "," + y + "," + z + ")"));
}


/**
 * Removes all cubes in the scene.
 */
function removeAllCubes() {
    currentCubes.forEach(name => GLOBALS.scene.remove(GLOBALS.scene.getObjectByName(name)))
}

// 

export { addCubeByCoords, removeCubeByCoords, removeAllCubes };