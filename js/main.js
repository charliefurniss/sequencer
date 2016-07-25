$(document).ready(function() {

	window.onload = init;
	
	var context;
	var bufferLoader;
	var sequencer;
	var channelArray;	
	
	var rhythm;
	var config = new Config();
	var control = new Control(config);

	function init() {

		context	= new Context();
		context = context.context;
		sequencer = new Sequencer(context, config);
		rhythm = new Rhythm(context);
		channelArray = sequencer.channelArray;

	  bufferLoader = new BufferLoader(
	    context,
	    [
	      'audio/Kick909.wav',
	      'audio/Snare909.wav',
	      'audio/MA808.wav',
	      'audio/TomSim1.wav',
	      'audio/TomSim2.wav',
	      'audio/TomSim3.wav',
	      'audio/Clave808.wav',
	      'audio/ClapDtrax15.wav'
	    ],
	    setUp
	   );

	  bufferLoader.load();
	}

	function setUp(bufferList){
		$('#playButton').click(function(){
		  rhythm.play(bufferList, config, channelArray);
		});
		control.setUpLoopButton();
		sequencer.setUpChannels(bufferList, config);
		sequencer.registerSeqButtonClick();
	}

	// function setUpLoopButton(){
	// 	$(function(){
	// 		$('#loopButton').click(function() {
	// 	    $(this).val() == "loop off" ? loopOn() : loopOff();
	// 	  });
	// 	});
	// }

	// function loopOff() {
	// 	console.log("off");
	//   	$('#loopButton').val("loop off");
	//   	$('#loopButtonContainer').removeClass('controlButtonContainerClicked').addClass('loopButtonContainerColour');
	//   	config.loop = false;
	// }

	// function loopOn() {
	// 	console.log("on");
	//   	$('#loopButton').val("loop on");
	//   	$('#loopButtonContainer').removeClass('loopButtonContainerColour').addClass('controlButtonContainerClicked');
	//   	config.loop = true;
	// } 

});



