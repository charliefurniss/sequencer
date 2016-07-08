$(document).ready(function() {

	window.onload = init;
	var context;
	var bufferLoader;
	var RhythmSample = {
	};
	var sequencer;

	var tempo = 110; // BPM (beats per minute)
	var sixteenthNoteTime = (60 / tempo) / 4;

	var loopLength = 2;
	var seqLength = 4;

	var channelArray;

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
	    setUpStart
	   );

	  bufferLoader.load();
	}

	function setUpStart(bufferList){
		$('#playButton').click(function(){
		  RhythmSample.play(bufferList);
		});
		sequencer.setUpChannels(bufferList);
		registerSeqButtonClick();
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

	  for (var seq = 0; seq < seqLength; seq = seq + loopLength) {
	    var time = startTime + seq * 16 * sixteenthNoteTime;
	    for (i = 0; i < channelArray.length; i++){
	    	for (var step=0; step < channelArray[i].seqArray.length; step++){
	    		//play sound on steps with value of 1
	    		if (channelArray[i].seqArray[step] == 1){
	    			playSound(channelArray[i].instr, time + step * sixteenthNoteTime);
	    		}
	    	}
	    }
	  }
	};

	function registerSeqButtonClick(){

		function playSound(buffer, time) {
		  var source = context.createBufferSource();
		  source.buffer = buffer;
		  source.connect(context.destination);
		  if (!source.start)
		    source.start = source.noteOn;
		  source.start(time);
		}

	  $('button').each(function(){
	    $(this).on('click', function(){
	      var click = $(this);
	      var step = click.attr('data') - 1;
	      var channel = click.attr('channel');
	      var playBoolean = click.attr('value');
	      var instr = channelArray[channel - 1].instr;

	      $('#' + click.attr('id')).toggleClass("seqClicked");
	      playSound(instr, 0);

	      if (playBoolean == 1){
	        $('#' + click.attr('id')).val(0);
	      } else {
	        $('#' + click.attr('id')).val(1);
	      }

	      if (channelArray[channel - 1].seqArray[step] == 0) {
	        channelArray[channel - 1].seqArray[step] = 1;
	      } else {
	        channelArray[channel - 1].seqArray[step] = 0;
	      }

	    });
	  })
	}

	// function setUpSequencer(bufferList){

	// 	for (var j = 0; j < channelArray.length; j++) {
			
	// 		var seqArray = channelArray[j].seqArray;
	// 		var channelNumber = channelArray[j].number;

	// 		//set each channel's instrument
	// 		channelArray[j].instr = bufferList[j];

	// 	 	for (i = 0; i < seqArray.length; i++){
	// 	 		var step = i + 1;
	// 	 		var channelID = '#ch'+ channelNumber + '_st' + step;
	// 	 		if (seqArray[i] == 1){
	// 	 			$(channelID).addClass("seqClicked");
	// 	 		}
	// 	 	}
	// 	}
	// }

});



