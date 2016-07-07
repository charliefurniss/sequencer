window.onload = init;
var context;
var bufferLoader;
var RhythmSample = {
};

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
    RhythmSample.play
   );

  bufferLoader.load();
}

RhythmSample.play = function(bufferList) {
	console.log(bufferList);
  function playSound(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    if (!source.start)
      source.start = source.noteOn;
    source.start(time);
  }

  var kick = bufferList[0];
  var snare = bufferList[1];
  var hihat = bufferList[2];
  var wave = bufferList[3];

  // We'll start playing the rhythm 100 milliseconds from "now"
  var startTime = context.currentTime + 0.100;
  var tempo = 110; // BPM (beats per minute)
  var sixteenthNoteTime = (60 / tempo) / 4;

  var loopLength = 2;
  var seqLength = 4;

  var kickArray = [0, 1, 4, 8, 12, 16, 20, 24, 28];
  var snareArray = [4, 12, 20, 28];
  var hihatArray = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 25, 26, 28, 30];

  for (var seq = 0; seq < seqLength; seq=seq+loopLength) {

    var time = startTime + seq * 16 * sixteenthNoteTime;
    
    for (var kickSeq=0; kickSeq < kickArray.length; kickSeq++){
    	playSound(kick, time + kickArray[kickSeq] * sixteenthNoteTime);	
    }
    
    for (var snareSeq=0; snareSeq < snareArray.length; snareSeq++){
    	playSound(snare, time + snareArray[snareSeq] * sixteenthNoteTime);	
    }

    for (var hihatSeq=0; hihatSeq < hihatArray.length; hihatSeq++){
    	playSound(hihat, time + hihatArray[hihatSeq] * sixteenthNoteTime);	
    }

    // playSound(wave, time);
  }
};



