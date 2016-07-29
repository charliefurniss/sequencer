var ButtonFX = function(){

	this.controlButtonFlash = function(button){
	  $('#' + button.id + 'Container')
	    .removeClass(button.id + 'ContainerColour')
	    .addClass('controlButtonContainerClicked');
	  setTimeout(function(){ 
	    $('#stopButtonContainer')
	      .addClass(button.id + 'ContainerColour')
	      .removeClass('controlButtonContainerClicked'); 
	  }, 1000);
	}

}