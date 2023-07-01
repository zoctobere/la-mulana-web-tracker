window.addEventListener('load', (_e) => {
    initializeTrackerChecksFromLocalstorage();
    updateAllTrackerCheckDisplays(trackerChecks);
    checkKeyFairy();
    checkShrineChecks();
});

document.addEventListener('trackedItemUpdated', (e) => {
    const el = document.getElementById(e.trackedKey);
    const newVal = e.trackedNewValue;
    switch(e.trackedNewValue.type) {
        case "toggle":
            updateTrackedToggleItemDisplay(el, newVal);
            handleAggregateTracking(e.trackedKey);
            break;
        case "step":
            updateTrackedStepItemDisplay(el, newVal);
            break;
        case "counter":
            updateTrackedCounterDisplay(el, newVal);
            break;
    }
});

function handleAggregateTracking(key) {
	if ( keyFairyChecks.includes(key)){ checkKeyFairy(); }
	if ( shrineChecks.includes(key)){ checkShrineChecks(); }
}

function toggleItem(e){
    e.preventDefault();
	const el = e.target;
    trackerStorage.toggle(el.id);
    return false;
}

function stepItem(e){
    e.preventDefault();
	const el = e.target;
    trackerStorage.stepUp(el.id);
    return false;
}

function unStepItem(e){
    e.preventDefault();
	const el = e.target;
    trackerStorage.stepDown(el.id);
    return false;
}

function incCounter(e){
    e.preventDefault();
	const el = e.target;
    const counterKey = el.id.replace(/Image$/, '').replace(/Counter$/, '');
    trackerStorage.increment(counterKey);
    return false;
}

function decCounter(e){
    e.preventDefault();
	const el = e.target;
    const counterKey = el.id.replace(/Image$/, '').replace(/Counter$/, '');
    trackerStorage.decrement(counterKey);
    return false;
}

function resetTracker(e){
    e.preventDefault();
    if (window.confirm("This will erase all currently tracked game state. Are you sure?")) {
        resetTrackerChecks();
        checkKeyFairy();
        checkShrineChecks();
    }
}

function checkKeyFairy(){
    const keyFairyEl = document.getElementById("keyfairy");
    keyFairyAccess() ? unfadeItem(keyFairyEl) : fadeItem(keyFairyEl);
}

function checkShrineChecks(){
    const shrineChecksEl = document.getElementById("shrinechecks");
    shrineAccess() ? unfadeItem(shrineChecksEl) : fadeItem(shrineChecksEl);
}
