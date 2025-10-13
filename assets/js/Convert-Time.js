/**
 * @author jonathan-davies-uk
 * @copyright Jonathan Davies 2025
 * @license Apache-2.0
 */

/** Convert Time operation */

const TIME_UNITS = [
    "[Time]", "Picoseconds (ps)", "Nanoseconds (ns)", "Microseconds (µs)", "Milliseconds (ms)", "Seconds (s)", "Minutes (min)", "Hours (h)", "Days (d)", "Weeks (wk)", "Months (mo)", "Years (yr)", "Decades", "Centuries", "Millennia",
];

const TIME_MULTIPLE = { // Multiple of seconds
    //Time
    "Picoseconds (ps)":         1e-12,
    "Nanoseconds (ns)":         1e-9,
    "Microseconds (μs)":        1e-6,
    "Milliseconds (ms)":        1e-3,
    "Seconds (s)":              1,
    "Minutes (min)":            60,
    "Hours (h)":                3600,
    "Days (d)":                 86400,
    "Weeks (wk)":               604800,
    "Months (mo)":              2.628e6,
    "Years (yr)":               3.154e7,
    "Decades":                  3.154e8,
    "Centuries":                3.154e9,
    "Millennia":                3.154e10,
};

/**
 * Converts a time value from one unit to another using TIME_MULTIPLE.
 * @param {number} value - The numeric value to convert.
 * @param {string} fromUnit - The unit to convert from (must match a key in TIME_MULTIPLE).
 * @param {string} toUnit - The unit to convert to (must match a key in TIME_MULTIPLE).
 * @returns {number|null} - The converted value, or null if units are invalid.
 */
function convertTime(value, fromUnit, toUnit) {
    if (!(fromUnit in TIME_MULTIPLE) || !(toUnit in TIME_MULTIPLE)) {
        return null;
    }
    // Convert from the source unit to metres, then to the target unit
    const valueInMetres = value * TIME_MULTIPLE[fromUnit];
    return valueInMetres / TIME_MULTIPLE[toUnit];
}

const result = convertTime(100, "Centimetres (cm)", "Metres (m)");
console.log(result);