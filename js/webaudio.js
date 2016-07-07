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

  for (var seq = 0; seq < seqLength; seq=seq+loopLength) {

    var time = startTime + seq * 16 * sixteenthNoteTime;
    
    // Play the bass (kick) drum on beats 1, 5
    playSound(kick, time + 0 * sixteenthNoteTime)
    playSound(kick, time + 4 * sixteenthNoteTime);
    playSound(kick, time + 8 * sixteenthNoteTime);
    playSound(kick, time + 11 * sixteenthNoteTime);
    playSound(kick, time + 16 * sixteenthNoteTime);
    playSound(kick, time + 20 * sixteenthNoteTime);
    playSound(kick, time + 24 * sixteenthNoteTime);
    playSound(kick, time + 28 * sixteenthNoteTime);

    // Play the snare drum on beats 3, 7
    playSound(snare, time + 4 * sixteenthNoteTime);
    playSound(snare, time + 12 * sixteenthNoteTime);
    playSound(snare, time + 20 * sixteenthNoteTime);
    playSound(snare, time + 28 * sixteenthNoteTime);

    // Play the hi-hat every eighth note.
    for (var i = 0; i < 32; i=i+2) {
      playSound(hihat, time + i * sixteenthNoteTime);
    }

    // playSound(wave, time);
  }
};



