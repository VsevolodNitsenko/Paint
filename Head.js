
  var connection = {
    date: "August 27, 2021",
    name: "Paint",
    version: "5.63",
    director: "Vsevolod Nitsenko",
    body: document.getElementById("content"),
    begin: function() {
     panel.colorEditor.strokeColors()
     connection.body.style.display = "block"
     document.getElementById("preload").style.display = "none"
     try {
     var width = eval( document.getElementsByClassName("sizes")[0].value )
     var height = eval( document.getElementsByClassName("sizes")[1].value )
     if(width && height) {
     canvas.resizeElement(width, height)
         }
     else { canvas.resizeElement(innerHeight-80, innerHeight-80) }
  
     bookmark_one.closeBook()
     bookmark_two.openBook()
       }
     catch {  }
        canvas.save()
        var e = canvas.element
        var top = (innerHeight - e.offsetHeight)/2
        if(top > 0) { e.style.marginTop = top + "px" }
        else { e.style.marginTop = "0px" }
         var left = (innerWidth - e.offsetWidth)/2
         if(left > 0) { e.style.marginLeft = left + "px" }
          else { e.style.marginLeft = "0px" }
     window.onresize()
       },
     styleArray_normal: [
               { name: "start-button-color-default", value: "#fff3e7" },
	       { name: "start-button-color-active", value: "#efd6be" },
               { name: "theme-color", value: "rgb(255,255,255,0.75)" },
               { name: "theme-name", value: "" },
               { name: "bookmark-size", value: 1 },
               { name: "default-width", value: 12 },
               { name: "default-color", value: "[186,119,111,0.6]" },
               { name: "canvas-width", value: "innerHeight-80" },
               { name: "palette-size", value: 0.78 },
               { name: "grid-width", value: 25 },
               { name: "grid-color", value: "[227, 218, 204, 0.75]" },
               { name: "active-button-color", value: "rgba(185,158,153,0.2)" },
               { name: "tools-size", value: 0.95 },
               { name: "panel-alpha-dot-length", value: 2 },
               { name: "panel-size", value: 1 },
               { name: "table-size", value: 1 }
             ],
     styleArray_large: [
               { name: "start-button-color-default", value: "#fff3e7" },
	       { name: "start-button-color-active", value: "#efd6be" },
               { name: "theme-color", value: "rgb(255,255,255,0.75)" },
               { name: "theme-name", value: "" },
               { name: "default-width", value: 12 },
               { name: "bookmark-size", value: 1.2 },
               { name: "default-color", value: "[133,155,189,1]" },
               { name: "canvas-width", value: "innerHeight-80" },
               { name: "palette-size", value: 1 },
               { name: "grid-width", value: 40 },
               { name: "grid-color", value: "[227, 218, 204, 0.75]" },
               { name: "active-button-color", value: "rgba(185,158,153,0.2)" },
               { name: "tools-size", value: 1.2 },
               { name: "panel-alpha-dot-length", value: 2 },
               { name: "panel-size", value: 1.4 },
               { name: "table-size", value: 1.3 }
             ],
     styleArray_small: [
               { name: "start-button-color-default", value: "#fff3e7" },
	       { name: "start-button-color-active", value: "#efd6be" },
               { name: "theme-color", value: "rgb(255,255,255,0.75)" },
               { name: "theme-name", value: "" },
               { name: "default-width", value: 10 },
               { name: "bookmark-size", value: 0.9 },
               { name: "default-color", value: "[90,46,62,0.6]" },
               { name: "canvas-width", value: "innerHeight-80" },
               { name: "palette-size", value: 0.72 },
               { name: "grid-width", value: 20 },
               { name: "grid-color", value: "[227, 218, 204, 0.75]" },
               { name: "active-button-color", value: "rgba(185,158,153,0.2)" },
               { name: "tools-size", value: 0.85 },
               { name: "panel-alpha-dot-length", value: 2 },
               { name: "panel-size", value: 0.8 },
               { name: "table-size", value: 0.9 }
             ],
     extensionsAllow: false
     }

 class CustomizeMap {
   constructor(List, Code) {
   const that = this
   this.delete = function(name) {
     localStorage.removeItem(Code + name) 
      }
   this.view = function() {
     var items = []
      if(innerHeight < 850) { items = List.small }
       else if(innerHeight < 1600) { items = List.normal }
       else { items = List.large } 
          var map = []
           for(var i = 0; i < items.length; i++) {
            var name = items[i].name
            map.push({ name: name, value: localStorage.getItem(Code+name) })
             }
         return map
     }
   this.restoreDefault = function() {
     for(var i = 0; i < connection.styleArray_small.length; i++) {
       localStorage.removeItem(Code + connection.styleArray_small[i].name)
        }
     for(var i = 0; i < connection.styleArray_normal.length; i++) {
       localStorage.removeItem(Code + connection.styleArray_normal[i].name)
        }
     for(var i = 0; i < connection.styleArray_large.length; i++) {
       localStorage.removeItem(Code + connection.styleArray_large[i].name)
        }
      }
   this.edit = function(name, value) { localStorage.setItem(Code + name, value) }
   this.get = function(name, unpack) {
    var res = localStorage.getItem(Code + name)
     try { if(unpack) { res = eval(res) } } catch { console.warn("failed to unpack.. " + Code + name) }
     return res
       }

   this.upload = function(items, replace) {
   if(innerHeight < 850) { items = items.small }
   else if(innerHeight < 1600) { items = items.normal }
   else { items = items.large } 
   var version = localStorage.getItem("Paint/version/")
   if( !version || (eval(version) <  eval(connection.version)) ) { 
           var map = that.view()
           that.restoreDefault()
           console.warn("We forsed udate for customMap, but you still can find your Map here:")
           console.log(map)
      }; localStorage.setItem("Paint/version/", connection.version)
   for(var i = 0; i < items.length; i++) {
    if(!localStorage.getItem(Code+items[i].name) || replace) {
      that.edit(items[i].name, items[i].value)
          }
         }
       }
        this.upload(List)
     }
  };  var customMap = new CustomizeMap({ 
          small: connection.styleArray_small,
          normal: connection.styleArray_normal,
          large: connection.styleArray_large }, "Paint/custom-map/")
        document.getElementById("start").onclick = function() { connection.begin() }
  