var Rhythm = function(context){

  this.play = function(bufferList, config, channelArray) {

    console.log(config.loop);

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

    //establish loop or not

    var loop;

    if (config.loop){
      loop = 128;
    } else {
      loop = 1;
    }

    for (var seq = 0; seq < loop; seq++) {
      var time = startTime + seq * config.seqLength * config.sixteenthNoteTime;
      for (i = 0; i < channelArray.length; i++){
      	for (var step=0; step < channelArray[i].seqArray.length; step++){
      		//play sound on steps with value of 1
          if (channelArray[i].mute === true){
            channelArray[i].seqArray[step] == 0;
          }
          if (channelArray[i].seqArray[step] == 1){
            playSound(channelArray[i].instr, time + step * config.sixteenthNoteTime);
          }
      	}
      }
    }
  };

}