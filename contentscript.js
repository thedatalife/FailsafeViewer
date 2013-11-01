(function(){

  // Injects script into page DOM on click of the plugin icon
  var startup = true;

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      init();
  });
  window.onload = function(){
    init();
  }

  function init(){
    if(startup == true) {
      startup = false;
      var s = document.createElement('script');
      s.src = chrome.extension.getURL('failsafe.js');
      (document.head||document.documentElement).appendChild(s);
      s.onload = function() {
          s.parentNode.removeChild(s);
      };
      
      var link = document.createElement('link');
      link.href =  chrome.extension.getURL('failsafe.css');
        //chrome-extension://<extension id>/main.css
      link.rel = 'stylesheet';
      document.documentElement.insertBefore(link);
      console.log("FailsafeViewer extension initialized");
    }
  }

})();
