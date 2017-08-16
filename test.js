'use strict';

function loadScript(url, callback) {
        var filenode = document.createElement('script');
        filenode.src = url;
	document.body.appendChild(filenode);
        // IE
        filenode.onreadystatechange = function () {
            if (filenode.readyState === 'loaded' || filenode.readyState === 'complete') {
                filenode.onreadystatechange = null;
                callback();
            }
        };
        // others
        filenode.onload = function () {
            callback();
        };
}

loadScript('https://code.jquery.com/jquery-3.2.1.min.js', function() {
	$('script').first().prevAll().remove();
	var server_url = $('script').data('server-url');

	var form = $('<form>');
	form.append($('<input type="text">'));
	form.append($('<input type="submit">'));
	form.submit(function(e) {
		var message = $('input').val();
		$('input').val("");
		var el = $('<div>').text(message);
		el.css({ opacity: 0.5 });
		$('body').append(el);
		$.ajax({
			url: server_url,
			type: 'post',
			contentType: 'text/plain',
			data: message,
			success: function(data)
			{
				el.removeAttr('style');
			}
		});
		e.preventDefault();
	});
	$('body').append(form);

	$.ajax({
		url: server_url,
		dataType: "json",
		success: function(data)
		{
			data.map(function(s) {
				$('body').append($('<div>').text(s));
			});
		}
	});
});
