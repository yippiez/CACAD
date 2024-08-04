
/**
 * Returns the current selected color.
 * @returns {string} Representing the current color of the colorPicker.
 */
function getCurrentColor() {
    return document.getElementById("colorPicker").value;
}

export { getCurrentColor };