YUI().use("node", function(Y){
	document.addEventListener('keyup', function(){ 
		// $(document.activeElement).wrap(function() {
		//   return "<div class='ymuis-current-selected-element'>"+$( this ).attr('class')+"</div>";
		// });;
		console.log($(document.activeElement));
		$(document.activeElement).addClass('ymuis-current-selected-element');
	});

	// document.addEventListener('keydown', function(){ 
	// 	$(document.activeElement).removeClass('ymuis-current-selected-element');
	// });
});
