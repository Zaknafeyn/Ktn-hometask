// Your code goes here
'use strict';

var my_$ = (function (selector) {
  
  function SelectFunction (selector){
    
    var Obj = function(selector){
      this.nodes = document.querySelectorAll(selector);
      this.length = this.nodes.length;
    }
      
    Obj.prototype.width = function(w){
      if (w === undefined) var arr = [];
        
        for(var i=0; i < this.length; i++){
          if (w === undefined)
            arr.push(this.nodes[i].style.width || '0px')
          else
            this.nodes[i].style.width = w;
        };
        
        return w === undefined ? arr : this;
    };
    
    Obj.prototype.height = function(h){
      if (h === undefined) var arr = [];
        
        for(var i=0; i < this.length; i++){
          if (h === undefined)
            arr.push(this.nodes[i].style.height || '0px')
          else
            this.nodes[i].style.height = h;
        };
        
        return h === undefined ? arr : this;
    };
    
    Obj.prototype.assignCss = function(property, value){
        for (var i=0; i < this.length; i++){
          this.nodes[i].style[property] = value;
        }
        
        return this;
    };
    
    Obj.prototype.css = function(property, value){
        this.assignCss(property, value);
    };
    
    return new Obj(selector);
  }
  
  return SelectFunction;
})();
