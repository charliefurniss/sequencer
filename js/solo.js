var Solo = function(channelArray){

	var soloBoolean;

	for (i = 0; i < channelArray.length; i++){
        if (channelArray[i].solo){
          soloBoolean = true;
        } else {
          soloBoolean = false;
        }
    }

    return soloBoolean;

}