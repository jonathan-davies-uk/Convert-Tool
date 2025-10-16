/**
 * @author jonathan-davies-uk
 * @copyright Jonathan Davies 2025
 * @license Apache-2.0
 */

/** Unit Converion operation for all calculations */



/**
 * Gets the unit name, shorthand, and multiplier from a <select> element's selected <option>.
 * @param {HTMLSelectElement} select - The select element.
 * @returns {{ name: string, shorthand: string|null, multiplier: number|null }}
 */
function getUnitData(select) {
    const opt = select.options[select.selectedIndex];
    if (!opt) return { name: '', shorthand: '', multiplier: null };
    const name = opt.getAttribute('data-unit-name') || '';
    const shorthand = opt.getAttribute('data-unit-shorthand') || '';
    const multiplier = opt.getAttribute('data-unit-multiplier');
    return { name, shorthand, multiplier: isNaN(multiplier) ? null : multiplier };
}

/**
 * Converts a unit value from one unit to another using multipliers from the HTML <option> data attributes.
 * @param {number} value - The numeric value to convert.
 * @param {number} fromMultiplier - The multiplier for the from-unit.
 * @param {number} toMultiplier - The multiplier for the to-unit.
 * @returns {number|null} - The converted value, or null if units are invalid.
 */
function convertUnit(value, fromMultiplier, toMultiplier) {
    if (!fromMultiplier || !toMultiplier) return null;
    const valueInBase = value * fromMultiplier;
    return valueInBase / toMultiplier;
}


/**
 * Handles user input and updates the output field with the converted value.
 * Reads the value, from-unit, and to-unit from the form, performs conversion, and displays the result.
 */
function doConversion() {
    const value = parseFloat(document.getElementById('input-value').value);
    const fromData = getUnitData(document.getElementById('input-unit'));
    const toData = getUnitData(document.getElementById('output-unit'));
    if (!isNaN(value)) {
        const result = convertUnit(value, fromData.multiplier, toData.multiplier);
        const fromLabel = fromData.name + (fromData.shorthand ? ` (${fromData.shorthand})` : '');
        const toLabel = toData.name + (toData.shorthand ? ` (${toData.shorthand})` : '');
        const outputText = (result !== null)
            ? `${value} ${fromLabel} = ${result} ${toLabel}`
            : 'Invalid unit selection.';
        const outputShorthand = (result !== null)
            ? `${value} ${fromData.shorthand} = ${result} ${toData.shorthand}`
            : 'Invalid unit selection.';
        document.getElementById('output').textContent = outputText;
        document.getElementById('output').setAttribute('data-unit-value', outputText);
        document.getElementById('output').setAttribute('data-unit-to-name', `${fromLabel} to ${toLabel}`);
        document.getElementById('output').setAttribute('data-unit-to-shorthand', `${fromData.shorthand} to ${toData.shorthand}`);
        document.getElementById('output-value').textContent = result;
        document.getElementById('output-value').setAttribute('value', result);
    } else {
        document.getElementById('output').textContent = '';
        document.getElementById('output').removeAttribute('data-unit-value');
        document.getElementById('output').removeAttribute('data-unit-to');
        document.getElementById('output').removeAttribute('data-unit-shorthand');
        document.getElementById('output-value').removeAttribute('value');
    }
}

// Attach event listeners and trigger initial conversion when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('input-value').addEventListener('input', doConversion);
    document.getElementById('input-unit').addEventListener('change', doConversion);
    document.getElementById('output-unit').addEventListener('change', doConversion);
    doConversion();
});