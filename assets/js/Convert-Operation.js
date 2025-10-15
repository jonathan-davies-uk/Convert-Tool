/**
 * @author jonathan-davies-uk
 * @copyright Jonathan Davies 2025
 * @license Apache-2.0
 */

/** Unit Converion operation for all calculations */


/**
 * Extracts the unit name and multiplier from an <option> value string.
 * Example value: "Nanometres (nm) [1e-9]"
 * Returns: { name: "Nanometres (nm)", multiplier: 1e-9 }
 */
function parseUnitOption(optionValue) {
    // Match: name (shorthand) [multiplier]
    const match = optionValue.match(/^([^\[]+)(?:\s*\[[^\]]+\])?$/);
    let name = optionValue, multiplier = null;
    if (match) {
        // Extract name (before [)
        name = match[1].trim();
        // Extract multiplier in []
        const multMatch = optionValue.match(/\[([^\]]+)\]/);
        if (multMatch) {
            multiplier = parseFloat(multMatch[1].replace(/,/g, ''));
            if (isNaN(multiplier)) {
                // Try scientific notation
                multiplier = Number(multMatch[1]);
            }
        }
    }
    return { name, multiplier };
}

/**
 * Converts a unit value from one unit to another using multipliers from the HTML <option> values.
 * @param {number} value - The numeric value to convert.
 * @param {string} fromOptionValue - The value attribute of the from-unit <option>.
 * @param {string} toOptionValue - The value attribute of the to-unit <option>.
 * @returns {number|null} - The converted value, or null if units are invalid.
 */
function convertUnit(value, fromOptionValue, toOptionValue) {
    const from = parseUnitOption(fromOptionValue);
    const to = parseUnitOption(toOptionValue);
    if (!from.multiplier || !to.multiplier) return null;
    const valueInMetres = value * from.multiplier;
    return valueInMetres / to.multiplier;
}

/**
 * Handles user input and updates the output field with the converted value.
 * Reads the value, from-unit, and to-unit from the form, performs conversion, and displays the result.
 * @param {number} value - The numeric value to convert.
 * @param {string} fromOptionValue - The value attribute of the from-unit <option>.
 * @param {string} toOptionValue - The value attribute of the to-unit <option>.
 * @returns {number|null} - The converted value, or null if units are invalid.
 */
function doConversion() {
    const value = parseFloat(document.getElementById('input-value').value);
    const fromOption = document.getElementById('input-unit').value;
    const toOption = document.getElementById('output-unit').value;
    if (!isNaN(value)) {
        const result = convertUnit(value, fromOption, toOption);
        document.getElementById('output').textContent = (result !== null) ? `${value} ${parseUnitOption(fromOption).name} = ${result} ${parseUnitOption(toOption).name}` : 'Invalid unit selection.';
        document.getElementById('output').setAttribute('data-value', `${value} ${parseUnitOption(fromOption).name} = ${result} ${parseUnitOption(toOption).name}`);
    } else {
        document.getElementById('output').textContent = '';
        document.getElementById('output').removeAttribute('data-value');
    }
}

// Attach event listeners and trigger initial conversion when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('input-value').addEventListener('input', doConversion);
    document.getElementById('input-unit').addEventListener('change', doConversion);
    document.getElementById('output-unit').addEventListener('change', doConversion);
    doConversion();
});