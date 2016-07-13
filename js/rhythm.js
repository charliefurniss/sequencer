var Rhythm = function(context){

  this.play = function(bufferList, config, channelArray) {

    function playSound(channelObject, time) {
      var source = context.createBufferSource();
      source.buffer = channelObject.instr;
      var gainNode = context.createGain();
      source.connect(gainNode);
      gainNode.gain.value = channelObject.gain;
      gainNode.connect(context.destination);

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

      // checkForActiveSolo(channelArray);

      playArray(channelArray, time, config);
      
    }

    function checkForActiveSolo(array){
      var soloChannelArray = [];
      for (i = 0; i < channelArray.length; i++){
        if (channelArray[i].solo){
          soloChannelArray.push(channelArray[i]);
        }
      }
    }

    function playArray(array, time, config){
      for (i = 0; i < array.length; i++){

        for (var step = 0; step < array[i].seqArray.length; step++){
          // mute channel if mute button is clicked
          if (array[i].mute){
            array[i].seqArray[step] == 0;
          } else {
            // play sound on steps with value of 1
            if (array[i].seqArray[step] == 1){
              playSound(array[i], time + step * config.sixteenthNoteTime);
            }
          }          
        }
      }
    }
  };

}