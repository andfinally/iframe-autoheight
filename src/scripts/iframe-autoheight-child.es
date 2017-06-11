/*
 * Add iframe-autoheight-child.min.js to the page inside the iframe.
 */

(() => {

	document.ready = new Promise(function(resolve) {
		if (document.readyState === 'complete') {
			resolve();
		} else {
			function onReady() {
				resolve();
				document.removeEventListener('DOMContentLoaded', onReady, true);
				window.removeEventListener('load', onReady, true);
			}

			document.addEventListener('DOMContentLoaded', onReady, true);
			window.addEventListener('load', onReady, true);
		}
	});

	function debounce(a, b, c) {
		var d;
		return function() {
			var e = this, f = arguments;
			clearTimeout(d), d = setTimeout(function() {
				d = null, c || a.apply(e, f)
			}, b), c && !d && a.apply(e, f)
		}
	}

	let sendPageHeight = () => {
		let docHeight = document.documentElement.offsetHeight;
		let message = {
			"iframe"   : window.name,
			"docHeight": docHeight
		};
		top.postMessage(JSON.stringify(message), '*');
	}

	document.ready.then(sendPageHeight);
	window.addEventListener('resize', debounce(sendPageHeight, 500));

})();
