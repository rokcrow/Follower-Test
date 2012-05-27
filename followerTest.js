window.load_users = function(data) {
 	$.each(data, function(index, user_data) {
 		var htmlclass = (index % 2) ? 'tweet2' : 'tweet1';
 		tweet = 
 			'<div class="' + htmlclass + '">' +
 				'<img src="egg.png" alt="imagen" width="80px" height="80px" />' +
        '<p>' + user_data.tweets[0].text + '</p>' +        
      '</div>'
    $('#contenedorTimeline').append(tweet);
 	});
 	$('#loading, #timeline').toggle();
 	window.load_qtip();
 }
 
 window.load_qtip = function() {
 	$('img').qtip({
		content: {
			text: $('#modal'),
			title: {
				text: 'Modal qTip',
				button: true
			}
		},
		position: {
			my: 'center', // ...at the center of the viewport
			at: 'center',
			target: $(window)
		},
		show: {
			event: 'click', // Show it on click...
			solo: true, // ...and hide all other tooltips...
			modal: true // ...and make it modal
		},
		hide: false,
		style: 'ui-tooltip-light ui-tooltip-rounded'
	});
 }
 
 $('document').ready(function() {
 	$('form').submit(function(evt) {
 		evt.preventDefault();
 		$(evt.target).toggle();
 		$('#loading').toggle();
 		Game.start($('input.username').val());
 	});
});