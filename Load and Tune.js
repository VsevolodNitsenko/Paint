  
 var table_size = customMap.get("table-size") 
 createCSSline("#messange",["color: " + customMap.get("theme-text-color"),
                             "position: fixed",
                             "margin-left: 20px",
                             "margin-top: 20px",
                             "font-size:" + 105*table_size + "%",
                             "background-color: " + customMap.get("theme-color"),
                             "border-radius: " + 20 * table_size + "px",
                             "padding: " + 4 * table_size + "px",
                             "padding-left: " + 15 * table_size + "px",
                             "padding-right: 15px",
                             "font-family: monospace"])
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
  
  document.getElementById("start").clickReaction(function() { connection.content.begin() })
  mess( customMap.get("theme-name", true) )

  var background = document.createElement("div")
  background.style.position = "fixed"
  background.style.top = "0"
  connection.content.body.append(background)
    background.addResizeMap(function(e) {
    e.style.width = innerWidth + "px"
    e.style.height = innerHeight + "px"
   })

  var canvas_width = customMap.get("canvas-width", true, "object")
  var canvas = new Canvas(canvas_width, canvas_width, 30, 500, 500)
   canvas.save()
  // canvas.changeMarkup()
   connection.content.body.append(canvas.element)
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
    palette.button.style.marginLeft = 140 * palette_size + left + "px"
    palette.controls.style.marginLeft = 20 * palette_size + left + "px"
    palette.lineWidth.style.marginLeft = left + "px"
   })
  connection.content.body.append(palette.body)
  
    var panel_size = customMap.get("panel-size", true)
    var panel = new Panel(panel_size, "Paint/colors/")
    panel.body.style.zIndex = "10"
    panel.body.style.top = "0"
    connection.content.body.append(panel.body)
      function ColorChoiceEnd(e) {
        var delta = e.x
        if(!delta) { delta = e.changedTouches[0].screenX;}
        var color = panel.colorEditor.activeColor
        if(color) {
         if(delta < color.l*0.98) { panel.colorEditor.delete(color.c);}
         else if(e.target == color.c) { panel.colorEditor.vote(color.c); panel.colorEditor.activeColor = null }
        }
      };

  var tools_width = customMap.get("tools-size", true)
  var tools = new Tools(tools_width)
  tools.element.style.display = "none"
  tools.element.style.top = "0"
  connection.content.body.append(tools.element)
  
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
  if(!panel.colorEditor.canselDelete() ) { canvas.back() }
    })
  tools.controls.create("Switch", function() {  bookmark_two.closeBook(); tools.mode.start(); })
  tools.controls.create("Move", function(e) { 
  if(executor.alt) { executor.alt = false; e.style.backgroundColor = "" }
  else { executor.alt = true; e.style.backgroundColor = customMap.get("active-button-color")  }
    })
  
  var bookmark_size = customMap.get("bookmark-size")
  createCSSline(".bookmark", ["border: 1px solid","background-color: " + customMap.get("theme-color"),"display: none"])
  var bookmark_one = new bookmark(100*bookmark_size, 28*bookmark_size, palette.body, 80*bookmark_size)
   bookmark_one.element.style.position = "fixed"
   bookmark_one.element.style.top="0px"
   bookmark_one.element.addResizeMap(function(e) {
   e.style.maginTop = "0px"
   e.style.marginLeft = (innerWidth - e.offsetWidth)/2 + "px"
     })
  bookmark_one.element.clickReaction(function(e, research) {
   if(research.x > this.offsetWidth/2) { tools.controlBrush(1) }
   else { tools.controlBrush(-1); }
   }, ResearchLayers)
  connection.content.body.append(bookmark_one.element)

  var bookmark_two = new bookmark(28*bookmark_size, 150*bookmark_size, tools.element, 80*bookmark_size)
  bookmark_two.element.style.position = "fixed"
  bookmark_two.element.addResizeMap(function(e) {
   e.style.marginLeft = "0px"
   e.style.marginTop = (innerHeight-260* bookmark_size) + "px"
     })
   bookmark_two.element.addListener(bookmark_two.take, bookmark_two.move, bookmark_two.drop)
   bookmark_two.element.style.top = "0px"
   bookmark_two.on_open(function() { tools.mode.cansel() })
   bookmark_two.element.style.display = "block"
   bookmark_two.element.clickReaction(function(e, research) {
       var l = research.y
       if(l > this.offsetHeight/2) { l = 1 } else { l = -1 }
       if(tools.mode.active) { tools.mode.switch(l) }
         else { tools.mode.start() }
   }, ResearchLayers)
  connection.content.body.append(bookmark_two.element);
    
  
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
   e.width = table_size * e.naturalWidth
   e.height = table_size * e.naturalHeight
   e.style.marginTop = (innerHeight - e.height)/2 + "px"
   e.style.marginLeft = (innerWidth - e.offsetWidth)/2 + "px"
    }); 
 
   document.addEventListener("mousedown",executor.down)
   document.addEventListener("mousemove",executor.move)
   document.addEventListener("mouseup", function(event) { executor.up(event); ColorChoiceEnd(event); })

  const prevent_touch = true
  document.addEventListener("touchstart",function(e) {
    executor.down(e); tryPreventTouch(e)
      })
  document.addEventListener("touchmove", function(e) {
    executor.move(e); tryPreventTouch(e)
      })
  document.addEventListener("touchend", function(e) {
    executor.up(e); executor.up(e); ColorChoiceEnd(e); tryPreventTouch(e);
      })
  document.addEventListener("touchcansel", function(e) {
   executor.up(e); ColorChoiceEnd(e); tryPreventTouch(e);
   }); EventBase.setItem("canselPrevent", function(e) { 
       var inputs = document.getElementsByTagName("input")
       for(var i = 0; i < inputs.length; i++) {
       if(inputs[i] == e.target) { return true }
        };
      })
   EventBase.setItem("canselPrevent", function(e) { 
      if(e.target == table) { return true }
      })
   function tryPreventTouch(e) {
     var res = true
     var canselFactors = EventBase.getClass("canselPrevent")
     for(var i = 0; i < canselFactors.length; i++) {
      if(!prevent_touch || canselFactors[i](e)) { res = false }
       };
      if(res) { return e.preventDefault(); }
     }
 
   window.onresize = function() {
    var events = EventBase.getClass("resize-map")
     for(var i = 0; i < events.length; i++) {
      events[i].event(events[i].element)
       }
     }
   window.addEventListener("load", function() {
      document.body.style.touchAction = "none";
      document.body.style.backgroundColor = customMap.get("global-color")
      var sizes = customMap.get("remember-canvas", true, "objet");
      if(sizes && sizes.length == 2) {
       document.getElementsByClassName("sizes")[0].value = sizes[0]
       document.getElementsByClassName("sizes")[1].value = sizes[1]
        }
      window.onresize()
     })
   window.addEventListener("orientationchange", function() { window.onresize() })
   window.addEventListener("focus", function() { window.onresize() })
  