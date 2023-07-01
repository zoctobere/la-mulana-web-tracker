function changeBG(){
	document.body.style.backgroundColor = document.getElementById("bgcolor").value;
}

function changeText(){
	document.getElementById("tracker").style.color = document.getElementById("txtcolor").value;
}

function toggleBorder(){
	const checked = document.getElementById("trackerborder").checked;
	if (checked){
		document.getElementById("tracker").style.border = "2px solid darkred";
	} else {
		document.getElementById("tracker").style.border = "2px solid transparent";
	}
}

function info(){
	var id = document.getElementById("info")
	if (id.style.display == "block"){
		id.style.display = "none";
	}
	else {
		id.style.display = "block";
	}
}

function updateTrackedToggleItemDisplay(el, currentState) {
    currentState.value ? unfadeItem(el) : fadeItem(el);
}

function updateTrackedStepItemDisplay(el, currentValue) {
    const notFound = currentValue.value === 0;
    const stepIndex = notFound ? 0 : currentValue.value - 1;
    const image = currentValue.steps[stepIndex];
    el.src = image;
    notFound ? fadeItem(el) : unfadeItem(el);
}

function updateTrackedCounterDisplay(el, currentState) {
    const counterEl = document.getElementById(`${el.id}Counter`);
	const imageEl = document.getElementById(`${el.id}Image`);
    counterEl.innerHTML = currentState.value.toString();
	counterEl.style.color = currentState.atMax ? "lime" : "#f1f1f1";
    currentState.atMin ? fadeItem(imageEl) : unfadeItem(imageEl);
}

function updateAllTrackerCheckDisplays(checks) {
	checks.forEach((check) => {
		const el = document.getElementById(check.key);
		const currentValue = trackerStorage.getItem(check.key, check.type);
		switch(check.type) {
			case "toggle":
				updateTrackedToggleItemDisplay(el, currentValue);
				break;
			case "step":
				updateTrackedStepItemDisplay(el, currentValue);
				break;
			case "counter":
				updateTrackedCounterDisplay(el, currentValue);
				break;
		}
	})
}

function fadeItem(el){
    el.style.opacity = 0.5;
    el.style.filter = "grayscale(100%)";
}

function unfadeItem(el) {
    el.style.opacity = 1.0;
    el.style.filter = "none";
}
