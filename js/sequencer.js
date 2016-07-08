var Sequencer = function(context) {

	var channelArray = [];

	this.channelArray = channelArray;

	this.setUpChannels = function(bufferList, config){

		for (i = 0; i < bufferList.length; i++){

			var emptySeqArray = [];

			for (k = 0; k < config.seqLength; k++){
				emptySeqArray.push(0);
			}

			var channel = {
				number: i + 1,
				seqArray: emptySeqArray,
				instr: bufferList[i]
			}

			channelArray.push(channel);

			var seqContainerDiv = '<div class="seqContainer" id="channel' + channel.number + '"></div>';
			
			$('body').append(seqContainerDiv);
			$('#channel' + channel.number).append(channel.number + " ");

			for (j = 0; j < channel.seqArray.length; j++){
				var step = j + 1;
				var button = '<button class="seqButton" channel="' + channel.number + '" data="' + step + '" value="0" id="ch' + channel.number + '_st' + step +'"></button>';
				$('#channel' + channel.number).append(button);
			}
		}
	}

	this.registerSeqButtonClick = function(){

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
}