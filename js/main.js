$(document).ready(function() {

	window.onload = init;
	
	var context;
	var bufferLoader;
	var sequencer;
	var channelArray;
	var bufferArray;
	
	var rhythm;
	var beat = new Beat();
	var config = new Config();
	var buttonFX = new ButtonFX();
	var instrumentation = new Instrumentation();
	var control;
	var performance;

	function init() {

		performance = new Performance(buttonFX);
		context	= new Context();
		context = context.context;
		rhythm = new Rhythm(context, performance);
		sequencer = new Sequencer(context, buttonFX, beat, instrumentation);
		channelArray = sequencer.channelArray;
		control = new Control(config, rhythm, channelArray);

		bufferLoader = new BufferLoader(
			context,
			instrumentation.bufferArray,
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



