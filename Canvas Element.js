class Canvas {
  constructor(width, height) {
  const that = this
  this.style = `
  border: 1px dotted;
  position: absolute;
  margin: 50px; `
  createCSSline(".Canvas", ["background-color: rgba(255, 255, 255, 0.6)"])
  const Width = width
  const Height = height
  this.active = false
  this.canvas = document.createElement("canvas")
  this.element = document.createElement("div")
  that.element.style.position = "fixed"
  this.lasts = { x: NaN, y: NaN }
  this.color = customMap.get("default-color", true)
  this.width = customMap.get("default-width", true)
 
   this.clear = function(s) {
    if(!s) { that.save() }
    var ctx = that.canvas.getContext("2d")
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height)
   };
  
   this.changeMarkup = function() {
    var color = customMap.get("grid-color", true)
    var width = customMap.get("grid-width", true)
    var grid = createBackgroundGridImage(width, color)
    if(!that.canvas.style.backgroundImage) { that.canvas.style.backgroundImage = "url('" + grid + "')" }
    else { that.canvas.style.backgroundImage = "" } 
      };
  
    this.datas = []
      this.back = function() {
      if(that.datas.length > 1) {
      var data = that.datas[that.datas.length-1].data
      var ctx = that.canvas.getContext("2d")
      that.resizeElement(data.width, data.height)
      window.onresize()
      ctx.putImageData(data, 0, 0)
      that.datas = that.datas.delete(1)
         }
      };
    this.save = function() {
      var ctx = that.canvas.getContext("2d")
      var data = ctx.getImageData(0,0,ctx.canvas.width, ctx.canvas.height)
      that.datas.push({ data: data })
      try { panel.colorEditor.deletedColor = null } catch {}
     };
  
    this.getColor = function(t) {
     var transp = eval(that.color[3])
     var transperent = fix(transp, 2)
     var path = that.color[0] + "," + that.color[1] + "," + that.color[2]
     if(t) { path = "rgba(" + path + "," + transperent + ")" }
     else { path = "rgb(" + path + ")" } 
      return path
    };
  
   this.stDraw = function(e) {
      if(!that.active) {
      var canv = document.createElement("canvas")
      canv.style = that.style;  canv.style.border = "1px solid rgba(0,0,0,0)";
      canv.width = that.canvas.width;  canv.height = that.canvas.height
      that.element.append(canv) 
      that.active = canv
      var ctx = canv.getContext("2d")
      ctx.lineWidth = that.width
      ctx.strokeStyle = that.getColor();
      e = executor.handle(e)
      var cs = toElement(that.canvas, e.x, e.y)
       tools.brushes[tools.activeBrush].start({
          baseContext: that.canvas.getContext("2d"),
          activeContext: ctx,
          x: cs.x, y: cs.y
        }); mess("Canvas " + ", " + tools.brushes[tools.activeBrush].name)
         that.lasts = { x: cs.x, y: cs.y }
      } else { that.ndDraw() }
    };
  
   this.mvDraw = function(e) {
     if(that.active) {
     e = executor.handle(e)
      var cs = toElement(that.canvas, e.x, e.y)
       tools.brushes[tools.activeBrush].move({ 
         baseContext: that.canvas.getContext("2d"),
         activeContext: that.active.getContext("2d"),
         lx: that.lasts.x, ly: that.lasts.y,
         x: cs.x, y: cs.y, originalEvent: e
       })
     that.lasts = { x: cs.x, y: cs.y }
     }
   };
  
   this.ndDraw = function(e) {
     if(that.active) {
       var src = that.active.toDataURL()
       var image = new Image()
       var ctx = that.canvas.getContext("2d")
       ctx.globalAlpha = that.color[3]
       try { tools.brushes[tools.activeBrush].end(that.lasts) } catch {}
        image.onload = function() { 
          ctx.drawImage(image, 0, 0)
          that.element.removeChild(that.active)
          that.active = false
        }
      image.src = src
      that.lasts = { x: NaN, y: NaN }
        }
      };
      var canv = that.canvas
      canv.width = Width
      canv.height = Height
      canv.addListener(that.stDraw, that.mvDraw, that.ndDraw)
      canv.style = that.style
      canv.className = "Canvas"
      this.element.append(canv);

    this.resizeElement = function(w, h, DisableCorrection) {
       var grid_width = customMap.get("grid-width", true)
       var kw = Math.floor( w/grid_width) * grid_width
       var kh = Math.floor( h/grid_width) * grid_width
       if(DisableCorrection) { kw = w; kh = h }
       that.canvas.width = kw
       that.canvas.height = kh
       var m = onlyNumbers(this.canvas.style.margin)
       that.element.style.width = that.canvas.width +  m*2 + "px"
       that.element.style.height = that.canvas.height +  m*2 + "px"
      }; that.resizeElement(Width, Height)

    }
  }