/**
 * @author jonathan-davies-uk
 * @copyright Jonathan Davies 2025
 * @license Apache-2.0
 */
/** Convert Temperature operation */

// --- Temperature conversion logic for table ---
// Conversion functions to/from Celsius
const TEMPERATURE_CONVERTER = {
    'celsius': {
        toC: v => v,
        fromC: v => v
    },
    'fahrenheit': {
        toC: v => (v - 32) * 5/9,
        fromC: v => v * 9/5 + 32
    },
    'kelvin': {
        toC: v => v - 273.15,
        fromC: v => v + 273.15
    },
    'rankine': {
        toC: v => (v - 491.67) * 5/9,
        fromC: v => (v + 273.15) * 9/5
    },
    'delisle': {
        toC: v => 100 - v * 2/3,
        fromC: v => (100 - v) * 3/2
    },
    'newton': {
        toC: v => v * 100/33,
        fromC: v => v * 33/100
    },
    'reaumur': {
        toC: v => v * 5/4,
        fromC: v => v * 4/5
    },
    'romer': {
        toC: v => (v - 7.5) * 40/21,
        fromC: v => v * 21/40 + 7.5
    }
};

const TEMPERATURE_IDS = ['celsius','fahrenheit','kelvin','rankine','delisle','newton','reaumur','romer'];

function setupTemperatureTable() {
    TEMPERATURE_IDS.forEach(id => {
        const el = document.getElementById('temperature-' + id);
        if (!el) return;
        el.addEventListener('input', function(e) {
            if (e.target.value === '') {
                TEMPERATURE_IDS.forEach(otherId => {
                    if (otherId !== id) {
                        const otherEl = document.getElementById('temperature-' + otherId);
                        if (otherEl) otherEl.value = '';
                    }
                });
                return;
            }
            const val = parseFloat(e.target.value);
            if (isNaN(val)) return;
            // Convert to Celsius, then update all others
            const celsius = TEMPERATURE_CONVERTER[id].toC(val);
            TEMPERATURE_IDS.forEach(otherId => {
                if (otherId !== id) {
                    const otherEl = document.getElementById('temperature-' + otherId);
                    if (otherEl) otherEl.value = TEMPERATURE_CONVERTER[otherId].fromC(celsius);
                }
            });
        });
    });
}

if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', function() {
        setupTemperatureTable();
        // Set default Celsius value to 0 and trigger conversions
        var celsiusInput = document.getElementById('temperature-celsius');
        if (celsiusInput) {
            celsiusInput.value = 0;
            // Trigger input event to update all other fields
            var event = new Event('input', { bubbles: true });
            celsiusInput.dispatchEvent(event);
        }
    });
}

