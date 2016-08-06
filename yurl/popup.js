//console.debug('popup 1');
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	//console.debug('tabs: ' + JSON.stringify(tabs));
	var tab = tabs[0];
	//console.debug('tabs: ' + tab.id);
	chrome.tabs.update(tab.id,
	{url: 'http://netgear.rohidekar.com/yurl/stash2.html?url=' + encodeURIComponent(tab.url) + '&nodeId=45' },
	function(){
		//console.debug('sending message 1');
		// Wait 5 seconds. It seems like sending it immediately doesn't give a chance for the content script to load
		setTimeout(function () {
			chrome.tabs.sendMessage(tab.id, {counter: 0}, null, function handler(response) {
				//console.debug('message 1 response received');
				chrome.tabs.remove(tab.id, function (){})
			});
			//console.debug('message 1 sent');
		}, 5000);
	});
});
//console.debug('popup 2');
