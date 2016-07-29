$(document).ready(function() {

	window.onload = init;
	
	var context;
	var bufferLoader;
	var sequencer;
	var channelArray;	
	
	var rhythm;
	var config = new Config();
	var buttonFX = new ButtonFX();
	var control;
	var performance;

	function init() {

		context	= new Context();
		context = context.context;
		sequencer = new Sequencer(context, config);
		performance = new Performance(buttonFX);
		rhythm = new Rhythm(context, performance);
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



