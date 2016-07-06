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
      'audio/MA808.wav'
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

  // We'll start playing the rhythm 100 milliseconds from "now"
  var startTime = context.currentTime + 0.100;
  var tempo = 80; // BPM (beats per minute)
  var eighthNoteTime = (60 / tempo) / 2;

  // Play 2 bars of the following:
  for (var bar = 0; bar < 2; bar++) {
    var time = startTime + bar * 8 * eighthNoteTime;
    // Play the bass (kick) drum on beats 1, 5
    playSound(kick, time);
    playSound(kick, time + 4 * eighthNoteTime);

    // Play the snare drum on beats 3, 7
    playSound(snare, time + 2 * eighthNoteTime);
    playSound(snare, time + 6 * eighthNoteTime);

    // Play the hi-hat every eighthh note.
    for (var i = 0; i < 8; ++i) {
      playSound(hihat, time + i * eighthNoteTime);
    }
  }
};



