# iframe-autoheight

Snippet which uses postMessage to automatically set the height of an iframe to fit the height of the page inside it. Requires you to add a script to the page inside the iframe.

https://github.com/andfinally/iframe-autoheight

## How to use

* Copy the two scripts `iframe-autoheight-parent.min.js` and `iframe-autoheight-child.min.js` and the stylesheet `iframe-autoheight.css` from the `dist` folder to your server.
* Include `iframe-autoheight-parent.min.js` and `iframe-autoheight.css` in the parent page that contains the iframe.
* Include `iframe-autoheight-child.min.js` in the child page inside the iframe.
* Ensure your iframe has a `name` attribute and give it the class `iframe-autoheight`. I also recommend `scrolling` and `frameborder` attributes like in this example:
    `<iframe src="content.html" name="nom" class="iframe-autoheight" scrolling="no" frameborder="0"></iframe>`
* Change `permittedOrigin` in `iframe-autoheight-parent.min.js` to the hostname of the page inside the iframe. For example, if the URL of the child page is `https://mysite.com/content`, `permittedOrigin` should be `https://mysite.com`.
* The script in the page inside the iframe sends a postMessage to the parent page on `DOMContentLoaded` or on load, and also whenever it's resized.
* The script in the parent page adjusts the height of the iframe to fit the height of the `document` element in the child page.

## Requirements

* Iframe must have a `name` attribute.
* Iframe must have `class` attribute `iframe-autoheight` to take on the simple styles defined in `iframe-autoheight.css`.
* Iframe should have `scrolling` attribute `no`.
* `event.origin` in the parent page must match the origin of the page in the iframe.

## Page loading

* The script in the parent page needs to be parsed before the one in the page inside the iframe. If the parent page has a lot of slow-loading content you may find you need to place the parent script higher up in the loading order of the page, for example in the head element.

## Improvements

* We should add top and bottom margins to the calculation of height in `iframe-autoheight-child.es`.
* We could optimise the parent script by splitting it into two, one small part caching all postMessages received, and the other processing the cached messages once it's loaded.

## Demo and development

* `gulp` to start a watch process which transpiles the ES6 and SASS files in `src` and copies the resulting files to the `dev` and `dist` folders.
* `gulp start` to run the build, start serving the demo at http://localhost:8087, and start the watch process.
