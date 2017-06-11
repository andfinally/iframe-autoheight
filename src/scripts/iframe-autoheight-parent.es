/*
 Add iframe-autoheight-parent.min.js to the page that contains the iframe
 */

(() => {

	// Change this to the hostname of the page you're embedding in the iframe
	let permittedOrigin = "http://localhost:8087";

	let receiveMessage = (event) => {
		if (event.origin !== permittedOrigin) {
			return;
		}
		if (event.data) {
			try {
				let json = JSON.parse(event.data);
				if (!json.docHeight || 'number' !== typeof json.docHeight) {
					return;
				}
				if (!json.iframe || 'string' !== typeof json.iframe) {
					return;
				}
				let iframe = document.getElementsByName(json.iframe);
				if (iframe.length) {
					iframe = iframe[0];
					iframe.style.height = json.docHeight + 'px';
				}
			} catch (error) {
				console.error(error.message);
			}
		}
	}

	window.addEventListener("message", receiveMessage, false);

})()
