import * as THREE from 'three';

/**
 * Adds the grid to the scene. Grids are defined by size and divisions.
 * 
 * @param {THREE.scene} scene 
 * @param {object} grid 
 */
function addGridToTheScene(scene, grid) {

    removeGridFromScene(scene);

    const planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(grid.size, grid.size),
        new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            visible: false,
        }),
    );

    planeMesh.translateX(grid.origin.x);
    planeMesh.translateY(grid.origin.y);
    planeMesh.translateZ(grid.origin.z);

    planeMesh.name = "mainPlane";

    planeMesh.rotateX(-Math.PI / 2)

    const gridHelper = new THREE.GridHelper(grid.size, grid.divisions);

    gridHelper.name = "mainGrid";

    gridHelper.translateX(grid.origin.x);
    gridHelper.translateY(grid.origin.y);
    gridHelper.translateZ(grid.origin.z);

    scene.add(planeMesh);
    scene.add(gridHelper);

    document.getElementById('gridSize').value = grid.size;
    document.getElementById('gridDivisions').value = grid.divisions;
}

function removeGridFromScene(scene) {
    scene.remove(scene.getObjectByName("mainPlane"));
    scene.remove(scene.getObjectByName("mainGrid"));
}

export {
    addGridToTheScene, removeGridFromScene
};