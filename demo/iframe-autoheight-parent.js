'use strict';

(function() {

	var permittedOrigin = "http://localhost:8087";

	var receiveMessage = function receiveMessage(event) {
		if (event.origin !== permittedOrigin) {
			return;
		}
		if (event.data) {
			try {
				var json = JSON.parse(event.data);
				if (!json.docHeight || 'number' !== typeof json.docHeight) {
					return;
				}
				if (!json.iframe || 'string' !== typeof json.iframe) {
					return;
				}
				var iframe = document.getElementsByName(json.iframe);
				if (iframe.length) {
					iframe = iframe[0];
					iframe.style.height = json.docHeight + 'px';
				}
			} catch (error) {
				console.error(error.message);
			}
		}
	};

	window.addEventListener("message", receiveMessage, false);
})();
