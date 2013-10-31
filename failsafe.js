(function($) {

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
    this.buildTree(this.data);
    this.string += "</div>";
    
    this.$element.html(this.string);
    this.$failsafe = this.$element.find('.failsafe-data');
    
    this.extractData();
    
    this.addEvents();
  },
  addEvents: function() {
    this.$failsafe.find('.toggle-expand').on('click', $.proxy(this.toggleExpand, this));
  },
  removeEvents: function() {
    this.$failsafe.find('.toggle-expand').off('click');
  },
  
  toggleExpand: function(e) {
    e.stopPropagation();
    var $target = $(e.target);
    $target = $target.parent('.toggle-expand');
    if($target.hasClass('show')) {
      $target.removeClass('show');
    } else {
      $target.addClass('show');
    }
  },
  
  extractData: function() {
    console.log(this.data);
    if(typeof this.data.module !== "undefined") {
      if(typeof this.data.module.version !== "undefined") {
        var $title = this.$element.parent().children('a');
        $title.text($title.text() + ' Version = ' + this.data.module.version);
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
        this.string += "<i class='toggle-icon'>+</i>";
      }
      this.string += "<span class='key'>"+key+"</span>";
      if(type === "object") {
        this.string += "<div class='object'>";
        this.buildTree(value);
        this.string += "</div>";
      } else {
        this.string += "<span class='value'>" + value + "</span>";
      }
      this.string += "</div>";
    }
  }
}

$(".visuallyhidden pre").each(function() {
  new FailSafe($(this));
});

})(jQuery);