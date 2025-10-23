/**
 * @author jonathan-davies-uk
 * @copyright Jonathan Davies 2025
 * @license Apache-2.0
 */

/** Convert Speed operation */

const SPEED_UNITS = [
    "[Metric]", "Nanometers per second (nm/s)", "Micrometers per second (μm/s)", "Micrometers per second (μm/s)", "Millimeters per second (mm/s)", "Centimeters per second (cm/s)", "Centimeters per minute (cm/min)", "Metres per hour (m/h)", "Metres per minute (m/min)", "Kilometres per hour (km/h)", "Metres per second (m/s)", "Millimeters per minute (mm/min)", "Micrometers per minute (μm/min)", "Nanometers per minute (nm/min)", "Centimeters per hour (cm/h)", "Millimeters per hour (mm/h)", "Micrometers per hour (μm/h)", "Nanometers per hour (nm/h)", "Kilometres per minute (km/min)", "Kilometers per second (km/s)",
    "[Imperial]", "Inches per hour (in/h)", "Feet per hour (ft/h)", "Furlongs per fornight", "Yards per hour (yd/h)", "Inches per minute (in/min)", "Feet per minute (ft/min)", "Yards per minute (yd/min)", "Inches per second (in/s)", "Feet per second (ft/s)", "Yards per second (yd/s)", "Miles per minute (mi/min)", "Miles per second (mi/s)",
    "[Scientific]", "Sound in standard atmosphere", "Sound in water", "Lunar escape velocity", "Earth escape velocity", "Earth's solar orbit", "Solar system's Milky Way orbit", "Milky Way relative to the cosmic microwave background", "Solar escape velocity", "Neutron star escape velocity (0.3c)", "Light in a diamond (0.4136c)", "Signal in an optical fibre (0.667c)", "Light (c)", "Mach 1", "Mach 1 SI Standard",
    "[Comparisons]", "Usain Bolt's top speed", "Jet airliner cruising speed", "Concorde", "SR-71 Blackbird", "Space Shuttle", "International Space Station",
];

const SPEED_MULTIPLES = { // Multiples of a square metre
    // Metric
    "Nanometers per second (nm/s)":      1e-9,
    "Micrometers per second (μm/s)":     1e-6,
    "Millimeters per second (mm/s)":     1e-3,
    "Centimeters per second (cm/s)":     1e-2,
    "Centimeters per minute (cm/min)":   0.0001666667,
    "Metres per hour (m/h)":             0.0002777778,
    "Metres per minute (m/min)":         0.0166666667,
    "Kilometres per hour (km/h)":        0.2777777778,
    "Metres per second (m/s)":           1,
    "Millimeters per minute (mm/min)":   1.66666667e-5,
    "Micrometers per minute (μm/min)":   1.66666667e-8,
    "Nanometers per minute (nm/min)":    1.66666667e-11,
    "Centimeters per hour (cm/h)":       2.77777778e-6,
    "Millimeters per hour (mm/h)":       2.77777778e-7,
    "Micrometers per hour (μm/h)":       2.77777778e-10,
    "Nanometers per hour (nm/h)":        2.77777778e-13,
    "Kilometres per minute (km/min)":    16.66666667,
    "Kilometers per second (km/s)":      1000,

    // Imperial
    "Inches per hour (in/h)":            0.0000070556,
    "Feet per hour (ft/h)":              0.0000846667,
    "Furlongs per fornight":             0.0001663,
    "Yards per hour (yd/h)":             0.00024192,
    "Inches per minute (in/min)":        0.0004233333,
    "Feet per minute (ft/min)":          0.00508,
    "Yards per minute (yd/min)":         0.0145152,
    "Inches per second (in/s)":          0.0254,
    "Feet per second (ft/s)":            0.3048,
    "Miles per hour (mph)":              0.44704,
    "Knots (kn)":                        0.514444,
    "Knots UK":                          0.5147733333,
    "Yards per second (yd/s)":           0.9144,
    "Miles per minute (mi/min)":         26.8224,
    "Miles per second (mi/s)":           1609.344,

    // Scientific
    "Sound in standard atmosphere":      340.3,
    "Sound in water":                    1500,
    "Lunar escape velocity":             2375,
    "Earth escape velocity":             11200,
    "Earth's solar orbit":               29800,
    "Solar system's Milky Way orbit":    200000,
    "Milky Way relative to the cosmic microwave background": 552000,
    "Solar escape velocity":             617700,
    "Neutron star escape velocity (0.3c)": 100000000,
    "Light in a diamond (0.4136c)":      124000000,
    "Signal in an optical fibre (0.667c)": 200000000,
    "Light (c)":                         299792458,
    "Mach 1":                            343.6,
    "Mach 1 SI Standard":                295.0464000003,

    // Comparisons
    "Usain Bolt's top speed":            12.42,
    "Jet airliner cruising speed":       250,
    "Concorde":                          603,
    "SR-71 Blackbird":                   981,
    "Space Shuttle":                     1400,
    "International Space Station":       7700,
};

/**
 * Converts an Speed value from one unit to another using SPEED_MULTIPLES.
 * @param {number} value - The numeric value to convert.
 * @param {string} fromUnit - The unit to convert from (must match a key in SPEED_MULTIPLES).
 * @param {string} toUnit - The unit to convert to (must match a key in SPEED_MULTIPLES).
 * @returns {number|null} - The converted value, or null if units are invalid.
 */
function convertSpeed(value, fromUnit, toUnit) {
    if (!(fromUnit in SPEED_MULTIPLES) || !(toUnit in SPEED_MULTIPLES)) {
        return null;
    }
    // Convert from the source unit to square metres, then to the target unit
    const valueInSqMetres = value * SPEED_MULTIPLES[fromUnit];
    return valueInSqMetres / SPEED_MULTIPLES[toUnit];
}

const result = convertSpeed(100, "Square metre (sq m)", "Square foot (sq ft)");
console.log(result);