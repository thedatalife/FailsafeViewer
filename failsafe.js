var FailSafe = function($element) {
  this.$element = $element;
  this.data = $.parseJSON($element.text());
  this.init();
}

FailSafe.prototype = {
  init: function() {
    this.$element = this.$element.parent();
    this.$element.empty();
    
    this.string = "<div class='failsafe-data'>";
    this.string += "<button class='toggle-expandAll'>Expand all</button>";
    this.string += "<button class='toggle-collapseAll'>Collapse all</button>";
    this.string += "<button class='toggle-copyAll'>Copy JSON</button>";
    this.buildTree(this.data);
    this.string += "</div>";
    
    this.$element.html(this.string);
    this.$failsafe = this.$element.find('.failsafe-data');
    
    this.extractData();
    
    this.addEvents();
  },
  addEvents: function() {
    this.$failsafe.find('.toggle-expand').on('click', $.proxy(this.toggleExpand, this));
    this.$failsafe.find('.toggle-expandAll').on('click', $.proxy(this.toggleExpandAll, this));
    this.$failsafe.find('.toggle-collapseAll').on('click', $.proxy(this.toggleCollapseAll, this));
    this.$failsafe.find('.toggle-copyAll').on('click', $.proxy(this.toggleCopyAll, this));
    this.$failsafe.find('.toggle-icon.copy').on('click', $.proxy(this.toggleCopySection, this));


  },
  removeEvents: function() {
    this.$failsafe.find('.toggle-expand').off('click');
    this.$failsafe.find('.toggle-expandAll').off('click');
    this.$failsafe.find('.toggle-collapseAll').off('click');
    this.$failsafe.find('.toggle-copyAll').off('click');
    this.$failsafe.find('.toggle-icon.copy').off('click');
  },
  toggleCopySection: function(e){
    var target = e.currentTarget;
    var json_data = JSON.parse($(target).attr("data-copy-data"));
    chrome.extension.sendRequest({ text: JSON.stringify(json_data, null, 2) });
  },
  toggleCopyAll: function(e){
    //Send results to Backgrond Page
    e.stopPropagation();
    chrome.extension.sendRequest({ text: JSON.stringify(this.data, null, 2) });
  },
  toggleCollapseAll: function(e){
    e.stopPropagation();
    var $target = $(e.target).parent();
    $target.find(".toggle-expand").removeClass("show");    
  },
  toggleExpandAll:function(e){
    e.stopPropagation();
    var $target = $(e.target).parent();
    $target.find(".toggle-expand").removeClass("show").addClass("show");
  },  
  toggleExpand: function(e) {
    e.stopPropagation();
    var $target = $(e.target);
    if ($target.hasClass("copy")) return;
    $target = $target.parent('.toggle-expand');
    if($target.hasClass('show')) {
      $target.removeClass('show');
    } else {
      $target.addClass('show');
    }
  },
  
  extractData: function() {
    
    if(typeof this.data.module !== "undefined") {
      if(typeof this.data.module.version !== "undefined") {
        var $title = this.$element.parent().children('a');
        $title.html($title.text() + ' <span class=\'version\'>(Version = ' + this.data.module.version +')</span> ');
      }
    }
  },
  
  buildTree: function(object) {
    var value, type, classes;
    for(var key in object) {
      value = object[key];
      type = typeof value;
      if(type === "object") { classes = "toggle-expand"; }
      if(type === "string") { classes = "string"; }
      if(type === "number") { classes = "number"; }
      
      this.string += "<div class='"+ classes +"'>";
      if(type === "object") {
        this.string += "<a class='toggle-icon' title='Expand JSON' href='javascript:void(0);'>+</a>";
        this.string += " <a class='toggle-icon copy' title='Copy to Clipboard' data-copy-data='"+JSON.stringify(value)+"' href='javascript:void(0);'></a>";
      }
      key += (value && value.version)? " <span class='version'>(Version = "+value.version+")</span>" : "";
      this.string += "<span class='key'>"+key+"</span>";
      if(type === "object") {
        if ($.isEmptyObject(value))
          this.string += "<span class='value'>{#empty#}</span>";  
        else{
          this.string += "<div class='object'>";
          this.buildTree(value);
          this.string += "</div>";
        }
      } else {
        this.string += "<span class='value'>" + value + "</span>";
      }
      this.string += "</div>";

    }
  }
}