import * as THREE from 'three';
import { addGridToTheScene, removeGridFromScene } from "./grid.js";
import { GLOBALS } from "../cacad.js";
import { generateHighlightMesh, removeHighlightMesh } from './highlight.js';
import { addCubeByCoords, removeAllCubes, removeCubeByCoords } from './automata.js';

/**
 * Initializes the ui elements for grid controls.
 */
function initializeGridUI() {
    let gridSize = document.getElementById('gridSize');
    let gridDivisions = document.getElementById('gridDivisions');
    let gridVisible = document.getElementById('gridVisible');

    document.getElementById('gridVisible').checked = true;

    function constructGrid() {
        if (!gridVisible.checked) {
            removeGridFromScene(GLOBALS.scene);
            removeHighlightMesh();
        }
        else {
            addGridToTheScene(GLOBALS.scene, {
                origin: new THREE.Vector3(0, 0, 0),
                size: gridSize.value,
                divisions: gridDivisions.value,
            });
            generateHighlightMesh();
            removeAllCubes();
        }
    }

    gridSize.addEventListener("change", constructGrid);
    gridDivisions.addEventListener("change", () => {

        if (gridDivisions.value % 2 === 0) {
            gridDivisions.value = Number(gridDivisions.value) + 1;
        }

        constructGrid();
    });
    gridVisible.addEventListener("change", constructGrid);
}

function InitializeScreenResize() {
    window.addEventListener('resize', function () {
        GLOBALS.camera.aspect = window.innerWidth / window.innerHeight;
        GLOBALS.camera.updateProjectionMatrix();
        GLOBALS.renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function InitializeRayPicker() {
    const mousePosition = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    window.addEventListener('mousedown', (event) => {
        const highlight = GLOBALS.scene.getObjectByName("highlightMesh");

        if (highlight) {
            let x = highlight.position.x;
            let y = highlight.position.y;
            let z = highlight.position.z;

            switch (event.button) {
                // LEFT
                case 0:
                    addCubeByCoords(x, y, z);
                    break;

                // MIDDLE
                case 1:
                    break;

                // RIGHT
                case 2:
                    removeCubeByCoords(x, y, z);
                    break;
            }
        }
    });

    window.addEventListener('mousemove', (event) => {
        removeHighlightMesh();

        mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mousePosition, GLOBALS.camera);

        let intersects = raycaster.intersectObjects(GLOBALS.scene.children);

        intersects.forEach((intersected) => {
            if (intersected.object.name === "mainPlane") {
                const highlightPos = new THREE.Vector3().copy(intersected.point);
                const size = document.getElementById('gridSize').value;
                const division = document.getElementById('gridDivisions').value;
                const spacing = size / division;

                highlightPos.x = Math.round(highlightPos.x / spacing) * spacing;
                highlightPos.z = Math.round(highlightPos.z / spacing) * spacing;

                generateHighlightMesh(highlightPos.x, spacing / 2, highlightPos.z);
            }
        });
    });
}

/**
 * Initializes everytinhg.
 */
function initializeAllEvents() {
    initializeGridUI();
    InitializeScreenResize();
    InitializeRayPicker();
}

export { initializeAllEvents };