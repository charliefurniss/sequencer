$(document).ready(function() {

	window.onload = init;
	var context;
	var bufferLoader;
	var RhythmSample = {
	};

	var tempo = 110; // BPM (beats per minute)
	var sixteenthNoteTime = (60 / tempo) / 4;

	var loopLength = 2;
	var seqLength = 4;

	var channelArray = [
		{
			number: 1,
			seqArray: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]
		},
		{
			number: 2,
			seqArray: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
		},
		{
			number: 3,
			seqArray: [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0]
		}	
	]

	function init() {
	  // Fix up prefixing
	  window.AudioContext = window.AudioContext || window.webkitAudioContext;
	  context = new AudioContext();

	  bufferLoader = new BufferLoader(
	    context,
	    [
	      'audio/Kick909.wav',
	      'audio/Snare909.wav',
	      'audio/MA808.wav',
	      'audio/TomSim1.wav'
	    ],
	    setUpStart
	   );

	  bufferLoader.load();
	}

	function setUpStart(bufferList){
		$('#playButton').click(function(){
		  RhythmSample.play(bufferList);
		});
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

	  var kick = bufferList[0];
	  var snare = bufferList[1];
	  var hihat = bufferList[2];
	  var wave = bufferList[3];

	  var startTime = context.currentTime + 0.100;

	  for (var seq = 0; seq < seqLength; seq=seq+loopLength) {

	    var time = startTime + seq * 16 * sixteenthNoteTime;
	    
	    for (var channelOneSeq=0; channelOneSeq < channelArray[0].seqArray.length; channelOneSeq++){
	    	if (channelArray[0].seqArray[channelOneSeq] == 1){
	    		playSound(kick, time + channelOneSeq * sixteenthNoteTime);
	    	}	
	    }
	    
	    for (var channelTwoSeq=0; channelTwoSeq < channelArray[1].seqArray.length; channelTwoSeq++){
	    	if (channelArray[1].seqArray[channelTwoSeq] == 1){
	    		playSound(snare, time + channelTwoSeq * sixteenthNoteTime);
	    	}	
	    }

	    for (var channelThreeSeq=0; channelThreeSeq < channelArray[2].seqArray.length; channelThreeSeq++){
	    	if (channelArray[2].seqArray[channelThreeSeq] == 1){
	    		playSound(hihat, time + channelThreeSeq * sixteenthNoteTime);
	    	}    
	    }

	    // playSound(wave, time);
	  }
	};

	function setUpSequencer(){

		for (var j = 0; j < channelArray.length; j++) {
			
			var seqArray = channelArray[j].seqArray;
			var channelNumber = channelArray[j].number;

		 	for (i = 0; i < seqArray.length; i++){
		 		var step = i + 1;
		 		var channelID = '#ch'+ channelNumber + '_st' + step;
		 		if (seqArray[i] == 1){
		 			$(channelID).addClass("seqClicked");
		 		}
		 	}   
		}
	}

	function registerSeqButtonClick(){
	  $('button').each(function(){
	    $(this).on('click', function(){
	      var click = $(this);
	      var step = click.attr('data') - 1;
	      var channel = click.attr('channel');
	      var playBoolean = click.attr('value');

	      $('#' + click.attr('id')).toggleClass("seqClicked");
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

	      console.log(channelArray);

	    });
	  })
	}
	registerSeqButtonClick();
	setUpSequencer();
});



