var Instrumentation = function() {

	this.bufferArray = [

		'audio/Kick909.wav',
		'audio/Snare909.wav',
		'audio/MA808.wav',
		'audio/TomSim1.wav',
		'audio/TomSim2.wav',
		'audio/TomSim3.wav',
		'audio/Clave808.wav',
		'audio/ClapDtrax15.wav'
	
	]

	this.nameArray = createNameArray();

	function createNameArray(){

		var nameArray = [];

		for (i = 0; i < this.bufferArray; i++){
			var name = this.bufferArray[i].replace('audio/', '');
			nameArray.push(name);
		}

		return nameArray;

	}

}