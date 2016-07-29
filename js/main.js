$(document).ready(function() {

	window.onload = init;
	
	var context;
	var bufferLoader;
	var sequencer;
	var channelArray;	
	
	var rhythm;
	var config = new Config();
	var control;

	function init() {

		context	= new Context();
		context = context.context;
		sequencer = new Sequencer(context, config);
		rhythm = new Rhythm(context);
		channelArray = sequencer.channelArray;
		control = new Control(config, rhythm, channelArray);

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
		sequencer.setUpChannels(bufferList, config);
		sequencer.registerSeqButtonClick();
		control.registerLoopButtonClick();
		control.registerPlayButtonClick();
	}

});



