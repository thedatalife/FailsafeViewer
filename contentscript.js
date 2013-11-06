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
    if (document.location.href.indexOf("showImgInfo=true") > -1){
        iQInfo.showIqInfo();
    }
    // showIqInfo();
    console.log("FailsafeViewer Chrome Extension initialized");
}

// requires: 
//      jQuery
// adds the 

var iQInfo = (function(){
    var showIqInfoEnabled  = false
    function iQInfoElement(info_string){
        return $('<div class="iq-info-div">'+info_string+'</div>').get(0);
    }
    function showIqInfo(){
        if (showIqInfoEnabled) return;
        showIqInfoEnabled = true;
        $(".iq-img").each(function(index,elm){
            var infoString = '';
            infoString += "desktop: <a href=\""+$(elm).data("src-desktop")+"\" target=\"_blank\">"+ getURLParameter($(elm).data("src-desktop"), "wid") + "px</a>, ";
            infoString += "desktop-2X: <a href=\""+$(elm).data("src-desktop-highres")+"\" target=\"_blank\">"+ getURLParameter($(elm).data("src-desktop-highres"), "wid")+ "px</a><br>";
            infoString += "tablet: <a href=\""+$(elm).data("src-tablet")+"\" target=\"_blank\">"+ getURLParameter($(elm).data("src-tablet"), "wid") + "px</a>, ";
            infoString += "tablet-2X: <a href=\""+$(elm).data("src-tablet-highres")+"\" target=\"_blank\">"+ getURLParameter($(elm).data("src-tablet-highres"), "wid")+ "px</a><br>";
            infoString += "phone: <a href=\""+$(elm).data("src-phone")+"\" target=\"_blank\">"+ getURLParameter($(elm).data("src-phone"), "wid") + "px</a>, ";
            infoString += "phone-2X: <a href=\""+$(elm).data("src-phone-highres")+"\" target=\"_blank\">"+ getURLParameter($(elm).data("src-phone-highres"), "wid")+ "px</a>";
            var newElement = iQInfoElement(infoString);
            $(elm).after(newElement);
            $(newElement).draggable();
        })
    }
    function getURLParameter(string, name) {
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(string)||[,null])[1]
        );
    }
    return api = {
        showIqInfoEnabled: {
            get: function(){return showIqInfoEnabled}
        },
        showIqInfo: function(){showIqInfo()}
    }
})()
