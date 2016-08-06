chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	var tab = tabs[0];
	chrome.tabs.update(tab.id,
	{url: 'http://netgear.rohidekar.com/yurl/stash2.html?url=' + encodeURIComponent(tab.url) + '&nodeId=45' },
	function(){
		// Wait 5 seconds. It seems like sending it immediately doesn't give a chance for the content script to load
		setTimeout(function () {
			chrome.tabs.sendMessage(tab.id, {counter: 0}, null, function handler(response) {
				chrome.tabs.remove(tab.id, function (){})
			});
		}, 5000);
	});
});
