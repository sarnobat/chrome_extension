
chrome.extension.onRequest.addListener(function(request, sender)
{
	if (request.message == "popup requested a close") {

		var tab = request.tab;	
		
		if (tab.url.startsWith('http://netgear')) {
			console.debug('Accidental double click');
		}
		
		var other = 29172;
		var root = 45;
		var tech = 46;
		chrome.tabs.update(request.tab.id,
			{url: 'http://netgear.rohidekar.com/yurl/stash2.html?url='
				+ encodeURIComponent(tab.url)
				+ '&nodeId=' + 46 },

			// Do all the closing related logic
			function(){
				repeatedlyAttemptClose(tab);
			});		
	} else if (request.message = "inner HTML starts with success? true") {
		// This will never get called, delete this case
		console.debug("This will never get called, delete this case");	
	}
});

function repeatedlyAttemptClose(tab){

	// Wait 5 seconds. It seems like sending it immediately doesn't give a chance for the content script to load
	setTimeout(function () {
		// Check if stash was successful
		chrome.tabs.sendMessage(tab.id, {tab: tab.id, counter: 0, message : "was stashing tab " + tab.id +  " successful?" }, null, function handler(response) {
			console.debug(response.message);
			if (response.message == 'found success') {
				chrome.tabs.remove(tab.id, function (){});
			} else {
				console.debug('Cannot close yet, will try again in 5 seconds');
				repeatedlyAttemptClose(tab);
			}
		});
	}, 5000);
}