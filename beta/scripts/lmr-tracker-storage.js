const trackerKeyPrefix = 'LMRWebTracker'
const trackerStorage = {
    setItem: function(key, type, value) {
        window.localStorage.setItem(`${trackerKeyPrefix}:${type}:${key.toLowerCase()}`, JSON.stringify(value));
        const event = new Event('trackedItemUpdated');
        event.trackedKey = key;
        event.trackedNewValue = value;
        document.dispatchEvent(event);
    },
    getItem: function(key, type) {
        return JSON.parse(window.localStorage.getItem(`${trackerKeyPrefix}:${type}:${key.toLowerCase()}`));
    },
    keyParts: function(prefixedKey) {
        const [prefix, type, key] = prefixedKey.split(':')
        return { prefix, type, key };
    },
    trackToggleItem: function(key, image) {
        const tracked = {
            type: 'toggle',
            value: false,
            image,
        };
        this.setItem(key, 'toggle', tracked);
    },
    getOrInitializeToggleItem(key, image) {
        const existing = this.getItem(key, 'toggle');
        if (!existing) { this.trackToggleItem(key, image); }
    },
    toggle: function(key) {
        const tracked = this.getItem(key, 'toggle');
        tracked.value = !tracked.value;
        this.setItem(key, 'toggle', tracked);
        return tracked;
    },
    trackStepItem: function(key, steps) {
        const tracked = {
            type: 'step',
            value: 0,
            steps,
        };
        this.setItem(key, 'step', tracked);
    },
    getOrInitializeStepItem(key, steps) {
        const existing = this.getItem(key, 'step');
        if (!existing) { this.trackStepItem(key, steps); }
    },
    stepUp: function(key) {
        const tracked = this.getItem(key, 'step');
        tracked.value = incrementCyclicCounter(tracked.value, tracked.steps.length);
        this.setItem(key, 'step', tracked);
        return tracked;
    },
    stepDown: function(key) {
        const tracked = this.getItem(key, 'step');
        tracked.value = decrementCyclicCounter(tracked.value, tracked.steps.length);
        this.setItem(key, 'step', tracked);
        return tracked;
    },
    trackCounter: function(key, image, maxVal) {
        const tracked = {
            type: 'counter',
            value: 0,
            max: maxVal,
            atMin: true,
            atMax: false,
            image,
        };
        this.setItem(key, 'counter', tracked);
    },
    getOrInitializeCounter(key, image, maxVal) {
        const existing = this.getItem(key, 'counter');
        if (!existing) { this.trackCounter(key, image, maxVal); }
    },
    increment: function(key) {
        const tracked = this.getItem(key, 'counter');
        tracked.value = incrementCyclicCounter(tracked.value, tracked.max);
        tracked.atMin = tracked.value === 0;
        tracked.atMax = tracked.value === tracked.max;
        this.setItem(key, 'counter', tracked);
        return tracked;
    },
    decrement: function(key) {
        const tracked = this.getItem(key, 'counter');
        tracked.value = decrementCyclicCounter(tracked.value, tracked.max);
        tracked.atMin = tracked.value === 0;
        tracked.atMax = tracked.value === tracked.max;
        this.setItem(key, 'counter', tracked);
        return tracked;
    },
    getOrInitializePreference: function(key, defaultValue) {
        const existing = this.getItem(key, 'pref');
        if (!existing) { this.setItem(key, 'pref', defaultValue); }
    },
    setPreference: function(key, value) {
        this.setItem(key, 'pref', value);
    },
    getPreference: function(key, value) {
        return this.getItem(key, 'pref');
    },
    reset: function(key, type) {
        const tracked = this.getItem(key, type);
        if (tracked) {
            switch(type) {
                case 'toggle':
                    this.trackToggleItem(key, tracked.image);
                    break;
                case 'step':
                    this.trackStepItem(key, tracked.steps);
                    break;
                case 'counter':
                    this.trackCounter(key, tracked.image, tracked.max);
                    break;
            }
        }
    }
};

function incrementCyclicCounter(val, maxVal) {
    return val === maxVal ? 0 : val + 1;
}

function decrementCyclicCounter(val, maxVal) {
    return val === 0 ? maxVal : val - 1;
}
