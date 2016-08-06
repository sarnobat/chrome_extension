// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/*
chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
	console.debug('chrome.runtime.onConnect.addListener');
    sendResponse({counter: request.counter+1});
//    port.postMessage({counter: msg.counter+1});
  });
});
*/
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.debug('1 chrome.extension.onRequest.addListener');
	var success =   document.getElementsByTagName("body")[0].innerHTML.startsWith("Success");
	console.debug('inner HTML = ' + success);
	if (success) {
		sendResponse({counter: request.counter+1});
	} else {

	}
  });

var n = 0;
function sendMessageWhenSuccessful() {
	console.debug('tick');
	setTimeout(function () {
		console.debug('tick ' + n);
		if (n >10) {
					//window.location.href = 'http://netgear.rohidekar.com/yurl/stash2.html?url=' + encodeURIComponent(document.URL) + '&nodeId=45';
		} else {
			 n +=1;
//			 sendMessageWhenSuccessful();
		}
//			if (n < 10) {
//				++n;
//				sendMessageWhenSuccessful();
//			}
		sendMessageWhenSuccessful();
	}, 1000);

}


function myMain (evt) {
 	alert("static html loaded");
}