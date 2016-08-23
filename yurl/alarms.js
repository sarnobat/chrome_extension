// 0.1 takes too much processing. Every 30-60 secs would be better.
chrome.alarms.create("Close unprivileged stashed windows", { 
	delayInMinutes: 0.1,
	periodInMinutes: 0.1
});
       
chrome.alarms.onAlarm.addListener(function( alarm ) {

	chrome.tabs.getAllInWindow(null, function(tabs){
		for (var i = 0; i < tabs.length; i++) {
			//chrome.tabs.sendRequest(tabs[i].id, { action: "xxx" });
			var tab = tabs[i];
			var url = tabs[i].url;
//			console.log("-");
			if (url.includes('netgear.rohidekar.com/yurl/stash2.html')) {
				console.log("(sending message to stashed tab - but may not be successful yet)");
				chrome.tabs.sendMessage(tab.id, {tab: tab.id, counter: 0, message : "was stashing tab " + tab.id +  " successful?" }, null, function handler(response) {
					console.debug(response.message);
					if (response.message == 'found success') {
						chrome.tabs.remove(tab.id, function (){});
					} else {
						console.debug('Cannot close yet, will try again later');
					}
				});
			}
		}
	});
});

//chrome.alarms.create("Close unprivileged stashed windows", object alarmInfo);
