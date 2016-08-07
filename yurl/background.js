
chrome.extension.onRequest.addListener(function(request, sender)
{
alert(JSON.stringify(request) );
//chrome.tabs.remove(request.tab, function (){})

});