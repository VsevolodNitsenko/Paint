  class Panel {
  constructor(size, savecode) {
  const that = this
  const width = 100
  this.active = false
  this.body = document.createElement("div")
  this.transperent = document.createElement("canvas")
  this.colors = document.createElement("div")
  that.colors.style.position = "fixed"
  that.body.append(that.colors)

  this.body.style.width = size * width*2 + "px"
  this.body.style.height = window.innerHeight + "px"
  this.body.className = "panelBody"
  this.body.style.maginTop = "-2px"
  this.body.style.position = "fixed"
  this.body.style.border = "2px solid"
  this.body.style.overflow = "hidden"
  this.body.style.backgroundColor = customMap.get("theme-color")

  this.body.addResizeMap(function(e) {
      e.style.borderRadius = e.offsetWidth/2 + "px/" + innerHeight /2 + "px"
      e.style.marginLeft = innerWidth - e.offsetWidth/2 + "px"
      e.style.height = innerHeight + "px"
      that.transperent.height = innerHeight
      that.transperent.style.marginLeft = that.body.offsetWidth/2 - that.transperent.width+ "px"
      that.colors.style.width = 20 * size +"px"
      that.colors.style.marginLeft = 50*size + "px"
      that.colors.style.marginTop = innerHeight/(e.offsetWidth/2) * 20 * size + "px"
      that.update()
    })
  this.body.ondblclick=function() { 
      var data = canvas.getColor(true)
      navigator.clipboard.writeText(data)
      .then(() => {
       mess("active color coppied!")
       })
      .catch(err => {
      mess("failed to copy color: Browser don't support clipboard")
       })
   }
  this.transperent.height = innerHeight
  this.transperent.width = 15*size
  //this.transperent.style.border = "1px dotted"
  that.body.append(this.transperent)

  this.t = 0
   this.start = function() {
    if(!that.active) {
     that.active = that.transperent.getContext("2d")
     }
  };
  
 this.move = function(y) {
   if(panel.active) {
    var ctx = panel.active
    ctx.fillStyle = canvas.getColor()
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height)
    ctx.clearRect(0,0,ctx.canvas.width,y)
    that.t = y
    var a = eval( (1 - that.t/innerHeight).toFixed( customMap.get("panel-alpha-dot-length") ) )
     if(a > 1) { a = 1 }
     canvas.color[3] = a; canvas.canvas.getContext("2d").globalAlpha=a
     mess("Alpha " + a)
     }
   that.body.style.borderColor=canvas.getColor(); executor.changeBackground()
  };
 
 this.end = function() { if(panel.active) { that.active=false } };
 
 this.update = function() {
   that.t = (1-canvas.color[3]) * innerHeight
   var ctx = that.transperent.getContext("2d")
   ctx.fillStyle = canvas.getColor()
   ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height)
   ctx.clearRect(0,0,ctx.canvas.width,panel.t - innerHeight/20)
   that.body.style.borderColor=ctx.fillStyle
   if(tools.mode.active) { tools.mode.switch(0) }; executor.changeBackground()
    }
  this.transperent.addListener(that.start, function(e) { e=executor.handle(e); that.move(e.y) }, that.end);

  this.code = savecode
  createCSSline(".toog", ["border: 1px solid",
                          "margin-top 8px",
                          "width: " + 20 * size + "px", 
                          "height: " + 20 * size + "px",
                          "border-radius: " + 5 * size + "px"])
  createCSSline(".toog:hover", ["border-radius: " + 15 * size + "px"])
  createCSSline(".toog:active", ["border: 2px solid"])
  
  that.colorEditor = {
    deletedColor: null,
    colors: [],
    max_length: 1,
    change_max_length: function(v) {
     editor.max_length = v
     localStorage.setItem(that.code + "max_length", v)
      },
  
    delete: function(element) {
    for(var i = 0;  i < editor.colors.length; i++) {
     var color = editor.colors[i]
     if(color.element == element) { 
        editor.deletedColor = color; 
        localStorage.setItem(that.code + color.n, "")
           break
         }
       }; editor.strokeColors()
     },
  
    canselDelete: function() {
     if(editor.deletedColor) {
     var color = editor.deletedColor
     if(color.n > editor.max_length) { editor.change_max_length(color.n+1) }
     localStorage.setItem(that.code + color.n, color.id)
        }; editor.strokeColors();
      },
  
    edit: function(rgb) {
       var c = []
     var i = 0; // start edit
     for(i = i; i < rgb.length; i++) { if(rgb[i] == "(") { break } }
     var f = ""
     for(i = i+1; i < rgb.length; i++) {
      if(rgb[i] != ")") {
       if(rgb[i] == ",") { c.push( eval(f) ); f = "" } else { f += rgb[i] }
             } else { break }
           } 
         c.push( eval( f )); return c
     },
  
    save: function() {
     editor.change_max_length(editor.max_length+1)
     var color = canvas.getColor(true)
     localStorage.setItem(that.code + editor.max_length, color)
     editor.strokeColors()
      },
  
    vote: function(element) {
    for(var i = 0;  i < editor.colors.length; i++) {
     var color = editor.colors[i]
     if(color.element == element) { 
        canvas.color = color.color.copy(); that.update()
          break
         }
       }
     },
  
    strokeColors: function() {
    that.colors.innerHTML = ""
    editor.loadColors()
    for(var i = 0; i < editor.colors.length; i++) {
     var color = editor.colors[i]
      var d = document.createElement("div")
       d.className="toog"
       d.style.backgroundColor = color.id
       d.id="t" + color.n
       d.style.width = 18 * size + "px"
       d.style.height = 18 * size + "px"
       d.style.marginTop = 8 * size + "px"
       d.onclick=function(e) {
         if(!e.altKey && !executor.alt) {
            that.colorEditor.vote(this)
             } else { that.colorEditor.delete(this) }
           }; 
        that.colorEditor.colors[i].element = d
        that.colors.append(d)
         }
      },
  
    loadColors: function() {
     editor.max_length = eval( localStorage.getItem(that.code + "max_length") )
     editor.colors = []
     for(var i = 0; i <= editor.max_length; i++) {
       var p = localStorage.getItem(that.code + i)
       if(p != "" && p != null) { editor.colors.push({ color: editor.edit(p), id: p, n: i }) }
         }
      },
    restoreDefault: function() {
     for(var i = 0; i <= editor.max_length; i++) { localStorage.removeItem(that.code + i) }
     localStorage.removeItem(that.code + "max_length"); 
     editor.max_length = 1; editor.loadColors(); editor.stroke()
       }
    }; var editor = that.colorEditor
  }
}