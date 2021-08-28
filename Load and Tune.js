  
 var table_size = customMap.get("table-size") 
 createCSSline("#messange",["color: gray",
                             "position: fixed",
                             "margin-left: 80px",
                             "margin-top: 20px",
                             "font-size: 105%"])
  createCSSline("#start", ["z-index: 5",
                           "position: fixed",
                           "width: " + 500* table_size + "px",
                           "text-align: center",
                           "padding: " + 10 * table_size + "px",
                           "font-size: " + 115 * table_size + "%",
                           "border: 1px solid",
                           "cursor: pointer",
                           "background-color: " + customMap.get("start-button-color-default")])
  createCSSline("#start:hover", ["background-color: " + customMap.get("start-button-color-active")])
  createCSSline("#start:active", ["border-top-width: 2px"])
  createCSSline(".sizes", ["z-index: 5",
                           "position: fixed",
                           "width:" + 380 * table_size + "px",
                           "height: " + 28 * table_size + "px",
                           "font-size: " + 100 * table_size + "%",
                           "border: 1px solid grey"])
  createCSSline("#table", ["top: 0", "position: fixed", "border: radius: " + 80 * table_size + "px"])
  
  mess( customMap.get("theme-name") )
  
  var background = document.createElement("div")
  background.style.position = "fixed"
  background.style.top = "0"
  connection.body.append(background)
    background.addResizeMap(function(e) {
    e.style.width = innerWidth + "px"
    e.style.height = innerHeight + "px"
   })

  var canvas_width = customMap.get("canvas-width", true)
  var canvas = new Canvas(canvas_width, canvas_width)
   canvas.save()
  // canvas.changeMarkup()
   connection.body.append(canvas.element)
   var move = new Move(canvas.canvas, canvas.element, function(e) { 
    if(e.altKey || executor.alt) { return true }
   })
    
  var palette_size = customMap.get("palette-size", true)
  var palette = new Palette( palette_size )
   palette.body.style.top = "0"
   palette.body.addResizeMap(function(e) {
    var left = (innerWidth - e.offsetWidth)/2
    e.style.marginLeft = left + "px"
    e.style.marginTop = "0px"
    e.button.style.marginLeft = 140 * palette_size + left + "px"
   })
  connection.body.append(palette.body)
  
    var panel_size = customMap.get("panel-size", true)
    var panel = new Panel(panel_size, "Paint/colors/")
    panel.body.style.zIndex = "10"
    panel.body.style.top = "0"
    connection.body.append(panel.body)

  var tools_width = customMap.get("tools-size", true)
  var tools = new Tools(tools_width)
  tools.element.style.display = "none"
  tools.element.style.top = "0"
  connection.body.append(tools.element)
  
  tools.controls.create("Grid", function(element) { 
    canvas.changeMarkup(element)
  })
  tools.controls.create("Clear", canvas.clear)
  tools.controls.create("Save", function() {  
   var a = document.createElement("a")
   a.href = canvas.canvas.toDataURL(); 
   a.download = "Image"
   a.click()
   })
  tools.controls.create("Cansel", function() { 
  if(!panel.colorEditor.deletedColor) {
   canvas.back()
  } else {
   panel.colorEditor.canselDelete()
      }
    })
  tools.controls.create("Switch", function() { bookmark_two.closeBook(); tools.mode.start() })
  tools.controls.create("Move", function(e) { 
  if(executor.alt) { executor.alt = false; e.style.backgroundColor = "" }
  else { executor.alt = true; e.style.backgroundColor = customMap.get("active-button-color")  }
    })
  
  var bookmark_size = customMap.get("bookmark-size")
  var bookmark_one = new bookmark(100*bookmark_size, 28*bookmark_size, palette.body, 80*bookmark_size)
   bookmark_one.element.style.position = "fixed"
   bookmark_one.element.style.top="0px"
   bookmark_one.element.addResizeMap(function(e) {
   e.style.maginTop = "0px"
   e.style.marginLeft = (innerWidth - e.offsetWidth)/2 + "px"
     })
  bookmark_one.element.onclick = function(e) {
   if(toElement(bookmark_one.element, e.x, 0).x > this.offsetWidth/2) { tools.controlBrush(1) }
   else { tools.controlBrush(-1); }
   }
  connection.body.append(bookmark_one.element)

  var bookmark_two = new bookmark(28*bookmark_size, 145*bookmark_size, tools.element, 80*bookmark_size)
  bookmark_two.element.style.position = "fixed"
  bookmark_two.element.addResizeMap(function(e) {
   e.style.marginLeft = "0px"
   e.style.marginTop = (innerHeight-260* bookmark_size) + "px"
     })
   bookmark_two.element.addListener(bookmark_two.take, bookmark_two.move, bookmark_two.drop)
   bookmark_two.element.style.top = "0px"
   bookmark_two.on_open(function() { tools.mode.cansel() })
   bookmark_two.element.style.display = "block"
   bookmark_two.element.onclick = function(e) {
       var l = e.layerY
       if(l > this.offsetHeight/2) { l = 1 } else { l = -1 }
       if(tools.mode.active) { tools.mode.switch(l) }
         else { tools.mode.start() }
   }
  connection.body.append(bookmark_two.element);
    
  
 document.getElementById("start").addResizeMap(function(e) {
  var size = table_size
  e.style.marginLeft = (innerWidth - e.offsetWidth)/2 + "px"
  e.style.marginTop = (innerHeight/2 + 20) + "px"
    })
  document.getElementsByClassName("sizes")[0].addResizeMap(function(e) {
  var size = table_size
  e.style.marginLeft = (innerWidth - e.offsetWidth)/2 + 45*size + "px"
  e.style.marginTop = (innerHeight/2) - 85*size + "px"
    })
  document.getElementsByClassName("sizes")[1].addResizeMap(function(e) {
  var size = table_size
  e.style.marginTop = (innerHeight/2) - 30*size + "px"
  e.style.marginLeft = (innerWidth - e.offsetWidth)/2 + "px"
    })
  document.getElementById("preload").addResizeMap(function(e) {
   e.style.height = innerHeight + "px"
    })
  
  document.getElementById("table").addResizeMap(function(e) {
   var size = table_size
   e.style.marginTop = innerHeight/2 - 170*size + "px"
   e.style.marginLeft = (innerWidth - e.offsetWidth)/2 + "px"
    }); 
 
   document.addEventListener("mousedown",executor.down)
   document.addEventListener("mousemove",executor.move)
   document.addEventListener("mouseup", executor.up)
  
   document.ontouchstart = function(e) { executor.down(e) }
   document.ontouchmove =  function(e) { e.preventDefault(); executor.move(e) }
   document.ontouchend = function(e) { executor.up(e) }
 
   window.onresize = function() {
    var events = EventBase.getClass("resize-map")
     for(var i = 0; i < events.length; i++) {
      events[i].event(events[i].element)
       }
     }
   window.onload = function() {   window.onresize()  }

  