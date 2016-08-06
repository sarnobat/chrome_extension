function setChildTextNode(elementId, text) {
	console.debug("setChildTextNode("+elementId+")");
  document.getElementById(elementId).innerText = text;
}

var c = 1;
// Tests the roundtrip time of sendRequest().
function testRequest() {
  setChildTextNode("resultsRequest", "1 running...");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	//console.debug('tabs: ' + JSON.stringify(tabs));
	var tab = tabs[0];
	console.debug('tabs: ' + tab.id);
	
	chrome.tabs.update(tab.id,
		{url: 'http://netgear.rohidekar.com/yurl/stash2.html?url=' + encodeURIComponent(tab.url) + '&nodeId=45' },
		function(){
			console.debug('sending message 1');
			
			// Wait 5 seconds. It seems like sending it immediately doesn't give a chance for the content script to load
			setTimeout(function () {
				chrome.tabs.sendMessage(tab.id, {counter: c}, null, function handler(response) {
					console.debug('message 1 response received');
					setChildTextNode("resultsRequest", "1 done: " + JSON.stringify(response));
					
					chrome.tabs.remove(tab.id, function (){})

				});
				console.debug('message 1 sent');
			}, 5000);
			

	});
/*
	console.debug('sending message 2');
	chrome.tabs.sendMessage(tab.id, {counter: c}, null, function handler(response) {
		console.debug('message 2 response received');
//		setChildTextNode("resultsRequest", "1 done: " + JSON.stringify(response));
	});
*/	
	
  });
}

var n = 0;
function sendMessageWhenSuccessful() {
//	console.debug('tick');
	setTimeout(function () {
		console.debug('tick ' + n);
		if (n >10) {
		
			chrome.tabs.getSelected(null, function(tab) {
				chrome.tabs.sendRequest(tab.id, {method: "getText"}, function(response) {
					if(response.method=="getText"){
						var alltext = response.data;
						console.debug('alltext: ' + alltext);
					}
				});
			});
		
					//window.location.href = 'http://netgear.rohidekar.com/yurl/stash2.html?url=' + encodeURIComponent(document.URL) + '&nodeId=45';
		} else {
			 n +=1;
			 sendMessageWhenSuccessful();
		}
//			if (n < 10) {
//				++n;
//				sendMessageWhenSuccessful();
//			}
//		sendMessageWhenSuccessful();
	}, 100);

}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#testRequest').addEventListener('click', testRequest);
});
