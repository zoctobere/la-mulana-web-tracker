var sectionShown = [];
var markers = [];
var markerTypes = [
	"images/marker0.png",
	"images/marker1.png",
	"images/marker2.png",
];
var lastClick;

function changeBG(){
	document.body.style.backgroundColor = document.getElementById("bgcolor").value;
	document.getElementById("shopDropdown").style.backgroundColor = document.getElementById("bgcolor").value;
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

function toggleItem(e){
	id = e.target;
	if ( id.style.opacity == 1.0 ){
		id.style.opacity = 0.5;
		id.style.filter = "grayscale(100%)";
	} else {
		id.style.opacity = 1.0;
		id.style.filter = "none";
	}
	if ( id == "isispendant" || "miracle" || "mekuri" ){
		checkKeyFairy();
	}
	if ( id == "dragonbone" || "yagomap" || "yagostr" || "shrinemap" || "amphisbaena" || "sakit" || "ellmac" || "bahamut" || "viy" || "palenque" || "baphoment" || "tiamat"){
		checkShrineChecks();
	}
}

function stepItem(e, item1, item2, item3){

	id = e.target;

	if ( id.src.match(item3) ) {
		id.src = item1;
		id.style.opacity = 0.5;
		id.style.filter = "grayscale(100%)";
	}
	else if ( id.src.match(item2) ){
		if( item3 == "dummy" ) {
			id.src = item1;
			id.style.opacity = 0.5;
			id.style.filter = "grayscale(100%)";
		} else {
			id.src = item3;
	}
}
	else if ( id.src.match(item1) && id.style.opacity != 1.0){
		id.style.opacity = 1.0;
		id.style.filter = "none";
	}
	else {
		id.src = item2;
	}

}

function unStepItem(e, item1, item2, item3){

	id = e.target;

	if ( id.src.match(item3) ) {
		id.src = item2;
	}
	else if ( id.src.match(item2) ){
			id.src = item1;
	}
	else if ( id.src.match(item1) && id.style.opacity != 1.0){
		if( item3 == "dummy" ) {
			id.src = item2;
			id.style.opacity = 1.0;
			id.style.filter = "none";
		} else {
			id.src = item3;
			id.style.opacity = 1.0;
			id.style.filter = "none";
	}
}
	else {
		id.src = item1;
		id.style.opacity = 0.5;
		id.style.filter = "grayscale(100%)";
	}
	return false;
}

function incCounter(e, max, counter){
	id = e.target
	c = document.getElementById(counter).innerHTML;

	if (c == 0){
		id.style.opacity = 1.0;
		id.style.filter = "none";
		document.getElementById(counter).innerHTML = 1;
	}
	else if (c >= 1 && c < max){
		document.getElementById(counter).innerHTML++;
	}
	else {
		id.style.opacity = 0.5;
		id.style.filter = "grayscale(100%)";
		document.getElementById(counter).innerHTML = 0;
	}
	if (document.getElementById(counter).innerHTML == max) {
		document.getElementById(counter).style.color = "lime";
	}
	else {
		document.getElementById(counter).style.color = "#f1f1f1"
	}

}

function decCounter(e, max, counter){
	id = e.target
	c = document.getElementById(counter).innerHTML;

	if (c == 0){
		id.style.opacity = 1.0;
		id.style.filter = "none";
		document.getElementById(counter).innerHTML = max;
	}
	else if (c > 1 && c <= max){
		document.getElementById(counter).innerHTML--;
	}
	else {
		id.style.opacity = 0.5;
		id.style.filter = "grayscale(100%)";
		document.getElementById(counter).innerHTML = 0;
	}
	if (document.getElementById(counter).innerHTML == max) {
		document.getElementById(counter).style.color = "lime";
	}
	else {
		document.getElementById(counter).style.color = "#f1f1f1"
	}
	return false;
}

function checkKeyFairy(){
	pendant = document.getElementById("isispendant");
	miracle = document.getElementById("miracle");
	mekuri = document.getElementById("mekuri");

	if (pendant.style.opacity == 1.0 && miracle.style.opacity == 1.0 && mekuri.style.opacity == 1.0){
		document.getElementById("keyfairy").style.opacity = 1.0;
		document.getElementById("keyfairy").style.filter = "none";
	}
	else{
		document.getElementById("keyfairy").style.opacity = 0.5;
		document.getElementById("keyfairy").style.filter = "grayscale(100%)";
	}
}

function checkShrineChecks(){
	dragonbone = document.getElementById("dragonbone");
	yagomap = document.getElementById("yagomap");
	yagostr = document.getElementById("yagostr");
	shrinemap = document.getElementById("shrinemap");

	amphisbaena = document.getElementById("amphisbaena");
	sakit = document.getElementById("sakit");
	ellmac = document.getElementById("ellmac");
	bahamut = document.getElementById("bahamut");
	viy = document.getElementById("viy");
	palenque = document.getElementById("palenque");
	baphomet = document.getElementById("baphomet");
	tiamat = document.getElementById("tiamat");

	if (dragonbone.style.opacity == 1.0 && yagomap.style.opacity == 1.0 && yagostr.style.opacity == 1.0 && shrinemap.style.opacity == 1.0){
		document.getElementById("shrinechecks").style.opacity = 1.0;
		document.getElementById("shrinechecks").style.filter = "none";
	}
	else if (
		amphisbaena.style.opacity == 1.0 &&
		sakit.style.opacity == 1.0 &&
		ellmac.style.opacity == 1.0 &&
		bahamut.style.opacity == 1.0 &&
		viy.style.opacity == 1.0 &&
		palenque.style.opacity == 1.0 &&
		baphomet.style.opacity == 1.0 &&
		tiamat.style.opacity == 1.0
	) {
		document.getElementById("shrinechecks").style.opacity = 1.0;
		document.getElementById("shrinechecks").style.filter = "none";
	}
	else{
		document.getElementById("shrinechecks").style.opacity = 0.5;
		document.getElementById("shrinechecks").style.filter = "grayscale(100%)";
	}
}
