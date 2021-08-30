  class Palette {
     constructor(size) {
     const that = this
     const Size = size
     this.body = document.createElement("div")
       that.body.className = "paletteBody"
       that.body.ondblclick = function(e) {
       if(e.target == this) {
       var margin = (that.body.offsetWidth - 255 * Size)/2
       for(var i = 0; i < 3; i++) {
       var left = that.colors[i].offsetLeft - margin + that.colors[i].offsetWidth/2
       canvas.color[i] = Math.round(left/Size)
           }
       panel.update()
           }
         }; createCSSline(".paletteBody", ["position: fixed",
                                           "z-index: 2", 
                                           "border: 1px solid",
                                           "width: " + 330 * size + "px",
                                           "height: " + 190*size + "px",
                                           "border-radius: " + 300 * size/8 + "px/" + 190 * size/2 + "px",
                                           "background-color: " + customMap.get("theme-color")])
  
      this.colors = []
      this.changeColor = {
       start: function(element) {
        for(var i = 0; i < that.colors.length; i++) {
         if(that.colors[i] == element) { that.changeColor.active = "" + i; break }
           }
         that.changeLineWidth.use()
         },
       move: function(left) {
       var colorId = that.changeColor.active
       if(colorId) {
        var margin = (that.body.offsetWidth - 255 * Size)/2
        if(left > margin && left < that.body.offsetWidth - margin) {
         change( (left-margin)/Size )
          }
        else if(left < margin) { change(1) }
        else { change(255) }
        function change(position) {
           var Color = Math.round( position )
           var swch = that.colors[colorId]
            if(colorId == "0") {  /* swch.style.color = "rgb(" + Color + ",0,0)";*/ mess("color red: # " + Color); }
            else if(colorId == "1") {  /*swch.style.color = "rgb(0," + Color + ",0)";*/ mess("color green: # " + Color) }
            else { /* swch.style.color = "rgb(0,0," + Color + ")";*/ mess("color blue: # " + Color) }
            swch.style.marginLeft = (position * size - swch.offsetWidth/2 + margin) + "px"  
            canvas.color[colorId] = Color
            that.changeLineWidth.update(canvas.width)
            panel.update()
              }
            }
         },
       end: function() {
        that.changeColor.active = false
        that.changeLineWidth.hide()
          }
      };
  
      this.changeLineWidth = {
       start: function(e) {
        e = executor.handle(e)
        var vect = "left"
        if(toElement(that.body, e.x).x > that.body.offsetWidth/2) { vect = "right" }
          that.changeLineWidth.active = [e.x, canvas.width, vect]
          that.changeLineWidth.use()
        },
       move: function(e) {
        e = executor.handle(e)
        var abs = e.x
        if(that.changeLineWidth.active) {
          var width = that.changeLineWidth.active[1]
          if(that.changeLineWidth.active[2] == "right") {
            width = width + (abs - that.changeLineWidth.active[0])
         }
        else {  width = width + (that.changeLineWidth.active[0] - abs)  }
  
        if(width < 0) { width = 1 }; width = Math.round(width)
         mess("line width #" + width)
         that.changeLineWidth.update(width)
             }; panel.update()
           },
       end: function() {
        that.changeLineWidth.active = false
        that.changeLineWidth.hide()
           },
       hide: function() {
         that.changeLineWidth.hideP = true
         var speed = 0.02
         var ctx = that.lineWidth.getContext("2d")
         var a = 1
         function p() {
          if(a > 0 && that.changeLineWidth.hideP) {
            a = a - speed; ctx.globalAlpha = a; that.changeLineWidth.update(canvas.width); setTimeout(p, 25);
               } else {  that.changeLineWidth.hideP = false  }
             }; p()
         },
       use: function() {
         setTimeout(function() { that.changeLineWidth.hideP = false },0)
         var ctx = that.lineWidth.getContext("2d")
         ctx.globalAlpha = 1
           },
          update: function(width) {
          var ctx = that.lineWidth.getContext("2d")
          var k = canvas.color[0] + canvas.color[1] + canvas.color[2]
          ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height)
          canvas.width = width
          ctx.beginPath()
          ctx.arc(ctx.canvas.width/2, ctx.canvas.height/2, width/2, 0, Math.PI*2, false)
          ctx.fillStyle = canvas.getColor()
          ctx.fill()
            }
         }
      for(var i = 0; i < 3; i++) { 
      createSwch(i)
         }
      that.colors[0].style.marginTop = 12 * size + "px"
       function createSwch(i) {
        var swch = document.createElement("div")
         that.colors.push(swch)
         that.body.append(swch)
         swch.className = "ColorSwch"
         swch.id = "" + i 
         swch.ondragstart = function() { return false }
         swch.addListener(function() { 
         that.changeColor.start(swch) 
          }, function(e) {
               e = executor.handle(e)
               var left = toElement(that.body, e.x, 0)
               that.changeColor.move(left.x)
            }, that.changeColor.end)
          }; createCSSline(".ColorSwch", ["border: 2px solid",
                                          "border-radius: " + 12 * size + "px",
                                          "margin-left: " + 30 * size + "px",
                                          "margin-top: " + 2 * size + "px",
                                          "width: " + 28 * size + "px",
                                          "height: " + 28 * size + "px"])
  
        this.lineWidth = document.createElement("canvas")
        that.body.append(that.lineWidth)
        that.lineWidth.id="palet_lineWidth"
        createCSSline("# palet_lineWidth", ["marginTop: " + 8 * size + "px"])
        that.lineWidth.height = 8 * size
        that.lineWidth.width = 340 * size
        that.lineWidth.ondragstart = function() { return false }
        that.body.ondragstart = function() { return false }
        that.lineWidth.addListener(that.changeLineWidth.start,that.changeLineWidth.move,that.changeLineWidth.end);
  
        this.controls = document.createElement("div")
         var conts = that.controls
         conts.className = "palet_conts"
         createCSSline(".palet_conts", ["width: " + 120 * size + "px",
                                        "height: " + 35 * size + "px",
                                        "margin-top: " + 8 * size + "px",
                                        "margin-left: " + 25 * size + "px"])
         conts.onclick = function(e) {
           var x = toElement(this, e.x, 0).x
           if(x < this.offsetWidth/4) { tools.controlBrush(-1) }
           else if(x < this.offsetWidth*3/4) { bookmark_one.closeBook() }
           else { tools.controlBrush(1) }
         }; that.body.append(that.controls)
  
        this.button = document.createElement("div")
        this.button.className = "paletteButton"
        createCSSline(".paletteButton", ["cursor: pointer",
                                         "background-color: white",
                                         "position: fixed",
                                         "border: 1px solid",
                                         "cursor: pointer",
                                         "top: 0",
                                         "margin-top: " + 145 * size + "px",
                                         "text-align: center",
                                         "padding: " + 4 * size + "px",
                                         "width: " + 145 * size + "px",
                                         "border-radius: " + 20 * size + "px",
                                         "font-size: " + 115 * size + "%",
                                         "left: 0"])
        createCSSline(".paletteButton:active", ["background-color: gray"])
        this.button.onclick = function() { panel.colorEditor.save() }
        that.button.innerHTML = "save"
        that.body.append(that.button)
        that.body.button = that.button;
       } 
     }