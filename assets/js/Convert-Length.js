/**
 * @author jonathan-davies-uk
 * @copyright Jonathan Davies 2025
 * @license Apache-2.0
 */

/** Convert length operation */

const LENGTH_UNITS = [
    "[Metric]", "Nanometres (nm)", "Micrometres (µm)", "Millimetres (mm)", "Centimetres (cm)", "Metres (m)", "Kilometers (km)",
    "[Imperial]", "Thou (th)", "Inches (in)", "Feet (ft)", "Yards (yd)", "Chains (ch)", "Furlongs (fur)", "Miles (mi)", "Leagues (lea)",
    "[Maritime]", "Fathoms (ftm)", "Cables", "Nautical miles",
    "[Astronomical]", "Parsecs (pc)", "Astronomical units (au)", "Light-years (ly)",
    "[Comparisons]", "Bus (8.4m)", "Football pitch (100.6mm)",
];

const LENGTH_MULTIPLE = { // Multiple of metres
    //Metric
    "Nanometres (nm)":          1e-9,
    "Micrometres (μm)":         1e-6,
    "Millimetres (mm)":         1e-3,
    "Centimetres (cm)":         1e-2,
    "Metres (m)":               1,
    "Kilometres (km)":          1e3,

    //Imperial
    "Thou (th)":                0.0000254,
    "Inches (in)":              0.0254,
    "Feet (ft)":                0.3048,
    "Yards (yd)":               0.9144,
    "Chains (ch)":              20.1168,
    "Furlongs (fur)":           201.168,
    "Miles (mi)":               1609.344,
    "League (lea)":             4828.032,

    //Maritime
    "Fathoms (ftm)":            1.853184,
    "Cables":                   185.3184,
    "Nautical miles":           1853.184,

    //Astronomical
    "Parsecs (pc)":             3.0856776e16,
    "Astronmical units (au)":   149597870700,
    "Light years (ly)":         9460730472580800,

    //Comparison
    "Bus (8.4m)":4,
    "Football pitch (100.6m)":  100.6,
    "Earth to Moon":            380000000
};

/**
 * Converts a length value from one unit to another using LENGTH_MULTIPLE.
 * @param {number} value - The numeric value to convert.
 * @param {string} fromUnit - The unit to convert from (must match a key in LENGTH_MULTIPLE).
 * @param {string} toUnit - The unit to convert to (must match a key in LENGTH_MULTIPLE).
 * @returns {number|null} - The converted value, or null if units are invalid.
 */
function convertLength(value, fromUnit, toUnit) {
    if (!(fromUnit in LENGTH_MULTIPLE) || !(toUnit in LENGTH_MULTIPLE)) {
        return null;
    }
    // Convert from the source unit to metres, then to the target unit
    const valueInMetres = value * LENGTH_MULTIPLE[fromUnit];
    return valueInMetres / LENGTH_MULTIPLE[toUnit];
}

const result = convertLength(100, "Centimetres (cm)", "Metres (m)");
console.log(result);