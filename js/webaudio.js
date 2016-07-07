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

	var kickArray = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
	var snareArray = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
	var hihatArray = [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0];

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
	    
	    for (var kickSeq=0; kickSeq < kickArray.length; kickSeq++){
	    	if (kickArray[kickSeq] == 1){
	    		playSound(kick, time + kickSeq * sixteenthNoteTime);
	    	}	
	    }
	    
	    for (var snareSeq=0; snareSeq < snareArray.length; snareSeq++){
	    	if (snareArray[snareSeq] == 1){
	    		playSound(snare, time + snareSeq * sixteenthNoteTime);
	    	}	
	    }

	    for (var hihatSeq=0; hihatSeq < hihatArray.length; hihatSeq++){
	    	if (hihatArray[hihatSeq] == 1){
	    		playSound(hihat, time + hihatSeq * sixteenthNoteTime);
	    	}    
	    }

	    // playSound(wave, time);
	  }
	};

	function setUpSequencer(){
		for (i = 0; i < kickArray.length; i++){
			var step = i + 1;
			if (kickArray[i] == 1){
				$('#ch1_st' + step).addClass("seqClicked");
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

	      if (kickArray[step] == 0) {
	        kickArray[step] = 1;
	      } else {
	        kickArray[step] = 0;
	      }
	    });
	  })
	}

	registerSeqButtonClick();
	setUpSequencer();

});



