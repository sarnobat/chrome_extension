// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
	chrome.tabs.sendRequest(tab.id, {counter: c}, function handler(response) {
		console.debug('response: ' + JSON.stringify(response));
		setChildTextNode("resultsRequest", "1 done: " + JSON.stringify(response));
		c = response.counter;
	});
    
  });
}

// Tests the roundtrip time of Port.postMessage() after opening a channel.
function testConnect() {
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#testRequest').addEventListener(
      'click', testRequest);
  document.querySelector('#testConnect').addEventListener(
      'click', testConnect);
});
