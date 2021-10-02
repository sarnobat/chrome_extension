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
	chrome.tabs.sendMessage(tab.id, {counter: c}, null, function handler(response) {
		console.debug('response: ' + JSON.stringify(response));
		setChildTextNode("resultsRequest", "1 done: " + JSON.stringify(response));
		c = response.counter;
	});
    
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#testRequest').addEventListener('click', testRequest);
});
