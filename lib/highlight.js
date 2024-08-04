import * as THREE from 'three';
import { GLOBALS } from "../cacad.js";
import { getCurrentColor } from './pallate.js';

function generateHighlightMesh(x, y, z) {
    removeHighlightMesh();

    const size = document.getElementById('gridSize').value;
    const division = document.getElementById('gridDivisions').value;
    const spacing = size / division;

    const highlightMesh = new THREE.Mesh(
        new THREE.BoxGeometry(spacing, spacing, spacing),
        new THREE.MeshBasicMaterial({ color: getCurrentColor() })
    );

    highlightMesh.name = "highlightMesh";
    highlightMesh.position.set(x, y, z);
    GLOBALS.scene.add(highlightMesh);
}

function removeHighlightMesh() {
    GLOBALS.scene.remove(GLOBALS.scene.getObjectByName("highlightMesh"));
}

export { generateHighlightMesh, removeHighlightMesh };