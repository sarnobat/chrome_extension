// Find out the ID of the current tab
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	var tab = tabs[0];
	
	
	
	// TODO: Go immediately to background script. This popup's thread of execution will get killed as soon as we move to another tab.
	
	
	// invoke the stash operation
	chrome.tabs.update(tab.id,
		{url: 'http://netgear.rohidekar.com/yurl/stash2.html?url=' + encodeURIComponent(tab.url) + '&nodeId=45' },
		
		// Do all the closing related logic
		function(){
			// Wait 5 seconds. It seems like sending it immediately doesn't give a chance for the content script to load
			setTimeout(function () {
				chrome.tabs.sendMessage(tab.id, {tab: tab.id, counter: 0, message : "was stashing tab " + tab.id +  " successful?" }, null, function handler(response) {

					console.debug(response.message);
					if (response.message == 'found success') {
						console.debug('Able to close tab ' + tab.id);
						//chrome.tabs.remove(tab.id, function (){})
					} else {
						console.debug('Cannot close');
					}
				});
			}, 20000);
		});
});
