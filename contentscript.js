//Main
window.onload = function(){
    //Add stylesheet
    var link = document.createElement('link');
    link.href =  chrome.extension.getURL('failsafe.css');
      //chrome-extension://<extension id>/main.css
    link.rel = 'stylesheet';
    document.documentElement.insertBefore(link);

    $(".visuallyhidden pre").each(function() {
      new FailSafe($(this));
    });

    console.log("FailsafeViewer Chrome Extension initialized");
}