var ButtonFX = function(){

	this.controlButtonFlash = function(button){
	  $('#' + button.id + 'Container')
	    .removeClass(button.id + 'ContainerColour')
	    .addClass(button.id + 'ContainerActive');
	  setTimeout(function(){ 
	    $('#' + button.id + 'Container')
	      .addClass(button.id + 'ContainerColour')
	      .removeClass(button.id + 'ContainerActive'); 
	  }, 300);
	}

}