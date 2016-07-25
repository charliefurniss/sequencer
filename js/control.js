var Control = function(config){

	this.setUpLoopButton = function(){
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

}