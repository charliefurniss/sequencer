var Sequencer = function(context) {

	this.channelArray = [];

	this.setUpChannels = function(bufferList){
		
		for (i = 0; i < bufferList.length; i++){
			var channel = {
				number: i + 1,
				seqArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				instr: bufferList[i]
			}

			this.channelArray.push(channel);

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

}