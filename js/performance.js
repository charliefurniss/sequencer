var Performance = function(buttonFX){

	this.playSound = function(context, channelObject, time) {
		
	  var source = context.createBufferSource();
	  source.buffer = channelObject.instr;
	  
	  var gainNode = context.createGain();
	  source.connect(gainNode);
	  gainNode.gain.value = channelObject.gain;
	  gainNode.connect(context.destination);

	  if (!source.start)
	    source.start = source.noteOn;
	  source.start(time);
	  stopSound(source);
	}

	function stopSound(source){
	  $('#stopButton').click(function(){
	    source.stop(0);

	    buttonFX.controlButtonFlash(this);
	    
	    $('#playButtonContainer')
	    	.removeClass('playButtonContainerActive')
	    	.addClass('playButtonContainerColour');
	  });
	}

}