$(document).ready(function() {

	window.onload = init;
	
	var context;
	var bufferLoader;
	var sequencer;
	var channelArray;	
	
	var rhythm;
	var config = new Config();

	function init() {

		context	= new Context();
		context = context.context;
		sequencer = new Sequencer(context, config);
		rhythm = new Rhythm(context);
		channelArray = sequencer.channelArray;

	  bufferLoader = new BufferLoader(
	    context,
	    [
	      'audio/Kick909.wav',
	      'audio/Snare909.wav',
	      'audio/MA808.wav',
	      'audio/TomSim1.wav',
	      'audio/TomSim2.wav',
	      'audio/TomSim3.wav',
	      'audio/Clave808.wav',
	      'audio/ClapDtrax15.wav'
	    ],
	    setUp
	   );

	  bufferLoader.load();
	}

	function setUp(bufferList){
		$('#playButton').click(function(){
		  rhythm.play(bufferList, config, channelArray);
		});
		setUpLoopButton();
		sequencer.setUpChannels(bufferList, config);
		sequencer.registerSeqButtonClick();
	}

	function setUpLoopButton(){
		$(function(){
			$('#loopButton').click(function() {
		    $(this).val() == "loop off" ? loopOn() : loopOff();
		  });
		});
	}

	function loopOff() {
	  $('#loopButton').val("loop off").removeClass('controlButtonClicked');
	  config.loop = false;
	}

	function loopOn() {
	  $('#loopButton').val("loop on").addClass('controlButtonClicked');
	  config.loop = true;
	} 

});



