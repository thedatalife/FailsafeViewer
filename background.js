chrome.extension.onRequest.addListener(function (msg, sender, sendResponse) {
   var copyFrom = $('<textarea/>');
   // now we put the message in the textarea
   copyFrom.text(msg.text);
   $('body').append(copyFrom);
   // and copy the text from the textarea
   copyFrom.select();
   document.execCommand("copy", false, null);
   // finally, cleanup / close the connection
   copyFrom.remove();
   sendResponse({});
 });