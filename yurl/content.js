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
  
  	console.debug('1 chrome.extension.onRequest.addListener: ' + request);
	var success =   document.getElementsByTagName("body")[0].innerHTML.startsWith("Success");
	console.debug('inner HTML = ' + success);
	if (success) {
		// send to background script
		chrome.extension.sendRequest({tab: request.tab, message: "inner HTML starts with success? " + success});
		
		// send to popup
		sendResponse({tab: request.tab, counter: request.counter+1, message : "found success" });
	} else {

	}
  });

var n = 0;
