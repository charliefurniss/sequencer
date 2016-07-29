var Solo = function(){

	this.checkForSolo = function(channelArray){

		for (i = 0; i < channelArray.length; i++){
	        if (channelArray[i].solo){
	          return true;
	        }
	    }

	}

}