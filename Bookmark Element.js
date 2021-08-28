class bookmark {
  constructor(width, height, element, dropSize, inversion) {
    var size = customMap.get("bookmark-size")
    createCSSline(".bookmark", ["border: 1px solid","background-color: " + customMap.get("theme-color"),"display: none"])
    const that = this
    this.DropSize = dropSize
    this.book = element
    this.element = document.createElement("div")
    this.element.className = "bookmark"
    this.element.style.width = width*size + "px"
    this.element.style.height = height*size + "px"
    this.data = { width: width*size, height: height*size, dropSize: dropSize, book: this.book, element: this.element }
    var Data = that.data
     if(!inversion && (width >= height) ) {  Data.orintation = "down";  
     this.element.style.borderTop=0;
     this.element.style.borderBottomLeftRadius = 35 * size + "px"
     this.element.style.borderBottomRightRadius = 35 * size + "px"  
     }
   if(!inversion && (width <= height) ) { 
    Data.orintation = "right"      
    this.element.style.borderLeft=0; 
    this.element.style.borderTopRightRadius = 35 * size + "px"
    this.element.style.borderBottomRightRadius = 35 * size + "px"
    }
   if(inversion && (width <= height) ) {
    Data.orintation = "left"
    this.element.style.borderRight=0;
    this.element.style.borderTopLeftRadius = 35 * size + "px"
    this.element.style.borderBottomLeftRadius = 35 * size + "px"
     }
   if(inversion && (width >= height) ) {
    Data.orintation = "up"
    this.element.style.borderBottom=0; 
    this.element.style.borderTopRightRadius = 35 * size + "px"     
    this.element.style.borderBottomLeftRadius = 35 * size + "px" 
    }
  this.listeners = { open: function() {}, close: function() {} };
  this.openBook = function() {
     that.element.style.display = "none"    
     that.book.style.display = "block"     
     that.listeners.open()
     window.onresize()
     };
  this.closeBook = function() {
      that.book.style.display = "none"
      that.element.style.display = "block"
      that.listeners.close()
      window.onresize()
    };
  
  this.active = false
   this.take = function(e) {
     e = executor.handle(e)
     that.active = { sx: e.x, sy: e.y}
    };
  
   this.move = function(e) {
     e = executor.handle(e)
     if(that.active) {
      var progres = 0
      if(Data.orintation == "down") { 
        progres = e.y - that.active.sy
         if(progres > that.DropSize) {
          that.openBook();
          that.active = false; 
         }
       }
    if(Data.orintation == "up") {
     progres = that.active.sy - e.y
      if(progres > that.DropSize) {
       that.openBook();
       that.active = false; 
       }
     }
   if(Data.orintation == "right") {
    progres = e.x - that.active.sx
     if(progres > that.DropSize) {
      that.openBook();
      that.active = false; 
      }
    }
   if(Data.orintation == "left") { 
    that.active.sx - e.x
     if(progres > that.DropSize) {
      that.openBook();
      that.active = false; 
      }
   }
     var color = "rgba(" + canvas.color[0] +","+ canvas.color[1]+","+ canvas.color[2]+","
     color = color + Math.abs(progres)/that.DropSize + ")"
     that.element.style.backgroundColor = color
      }
   };
  
   this.drop = function() { that.active = false; that.element.style.backgroundColor="white" };  
   this.on_open = function(f) { that.listeners.open = f }
   this.on_close = function(f) { that.listeners.close = f };
   that.element.addListener(that.take, that.move, that.drop)
    }
  }