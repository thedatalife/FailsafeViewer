var tablink = "";

function click(e) {
  var newLink = updateQueryStringParameter(tablink, "failsafe", "true");
  chrome.tabs.executeScript(null,
      {code:"window.location.href='"+newLink+"'"});
  window.close()
}

$(document).on("ready", function(e){
   chrome.tabs.getSelected(null,function(tab) {
    tablink = tab.url;
    if (tablink.indexOf("failsafe=true") == -1)
        $("#failsafe").on("click", click)
    else
        $("#failsafe").addClass("disabled");
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
