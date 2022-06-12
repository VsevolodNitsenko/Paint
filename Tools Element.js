
class Tools {
 constructor(size) {
  const that = this
   this.mode = {
    active: false,
    weapon: 0,
    max: document.createElement("div"),
    switch: function(n) {
     if(that.weapons[that.mode.weapon+n]) { exe(that.mode.weapon+n) } 
     else if(n > 0) { exe(0) }
     else { exe(that.weapons.length-1) }  
   function exe(x) {
     that.mode.weapon = x;
     that.mode.active = that.weapons[that.mode.weapon].name 
     var ctx = that.mode.min.getContext("2d")
     ctx.strokeStyle = canvas.getColor(true)
     ctx.lineWidth = 8* customMap.get("bookmark-size")
     ctx.lineCap = "round"
     ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height)
     ctx.stroke( that.weapons[that.mode.weapon].demo(ctx.canvas.width, ctx.canvas.height) )
     mess( that.mode.active )
      }
   },

  points: [],
  complete: function(event) {
   if(that.mode.active) {
     canvas.save()
     var draw = canvas.canvas.getContext("2d")
     draw.beginPath()
     draw.lineWidth = canvas.width
     draw.lineCap = "round"
     draw.strokeStyle=canvas.getColor(true)
      event( canvas.canvas.getContext("2d") ); that.mode.cansel()
      }
   },
 
   canvas: null,
   start: function(tool) {
    if(!that.mode.active) {
     if(tool) {
      that.mode.active = tool
    } else { that.mode.active = that.weapons[that.mode.weapon].name }
   var min = document.createElement("canvas")
   var size = customMap.get("bookmark-size")
   min.width = 110*size; min.height = 110*size;
   min.style = "background-color: rgba(255, 255, 255, 0.35); border: 1px dotted;"
   min.clickReaction(function() { that.mode.cansel() });
  
  that.mode.max.append(min)
  that.mode.min = min
  that.mode.switch(0)
  var draw = canvas.canvas.getContext("2d")
  that.mode.canvas = document.createElement("canvas")
  var canv = that.mode.canvas
  canv.width=draw.canvas.width
  canv.height=draw.canvas.height
  canv.className = "CanvasY"
  canvas.element.append(canv)
  var ctx = canv.getContext("2d")
   ctx.lineWidth = canvas.width
   ctx.fillStyle = canvas.getColor(true)
   canv.clickReaction(function(e, research) { that.mode.addPoint(research.x,research.y) }, ResearchLayers)
     }
   },

  addPoint: function(x, y) {
   if(that.mode.active) {
    var ctx = that.mode.canvas.getContext("2d")
    ctx.beginPath()
    ctx.fillStyle = canvas.getColor(true)
    ctx.arc(x,y,canvas.width/2,0,2*Math.PI,false)
    ctx.fill()
    that.mode.points.push({ x: x, y: y })
    for(var i = 0; i < that.weapons.length; i++) {
      if(that.mode.active == that.weapons[i].name && that.mode.points.length >= that.weapons[i].points) {
        that.mode.complete(that.weapons[i].content); break
         }
       }
     }
  },
 
  cansel: function() {
   if(that.mode.canvas) {
    canvas.element.removeChild(that.mode.canvas)
    that.mode.points = []
    that.mode.active = false
    that.mode.canvas = null
    that.mode.max.removeChild(that.mode.min)
    that.mode.min = null
    mess("")
       }
     }
   }; this.weapons = []

  this.element = document.createElement("div")
  this.topElement = document.createElement("div")
  this.bottomElement = document.createElement("div")
  that.element.append(that.topElement)
  that.bottomElement.id = "toolsBottomElement"
  that.element.append(that.bottomElement)
  var bodyWidth = 210 * size
  var bodyHeight = 350 * size
  createCSSline("#toolsBottomElement", ["position: absolute",
                                         "height: " + 28*size + "px",
                                         "width: " + bodyWidth + "px",
                                         "margin-top: " + (bodyHeight-30*size) + "px",
                                         "top: 0"])
  this.element.className = "toolsBody"
  createCSSline(".toolsBody", ["border: 1px dotted",
                               "position: fixed",
                               "margin-left: " + 15 * size + "px",
                               "background-color: " + customMap.get("theme-color"),
                               "width: " + bodyWidth + "px",
                               "height: " + bodyHeight + "px",
                               "border-radius: " + 4 * size + "px"])

  that.element.addResizeMap(function(e) {
   e.style.marginTop = innerHeight - 420 * size + "px"
   });

    that.mode.max.style.position = "fixed"
    that.mode.max.style.top = "0"
    that.mode.max.addResizeMap(function(e) {
    var size = customMap.get("bookmark-size")
    e.style.marginTop = bookmark_two.element.offsetTop  + (bookmark_two.element.offsetHeight - 110*size)/2+ "px"
    e.style.marginLeft = bookmark_two.element.offsetWidth + 10*size + "px"
   }); connection.content.body.append(that.mode.max)
  
 createCSSline(".Tools_bu", ["text-align: center",
                             "border: 1px dotted",
                             "background-color: " + customMap.get("default-button-color"),
                             "cursor: pointer",
                             "width: " + 190 * size + "px",
                             "padding-top: " + 10 * size + "px",
                             "padding-bottom: " + 10 * size + "px",
                             "font-size: " + 108 * size + "%",
                             "margin-top: " + 8 * size + "px",
                             "margin-left: " + 10 * size + "px",
                             "color: " + customMap.get("global-text-color"),
                             "border-radius: " + 6 * size + "px"])
 createCSSline(".Tools_bu:active", ["border-bottom: 2px solid"])
  
  that.controls = {
  head: document.createElement("div"),
  
  create: function(name, fun, ret) {
   var b = document.createElement("div")
   b.className = "Tools_bu"
   b.innerHTML = name
    b.clickReaction(function() {  fun(b)  })
     if(!ret) {  that.controls.head.append(b) }
     else { return b }
      }
   }

  this.activeBrush = 0
  this.brushes = []
  this.controlBrush = function(n) {
   if(typeof n == "string") { 
   for(var i =0; i < that.brushes.length; i++) {
   if(that.brushes[i].name == name) { that.activeBrush = i; mess(n); return true }
      }
    }
   else if(typeof n == "number") {
   var res = true
   if(that.brushes[that.activeBrush + n]) {
      that.activeBrush += n
    }
   else { res = false }
       mess(that.brushes[that.activeBrush].name)
       return res
       }
    };
 
   this.image = {
   head: document.createElement("div"),
   frame: document.createElement("div"),
   events: [], 
   img: null,
   position: 0,
   execute: function() {
   if(that.image.img) {
   canvas.save()
   that.image.events[that.image.position].content(that.image.img, canvas.canvas.getContext("2d"))
          }
       },
   put: function(file) {
    if(!file) {
      var input = document.createElement("input")
      input.type = "file"
      input.oninput = function() {
        console.log(input.files[0])
        if(this.files[0]) { use(input.files[0]) }
       }; input.click()
    } else { use(file) }

   function use(file) {
     that.image.frame.innerHTML = ""
     var src = URL.createObjectURL(file)
     that.image.img = new Image()
     that.image.img.src =src
      var demoImage = new Image()
      demoImage.src = src
      demoImage.width = that.image.frame.offsetWidth
      demoImage.height = that.image.frame.offsetHeight
      that.image.frame.append(demoImage)
      that.image.switch(0)
       }

    },
  
   switch: function(z) {
   var pos = 1
   if(z || z + "" == '0') { pos = z }
   var t = that.image.position
    if(that.image.events[t+pos]) { that.image.position = t+pos } 
     else {
       that.image.position = 0
         }
      that.image.events[that.image.position].demo(that.image.frame)
       }
     }; that.image.frame.useDropListener(that.image.put)
 
   this.info = {
   head: document.createElement("div"),
    }
   this.content = 0
   this.switch = function(n) {
   var elements = [that.controls.head, that.image.head, that.info.head]
   if(elements[that.content + n]) {  exe(that.content+n) }
    else if(n > 0) { exe(0) }
    else if(n < 0) { exe(elements.length-1) }
    function exe(x) {
     that.content = x
     that.topElement.innerHTML = ""
     that.topElement.append(elements[that.content])
        }
      }
    var ImageGrid = Math.floor(35 * size)
    var width = ImageGrid * 5
    that.image.frame.clickReaction(function() { that.image.switch() })
    that.image.frame.id = "image_frame"
    createCSSline("#image_frame", ["margin-left: " + ((210*size-width)/2-1) + "px",
                                   "margin-top: 10px",
                                   "border: 1px dashed gray",
                                   "overflow: hidden",
                                   "width: " + width + "px",
                                   "height: " + width + "px"])
    that.image.frame.style.backgroundImage="url('" + createBackgroundGridImage(ImageGrid, [150,150,150,0.2]) + "')"
  
    that.image.head.append(that.image.frame)
    that.image.push = that.controls.create("Put Image", function() { that.image.put() }, true)
    that.image.draw = that.controls.create("Pust Image", that.image.execute, true)
    that.image.head.append(that.image.push)
    that.image.head.append(that.image.draw)
  
    that.switch(0)
    that.bottomElement.clickReaction(function(e, research) {
       if(research.x > that.element.offsetWidth * 3/4) { that.switch(1) }
       else if(research.x < that.element.offsetWidth * 1/4) { that.switch(-1) }
      }, ResearchLayers);
  
    that.info.head.className = "toolsInfo"
    createCSSline(".toolsInfo", ["font-family: ui-serif", "font-style: oblique",
                                 "margin-left: " + 10*size + "px", 
                                 "margin-top: " + 10 * size + "px",
                                 "color: " + customMap.get("global-text-color")])
    createCSSline(".infostring", ["font-size: " + 90*size + "%"])  
    function infostring(text) {
      var p = document.createElement("p")
      p.className = "infotext"
      p.innerHTML = text
      that.info.head.append(p)  
        }
    function infolink(text, link) {
     var button = that.controls.create(text, function() { window.open(link) }, true)
     button.style.marginLeft = 0
     that.info.head.append(button)
      }
    infostring("")
    infostring("You also able to:")
    infolink("Customize Paint", "CustomizeMap.html")
    infolink("Push Extension", "ExtensionsMap.html")
    infostring("")
    infostring("Don't forget to visit")
    infolink("Github", "https://github.com/VsevolodNitsenko")
     }
  };
