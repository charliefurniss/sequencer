var Control = function(config, rhythm, channelArray){

	this.registerLoopButtonClick = function(){
		$(function(){
			$('#loopButton').click(function() {
		    $(this).val() == "loop off" ? loopOn() : loopOff();
		  });
		});
	}

	function loopOff() {
		console.log("off");
	  	$('#loopButton').val("loop off");
	  	$('#loopButtonContainer').removeClass('controlButtonContainerClicked').addClass('loopButtonContainerColour');
	  	config.loop = false;
	}

	function loopOn() {
		console.log("on");
	  	$('#loopButton').val("loop on");
	  	$('#loopButtonContainer').removeClass('loopButtonContainerColour').addClass('controlButtonContainerClicked');
	  	config.loop = true;
	}

	this.registerPlayButtonClick = function(bufferList){
		$('#playButton').click(function(){
		  rhythm.play(bufferList, config, channelArray);
		});
	}

}