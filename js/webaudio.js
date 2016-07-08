$(document).ready(function() {

	window.onload = init;
	
	var context;
	var bufferLoader;
	var sequencer;
	var channelArray;	
	var RhythmSample = {
	};
	
	var config = new Config();

	function init() {

		context	= new Context();
		context = context.context;
		sequencer = new Sequencer(context);
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
		  RhythmSample.play(bufferList);
		});
		sequencer.setUpChannels(bufferList);
		sequencer.registerSeqButtonClick();
	}

	RhythmSample.play = function(bufferList) {
	
	  function playSound(buffer, time) {
	    var source = context.createBufferSource();
	    source.buffer = buffer;
	    source.connect(context.destination);
	    if (!source.start)
	      source.start = source.noteOn;
	    source.start(time);
	    $('#stopButton').click(function(){
	      source.stop(0);
	    });
	  }

	  var startTime = context.currentTime + 0.100;

	  for (var seq = 0; seq < config.seqLength; seq = seq + config.loopLength) {
	    var time = startTime + seq * 16 * config.sixteenthNoteTime;
	    for (i = 0; i < channelArray.length; i++){
	    	for (var step=0; step < channelArray[i].seqArray.length; step++){
	    		//play sound on steps with value of 1
	    		if (channelArray[i].seqArray[step] == 1){
	    			playSound(channelArray[i].instr, time + step * config.sixteenthNoteTime);
	    		}
	    	}
	    }
	  }
	};

});



