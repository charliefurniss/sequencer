var Context = function(){
	// Fix up prefixing
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	this.context = new AudioContext();
}