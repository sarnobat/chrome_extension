// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function setChildTextNode(elementId, text) {
	console.debug("setChildTextNode("+elementId+")");
  document.getElementById(elementId).innerText = text;
}

// Tests the roundtrip time of sendRequest().
function testRequest() {
  setChildTextNode("resultsRequest", "1 running...");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	//console.debug('tabs: ' + JSON.stringify(tabs));
	var tab = tabs[0];
	console.debug('tabs: ' + tab.id);
	chrome.tabs.sendRequest(tab.id, {counter: 1}, function handler(response) {
		console.debug('response: ' + JSON.stringify(response));
	});
    
  });
}

// Tests the roundtrip time of Port.postMessage() after opening a channel.
function testConnect() {
  setChildTextNode("resultsConnect", "2 running...");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {


    var port = chrome.tabs.connect(tabs[0].id);
    port.postMessage({counter: 1});
    port.onMessage.addListener(function getResp(response) {
      if (response.counter < 1000) {
        port.postMessage({counter: response.counter});
      } else {
        setChildTextNode("resultsConnect", "2 usec");
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#testRequest').addEventListener(
      'click', testRequest);
  document.querySelector('#testConnect').addEventListener(
      'click', testConnect);
});
