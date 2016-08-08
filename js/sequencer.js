var Sequencer = function(context, buttonFX, beat, instrumentation) {

	this.beat = beat;

	var channelArray = [];

	this.channelArray = channelArray;

	this.setUpChannels = function(bufferList, config){

		var seqArray = [];

		for (i = 0; i < bufferList.length; i++){

			if (beat.status) {
				seqArray = this.beat.arrays[i];
			} else {
				seqArray = [];
				//create sequence array based on config.seqLength variable
				for (k = 0; k < config.seqLength; k++){
					seqArray.push(0);
				}
			}
			
			//create channel
			var channel = {
				number: i + 1,
				name: instrumentation.nameArray[i],
				seqArray: seqArray,
				instr: bufferList[i],
				gain: 0.67,
				solo: false,
				mute: false
			}

			//push channel object into channelArray
			channelArray.push(channel);
			//using channel info to create HTML elements on page
			createChannelHTML(channel);
		}
		registerMuteButtonClick();
		registerSoloButtonClick();
		registerGainSliderOperation();
		registerClearbuttonClick(channelArray);
	}

	function createChannelHTML(channel){

		var seqContainerDiv = '<div class="seqContainer"><div class="seqContent" id="channel' + channel.number + '"></div></div>';
		
		$('#sequencerChannels').append(seqContainerDiv);
		var seqChannelName = '<div class="seqChannelNameContainer"><h4 class="seqChannelName">' + channel.number + ' ' + channel.name + '</h4></div>';
		$('#channel' + channel.number).append(seqChannelName);

		var seqButtonsContainer ='<div class="seqButtonsContainer" id="seqButtonsContainer_' + channel.number + '"></div>';
		$('#channel' + channel.number).append(seqButtonsContainer);


		for (j = 0; j < channel.seqArray.length; j++){
			var step = j + 1;
			var clickedClass = "";
			
			if (channel.seqArray[j] === 1) {
				clickedClass = "seqClicked";
			} else {
				clickedClass = "seqNotClicked";
			}
			
			var button = '<button class="seqButton ' + clickedClass + '" channel="' + channel.number + '" data="' + step + '" value="' + channel.seqArray[j] + '" id="ch' + channel.number + '_st' + step + '"></button>';
			$('#seqButtonsContainer_' + channel.number).append(button);
		}

		var muteButton = '<td class="channel"><input type="button" class="channelElement muteButton" channel="' + channel.number + '" data=' + channel.mute + ' value="M"  id="ch' + channel.number + '_mute"></button></td>';
		$('#muteButtonsContainer').append(muteButton);
		var soloButton = '<td class="channel"><input type="button" class="channelElement soloButton" channel="' + channel.number + '" data=' + channel.solo + ' value="S"  id="ch' + channel.number + '_solo"></button></td>';
		$('#soloButtonsContainer').append(soloButton);
		var gainSlider = '<td class="channel"><input type="range" orient="vertical" class="channelElement gainSlider" channel="' + channel.number + '" min="0" max="1" step="0.001" value="' + channel.gain + '"  id="ch' + channel.number + '_gain"></button></td>';
		$('#gainSliderContainer').append(gainSlider);
		var mixerChannelNumber = '<td class="channel"><h3 class="channelElement channelNumber">' + channel.number + '</h3></td>'
		$('#mixingDeskHeadContainer').append(mixerChannelNumber);
	
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

	      playSound(instr, 0);

	      if (playBoolean == 1){
	        $('#' + click.attr('id')).val(0);
	        $('#' + click.attr('id')).removeClass("seqClicked").addClass("seqNotClicked");
	      } else {
	        $('#' + click.attr('id')).val(1);
	        $('#' + click.attr('id')).addClass("seqClicked").removeClass("seqNotClicked");
	      }

	      if (channelArray[channel - 1].seqArray[step] == 0) {
	        channelArray[channel - 1].seqArray[step] = 1;
	      } else {
	        channelArray[channel - 1].seqArray[step] = 0;
	      }

	    });
	  })
	}


	function registerMuteButtonClick(){
		$(function(){
			$('.muteButton').each(function(){
				$(this).on('click', function(){				
					var click = $(this);
					var channel = click.attr('channel');
					channelArray[channel - 1].mute === false ? muteOn(click, channel) : muteOff(click, channel);
				})
			})
		});
	}

	function muteOff(click, channel){
	  channelArray[channel - 1].mute = false;
	  click.removeClass('channelButtonClicked');
	}

	function muteOn(click, channel){
	  channelArray[channel - 1].mute = true;
	  click.addClass('channelButtonClicked');
	}


	function registerSoloButtonClick(){
		$(function(){
			$('.soloButton').each(function(){
				$(this).on('click', function(){				
					var click = $(this);
					var channel = click.attr('channel');
					channelArray[channel - 1].solo === false ? soloOn(click, channel) : soloOff(click, channel);
				})
			})
		});
	}

	function soloOn(click, channel){
	  channelArray[channel - 1].solo = true;
	  click.addClass('channelButtonClicked');
	}

	function soloOff(click, channel){
	  channelArray[channel - 1].solo = false;
	  click.removeClass('channelButtonClicked');
	}


	function registerGainSliderOperation(){
		$('.gainSlider').each(function(){
			$(this).on("input", function(){
				var click = $(this);
				var channel = click.attr('channel');
				channelArray[channel - 1].gain = this.value;
			})
		})
	}

	function registerClearbuttonClick(channelArray){
		//listen for click on clear button
		$('#clearButton').on('click', function(){
			//flash button
			buttonFX.controlButtonFlash(this);
			//iterate through all channels
			for (i = 0; i < channelArray.length; i++){
				//iterate through steps in relevant channel
				for (k = 0; k < channelArray[i].seqArray.length; k++){
					//make value of each step 0
					channelArray[i].seqArray[k] = 0;
					
					var channel = i + 1;
					var step = k + 1;
					var stepButton = $('#ch' + channel + '_st' + step);
					//make value of HTML button 0 and class seqNotClicked
					if (stepButton.val(1)){
						stepButton.val(0).addClass('seqNotClicked').removeClass('seqClicked');
					}
				}
			}
		})
	}

}