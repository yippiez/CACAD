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


/**
 * 
 */
function calculateHighlightMeshPosition(mouseX, mouseY) {
    removeHighlightMesh();

    const mousePosition = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    mousePosition.x = (mouseX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(mouseY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mousePosition, GLOBALS.camera);

    let intersects = raycaster.intersectObjects(GLOBALS.scene.children);

    const size = document.getElementById('gridSize').value;
    const division = document.getElementById('gridDivisions').value;
    const spacing = size / division;

    let x, y, z;
    for (const intersected of intersects) {

        // Check if mouse is over a cube. If so get all the neighboring
        // points of that cube and check which of the points the raycast
        // hit location is closest to.
        if (intersected.object.name[0] == "(") {
            const centerAsString = intersected.object.name;
            const centerAsVec3 = centerAsString.slice(1, -1).split(',').map(parseFloat);

            const [cx, cy, cz] = centerAsVec3;

            const neighborPoints = [
                [cx - spacing, cy, cz],  // Neighbor to the left
                [cx + spacing, cy, cz],  // Neighbor to the right
                [cx, cy - spacing, cz],  // Neighbor below
                [cx, cy + spacing, cz],  // Neighbor above
                [cx, cy, cz - spacing],  // Neighbor behind
                [cx, cy, cz + spacing]   // Neighbor in front
            ];

            let selectedPoint = intersected.point;
            const filteredNeighborPoints = neighborPoints.filter(point => point[1] >= 0);

            const closestPoint = filteredNeighborPoints.reduce((closest, point) => {
                const [px, py, pz] = point;
                const [sx, sy, sz] = selectedPoint;

                // Calculate squared distance to avoid unnecessary sqrt calculations
                const distanceSquared = (px - sx) ** 2 + (py - sy) ** 2 + (pz - sz) ** 2;

                if (!closest || distanceSquared < closest.distanceSquared) {
                    return { point, distanceSquared };
                }

                return closest;
            }, null).point;

            [x, y, z] = closestPoint;

            break;
        }

        // If no cube were hit by the raycast. Check if the raycast hit the plane.
        if (intersected.object.name === "mainPlane") {
            const highlightPos = new THREE.Vector3().copy(intersected.point);

            highlightPos.x = Math.round(highlightPos.x / spacing) * spacing;
            highlightPos.z = Math.round(highlightPos.z / spacing) * spacing;

            x = highlightPos.x;
            y = spacing / 2;
            z = highlightPos.z;

            break;
        }
    }

    generateHighlightMesh(x, y, z);
}

export { generateHighlightMesh, removeHighlightMesh, calculateHighlightMeshPosition };