// Find out the ID of the current tab
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	
	// Go immediately to background script.
	// This popup's thread of execution will get killed as soon as we move to another tab.
	chrome.extension.sendRequest({
		tab: tabs[0],
		message: "popup requested a close"
	});
});
