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
      var soloBoolean = checkForSolo(channelArray);
      playArray(channelArray, time, config, soloBoolean);
    }

    function checkForSolo(array){
      for (i = 0; i < channelArray.length; i++){
        if (channelArray[i].solo){
          return true;
        } else {
          return false;
        }
      }
    }

    function playArray(array, time, config, soloBoolean){

      var arrayToPlay = createArrayToPlay(array);

      for (i = 0; i < arrayToPlay.length; i++){
        for (var step = 0; step < arrayToPlay[i].seqArray.length; step++){
          // mute channel if mute button is clicked
          if (arrayToPlay[i].mute){
            arrayToPlay[i].seqArray[step] == 0;
          } else {
            // play sound on steps with value of 1
            if (arrayToPlay[i].seqArray[step] == 1){
              playSound(arrayToPlay[i], time + step * config.sixteenthNoteTime);
            }
          }          
        }
      }
    }


    function createArrayToPlay(array){
      var arrayToPlay = [];
      if (soloBoolean){
        for (i = 0; i < array.length; i++){
          if (array[i].solo){
            arrayToPlay.push(channelArray[i]);
          }
        }
      } else {
        arrayToPlay = array;
      }
      return arrayToPlay;
    } 

  };

}