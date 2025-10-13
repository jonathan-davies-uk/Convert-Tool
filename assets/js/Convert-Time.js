/**
 * @author jonathan-davies-uk
 * @copyright Jonathan Davies 2025
 * @license Apache-2.0
 */

/** Convert Time operation */

// List of time units for the converter, including group labels for optgroup support in dropdowns
const TIME_UNITS = [
    "[Time]", "Picoseconds (ps)", "Nanoseconds (ns)", "Microseconds (µs)", "Milliseconds (ms)", "Seconds (s)", "Minutes (min)", "Hours (h)", "Days (d)", "Weeks (wk)", "Months (mo)", "Years (yr)", "Decades", "Centuries", "Millennia",
];


const TIME_MULTIPLE = { // Multipliers to convert each unit to seconds (the base unit)
    "Picoseconds (ps)":         1e-12,
    "Nanoseconds (ns)":         1e-9,
    "Microseconds (µs)":        1e-6,
    "Milliseconds (ms)":        1e-3,
    "Seconds (s)":              1,
    "Minutes (min)":            60,
    "Hours (h)":                3600,
    "Days (d)":                 86400,
    "Weeks (wk)":               604800,
    "Months (mo)":              2.628e6, // average month (30.44 days)
    "Years (yr)":               3.154e7, // average year (365.25 days)
    "Decades":                  3.154e8,
    "Centuries":                3.154e9,
    "Millennia":                3.154e10,
};

/**
 * Converts a time value from one unit to another using TIME_MULTIPLE.
 * Steps:
 *   1. Convert the input value to seconds (the base unit).
 *   2. Convert from seconds to the target unit.
 * Returns null if either unit is not supported.
 * @param {number} value - The numeric value to convert.
 * @param {string} fromUnit - The unit to convert from (must match a key in TIME_MULTIPLE).
 * @param {string} toUnit - The unit to convert to (must match a key in TIME_MULTIPLE).
 * @returns {number|null} - The converted value, or null if units are invalid.
 */
function convertTime(value, fromUnit, toUnit) {
    if (!(fromUnit in TIME_MULTIPLE) || !(toUnit in TIME_MULTIPLE)) {
        return null;
    }
    // Convert from the source unit to seconds, then to the target unit
    const valueInSeconds = value * TIME_MULTIPLE[fromUnit];
    return valueInSeconds / TIME_MULTIPLE[toUnit];
}


/**
 * Populates a <select> element with <optgroup> and <option> tags for all time units.
 * Group labels (e.g., [Time]) are used as <optgroup> labels.
 * @param {string} id - The id of the <select> element to populate.
 */
function fillSelectWithGroups(id) {
    const sel = document.getElementById(id);
    sel.innerHTML = '';
    let currentOptGroup = null;
    TIME_UNITS.forEach(u => {
        if (u.startsWith('[') && u.endsWith(']')) {
            currentOptGroup = document.createElement('optgroup');
            currentOptGroup.label = u.replace(/\[|\]/g, '');
            sel.appendChild(currentOptGroup);
        } else {
            const opt = document.createElement('option');
            opt.value = u;
            opt.textContent = u;
            if (currentOptGroup) {
                currentOptGroup.appendChild(opt);
            } else {
                sel.appendChild(opt);
            }
        }
    });
}

/**
 * Handles user input and updates the output field with the converted value.
 * Reads the value, from-unit, and to-unit from the form, performs conversion, and displays the result.
 */
function doConversion() {
    const value = parseFloat(document.getElementById('input-value').value);
    const fromUnit = document.getElementById('input-unit').value;
    const toUnit = document.getElementById('output-unit').value;
    if (!isNaN(value)) {
        const result = convertTime(value, fromUnit, toUnit);
        document.getElementById('output').textContent = (result !== null) ? `${value} ${fromUnit} = ${result} ${toUnit}` : 'Invalid unit selection.';
    } else {
        document.getElementById('output').textContent = '';
    }
}

// Initialize the converter UI when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    fillSelectWithGroups('input-unit'); // Populate input unit dropdown
    fillSelectWithGroups('output-unit'); // Populate output unit dropdown
    document.getElementById('input-value').addEventListener('input', doConversion); // Listen for value changes
    document.getElementById('input-unit').addEventListener('change', doConversion); // Listen for input unit changes
    document.getElementById('output-unit').addEventListener('change', doConversion); // Listen for output unit changes
    doConversion(); // Perform initial conversion
});