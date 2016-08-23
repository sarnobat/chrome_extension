//alert('Content script loading');
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.debug('request = ' + request);
		console.debug('sender = ' + sender);
		console.debug('sendResponse = ' + sendResponse);
		var success =  document.getElementsByTagName("body")[0].innerHTML.startsWith("Success");
		if (success) {		
			// respond to background script telling it to close the tab
//			sendResponse({"foo":"bar"});
			sendResponse({
				tab: request.tab,
				counter: request.counter+1,
				message : "found success" 
			});
		} else {
			sendResponse({
				tab: request.tab,
				counter: request.counter+1,
				message : "did not yet succeed" 
			});
		}
	}
);
//alert('Content script loaded');