var Control = function(config, rhythm, channelArray){

	this.registerPlayButtonClick = function(bufferList){
		$('#playButton').click(function(){
			rhythm.setUp(bufferList, config, channelArray);
		  	$('#playButtonContainer')
				.addClass('playButtonContainerActive')
				.removeClass('playButtonContainerColour');
		});
	}



	// this.registerStopButtonClick = function(){
	// 	$('#stopButton').click(function(){
	// 	  rhythm.stop();
	// 	});
	// }

	this.registerLoopButtonClick = function(){
		$('#loopButton').click(function() {
			$(this).val() == "loop off" ? loopOn() : loopOff();
		});
	}

	function loopOff() {
	  	$('#loopButton').val("loop off");
	  	$('#loopButtonContainer')
	  		.removeClass('loopButtonContainerActive')
	  		.addClass('loopButtonContainerColour');
	  	config.loop = false;
	}

	function loopOn() {
	  	$('#loopButton').val("loop on");
	  	$('#loopButtonContainer')
	  		.removeClass('loopButtonContainerColour')
	  		.addClass('loopButtonContainerActive');
	  	config.loop = true;
	}

}