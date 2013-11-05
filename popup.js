var tablink = "";

function enableClick(e) {
  var newLink = updateQueryStringParameter(tablink, "failsafe", "true");
  chrome.tabs.executeScript(null,
      {code:"window.location.href='"+newLink+"'"});
  window.close()
}

function disableClick(e) {
  var newLink = tablink.replace("?failsafe=true","") || tablink.replace("&failsafe=true","")
  chrome.tabs.executeScript(null,
      {code:"window.location.href='"+newLink+"'"});
  window.close()
}

function enableImageWidths(e){
  chrome.tabs.executeScript(null,
      {code:"showIqInfo()"});
  $("#seeImageWidths").off("click", enableImageWidths);
  window.close()
}

$(document).on("ready", function(e){
   chrome.tabs.getSelected(null,function(tab) {
    tablink = tab.url;
    if (tablink.indexOf("failsafe=true") == -1)
        $("#failsafe").on("click", enableClick)
    else{
        $("#failsafe").addClass("disabled");
        $("#failsafe").on("click", disableClick)
    }
    chrome.tabs.executeScript(null, {code:"showIqInfoEnabled"}, function(results){
        if (results && results[0] && results[0] == true){
            $("#seeImageWidths").addClass("disabled");
        }else{
            $("#seeImageWidths").on("click", enableImageWidths);
        }
    });

    
  });   
})

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
  separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    if (uri.indexOf("#")>-1)
        return [uri.slice(0, uri.indexOf("#")), separator + key + "=" + value, uri.slice(uri.indexOf("#"))].join('');
    else
        return uri + separator + key + "=" + value;
  }
}
