chrome.browserAction.onClicked.addListener(function(tab) {

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		console.debug('button clicked: ' + tabs[0]);
		
		var tab = tabs[0];	
		
		if (tab.url.startsWith('http://netgear')) {
			console.debug('Accidental double click');
		}
		
		var other = 29172;
		var root = 45;
		var tech = 46;
		var products = 29196;
		chrome.tabs.update(tab.id,
			{url: 'http://netgear.rohidekar.com/yurl/stash2.html?url='
				+ encodeURIComponent(tab.url)
				+ '&nodeId=' + products },

			// Do all the closing related logic
			function(){
				repeatedlyAttemptClose(tab);
			});	
	});

});

function repeatedlyAttemptClose(tab){
	console.debug('repeatedlyAttemptClose() begin');
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

// Delete this. Neither case ever occurs.
chrome.extension.onRequest.addListener(function(request, sender) {
	if (request.message == "popup requested a close") {
		console.debug('delete this, it is never called');
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
				+ '&nodeId=' + other },

			// Do all the closing related logic
			function(){
				repeatedlyAttemptClose(tab);
			});		
	} else if (request.message = "inner HTML starts with success? true") {
		// This will never get called, delete this case
		console.debug("This will never get called, delete this case");	
	}
});

