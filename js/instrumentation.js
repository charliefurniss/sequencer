var Instrumentation = function() {

	var bufferArray = [
		'audio/Kick909.wav',
		'audio/Snare909.wav',
		'audio/MA808.wav',
		'audio/TomSim1.wav',
		'audio/TomSim2.wav',
		'audio/TomSim3.wav',
		'audio/Clave808.wav',
		'audio/ClapDtrax15.wav'
	]

	this.bufferArray = bufferArray;

	this.nameArray = createNameArray();

	function createNameArray(){
		var nameArray = [];

		for (i = 0; i < bufferArray.length; i++){
			console.log(bufferArray[i]);
			var name = bufferArray[i].replace('audio/', '').replace('.wav', '');
			nameArray.push(name);
		}

		return nameArray;
	}

}