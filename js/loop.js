var Loop = function(config){

	var loop;

	if (config.loop){
	  loop = 128;
	} else {
	  loop = 1;
	}

	return loop;

}