var Loop = function(){

	this.checkLoop = function(config){

		var loop;
		
		if (config.loop){
		  loop = 32;
		} else {
		  loop = 1;
		}

		return loop;

	}

}