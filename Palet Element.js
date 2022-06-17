  class Palette {
     constructor(size) {
     const that = this
     this.body = document.createElement("div")
       that.body.className = "paletteBody"
       that.body.ondblclick = function(e) {
       if(e.target == this) {
       var margin = (that.body.offsetWidth - 255 * size)/2
       for(var i = 0; i < 3; i++) {
       var left = that.colors[i].offsetLeft - margin + that.colors[i].offsetWidth/2
       canvas.color[i] = Math.round(left/size)
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
         //that.changeLineWidth.use()
         },
       move: function(left) {
       var colorId = that.changeColor.active
       if(colorId) {
        var margin = (that.body.offsetWidth - 255 * size)/2
        if(left > margin && left < that.body.offsetWidth - margin) {
         change( (left-margin)/size )
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
            //that.changeLineWidth.update(canvas.width)
            panel.update()
              }
            }
         },
       end: function() {
        that.changeColor.active = false
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
            a = a - speed; ctx.globalAlpha = a; that.changeLineWidth.update(canvas.width); setTimeout(p, 15);
               } else {  that.changeLineWidth.hideP = false  }
             }; p()
         },
       use: function() {
         that.changeLineWidth.hideP = false
         var ctx = that.lineWidth.getContext("2d")
         ctx.globalAlpha = 1
         that.changeLineWidth.update(canvas.width)
           },
          update: function(width) {
          var ctx = that.lineWidth.getContext("2d")
          ctx.fillStyle = canvas.getColor() 
          ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height)
          canvas.width = width
          ctx.beginPath()
          ctx.fillRect((ctx.canvas.width-width)/2, 0, width, ctx.canvas.height)
          ctx.beginPath()
          ctx.arc((ctx.canvas.width-width)/2, ctx.canvas.height/2, ctx.canvas.height/2, Math.PI/2, Math.PI*3/2, false)
          ctx.fill()
          ctx.beginPath()
          ctx.arc((ctx.canvas.width+width)/2, ctx.canvas.height/2, ctx.canvas.height/2, Math.PI/2, Math.PI*3/2, true)
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
        createCSSline("#palet_lineWidth", ["position: fixed",
                                           "left: 0", "top: 0",
                                           "border-radius: " + 8 * size/2 + "px",
                                           "margin-top: " + 128 * size + "px"])
        that.lineWidth.height = 8 * size
        that.lineWidth.width =  330 * size
      //  that.lineWidth.ondragstart = function() { return false }
      //  that.body.ondragstart = function() { return false }
        that.body.addListener(that.changeLineWidth.start,that.changeLineWidth.move,that.changeLineWidth.end);
  
        this.controls = document.createElement("div")
         var conts = that.controls
         conts.className = "palet_conts"
          createCSSline(".palet_conts", [ "position: fixed",
                                         "top: 0",
                                         "margin-top: " + 142 * size + "px",
                                         "width: " + 120 * size + "px",
                                         "height: " + 38 * size + "px",
                                         "left: 0"])
         conts.clickReaction(function(e, research) {
           var x = research.x
           if(x < conts.offsetWidth/3) { tools.controlBrush(-1) }
           else if(x > conts.offsetWidth*2/3) { tools.controlBrush(1) }
           else { bookmark_one.closeBook() }
         }, ResearchLayers); that.body.append(that.controls)
  
        this.button = document.createElement("div")
        this.button.className = "paletteButton"
        createCSSline(".paletteButton", ["cursor: pointer",
                                         "background-color: " + customMap.get("default-button-color"),
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
                                         "left: 0",
                                         "color: " + customMap.get("global-text-color")])
        createCSSline(".paletteButton:active", ["background-color: " + customMap.get("active-button-color")])
        this.button.clickReaction(function() { panel.colorEditor.save() })
        that.button.innerHTML = "save"
        that.body.append(that.button)
       } 
     }
  