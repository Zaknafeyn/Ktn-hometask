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
    
    Obj.prototype.css = function(param1, param2, param3){
      
      if (param1 instanceof Object)
      {
        var self = this;
        for (var key in param1) {
          if (param1.hasOwnProperty(key)) {
            if (param2 !== undefined)
            {
              setTimeout(function(){
                self.assignCss(key, param1[key]);
              }, param2);
            }
            else
            {
              self.assignCss(key, param1[key]);
            }
          }
        }
        
        return this;
      }
      
      if (param2 === undefined) {
        // first param is an object
        for (var key in param1) {
          if (param1.hasOwnProperty(key)) {
            this.assignCss(key, param1[key]);
          }
        }
        
        return this;
      }
      
      if (param3 === undefined)
      {
        this.assignCss(param1, param2);
        return this;
      }
        
      var self = this;  
      setTimeout(function(){
        self.assignCss(param1, param2);
      }, param3);
      
      return this;
    };
    
    return new Obj(selector);
  }
  
  return SelectFunction;
})();
