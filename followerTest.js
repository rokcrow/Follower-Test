 $('document').ready(function() {
	$('img').qtip(
	{
		id: 'modal', // Since we're only creating one modal, give it an ID so we can style it
		content: {
			text: $('div:hidden'),
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
});