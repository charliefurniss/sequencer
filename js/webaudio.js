$(document).ready(function() {

	window.onload = init;
	
	var context;
	var bufferLoader;
	var sequencer;
	var channelArray;	
	
	var sequence;
	var config = new Config();

	function init() {

		context	= new Context();
		context = context.context;
		sequencer = new Sequencer(context);
		sequence = new Sequence(context);
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
	      'audio/Clave808.wav'
	    ],
	    setUp
	   );

	  bufferLoader.load();
	}

	function setUp(bufferList){
		$('#playButton').click(function(){
		  sequence.play(bufferList, config, channelArray);
		});
		sequencer.setUpChannels(bufferList);
		sequencer.registerSeqButtonClick();
	}

});



