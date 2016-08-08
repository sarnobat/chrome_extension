
chrome.extension.onRequest.addListener(function(request, sender)
{


	if (request.message == "popup requested a close") {

		var tab = request.tab;	
		chrome.tabs.update(request.tab.id,
			{url: 'http://netgear.rohidekar.com/yurl/stash2.html?url=' + encodeURIComponent(tab.url) + '&nodeId=45' },
	
			// Do all the closing related logic
			function(){

				repeatedlyAttemptClose(tab);
			});		
	} else if (request.message = "inner HTML starts with success? true") {
		// This will never get called, delete this case
	
		console.debug("DON'T DO HERE: GotresponseGot response from background script");	
		
		//chrome.tabs.remove(request.tab.id, function (){});
		//alert(JSON.stringify(request) );
	}

});

function repeatedlyAttemptClose(tab){

	// Wait 5 seconds. It seems like sending it immediately doesn't give a chance for the content script to load
	setTimeout(function () {
		console.debug("Checking if stashing was successful....");
		// Check if stash was successful
		chrome.tabs.sendMessage(tab.id, {tab: tab.id, counter: 0, message : "was stashing tab " + tab.id +  " successful?" }, null, function handler(response) {
			console.debug("Received response");
			console.debug(response.message);
			if (response.message == 'found success') {
				console.debug('Able to close tab ' + tab.id);
				chrome.tabs.remove(tab.id, function (){});
			} else {
				//console.debug('Cannot close');
				repeatedlyAttemptClose(tab);
			}
		});
	}, 5000);


}