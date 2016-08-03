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
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
  	console.debug('1 chrome.extension.onRequest.addListener');
    sendResponse({counter: request.counter+1});
  });
