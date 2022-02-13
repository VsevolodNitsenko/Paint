class Head {
  constructor(name, date, version, owner, content) {
   const that = this
   this.name = name
   this.date = date
   this.version = version
   this.owner = owner
   this.content = new content(that)
    }
  }; var connection = new Head("Paint", "February 13, 2022", "5.672", "Vsevolod Nitsenko", class content {
     constructor(field) {
      this.body = document.getElementById("content")
      this.begin = function() {
     panel.colorEditor.strokeColors()
     connection.content.body.style.display = "block"
     document.getElementById("preload").style.display = "none"
     try {
     var width = eval( document.getElementsByClassName("sizes")[0].value )
     var height = eval( document.getElementsByClassName("sizes")[1].value )
     var remember = customMap.get("remember-canvas", true)
     if(width && height) {
     canvas.resizeElement(width, height)
     if(remember) { customMap.edit("remember-canvas", "["+width+","+ height+"]") }
         }
     else if(remember) { customMap.edit("remember-canvas", "[]") }
       }
     catch { mess("failed to create your canvas.") }
        bookmark_one.closeBook()
        bookmark_two.openBook()
        canvas.save()
        var e = canvas.element
        var top = (innerHeight - e.offsetHeight)/2
        if(top > 0) { e.style.marginTop = top + "px" }
        else { e.style.marginTop = "0px" }
         var left = (innerWidth - e.offsetWidth)/2
         if(left > 0) { e.style.marginLeft = left + "px" }
          else { e.style.marginLeft = "0px" }
     window.onresize()
           }
         }
      })
  
  
  
   var customCloud = new CloudSaver("Paint/custom-map")
   class CustomizeMap {
    constructor(maps) {
     const that = this
     this.currentMap = null
     this.removedMap = null
     this.extract = function(i) {
      try { return eval(i) } catch { return eval("["+ i + "]")[0] }
       }
     this.get = function(name, extract) {
      if(that.currentMap) {
      for(var i = 0; i < that.currentMap.length; i++) {
       var item = that.currentMap[i]
       if(item.name == name) { 
        if(extract) { return that.extract(item.value) } else { return item.value }
          }
         }
        } else { console.log("you can't get item because map isn't loaded.") }
       }
     this.restore = function() {
     if(that.removedMap) {
        that.editItems(that.removedMap)
        that.currentMap = that.removedMap
        that.that.removedMap = null
         } else { console.warn("Custom Map already restored or lost.") }
       }
     this.getMapProfile = function() {
       for(var i = 0; i < maps.length; i++) {
        if(innerHeight > maps[i].screenHeight[0] && innerHeight <= maps[i].screenHeight[1]) {
         return maps[i].map
           }
         }; console.err("Profile not found. Something goes wrong.")
       }
     this.editItems = function(map) {
      customCloud.save(map, function(e) { return JSON.stringify(e) })
       }
     this.load = function(def) {
      var map = customCloud.getItems(that.extract)
      if(def) { 
        console.warn(def)
        that.currentMap = that.getMapProfile()
        that.editItems(that.currentMap)
           } else if(map.length) { that.currentMap = map } else {
         that.currentMap = that.getMapProfile()
         that.editItems(that.currentMap)
           }
         }
       }
    }; var customMap = new CustomizeMap([
          { screenHeight: [0, 850], map: [
               { name: "remember-canvas", value: 0 },
               { name: "touch-set", value: "true" },
               { name: "global-color", value: "white" },
               { name: "default-button-color", value: "white" },
               { name: "theme-text-color", value: "gray" },
               { name: "global-text-color", value: "black" },
               { name: "start-button-color-default", value: "#fff3e7" },
	       { name: "start-button-color-active", value: "#efd6be" },
               { name: "theme-color", value: "rgb(255,255,255,0.75)" },
               { name: "theme-name", value: "connection.date" },
               { name: "default-width", value: 10 },
               { name: "bookmark-size", value: 0.8 },
               { name: "default-color", value: "[191,115,129,1]" },
               { name: "canvas-width", value: "innerHeight" },
               { name: "palette-size", value: 0.72 },
               { name: "grid-width", value: 20 },
               { name: "grid-color", value: "[227, 218, 204, 0.75]" },
               { name: "active-button-color", value: "rgba(185,158,153,0.2)" },
               { name: "tools-size", value: 0.8 },
               { name: "panel-alpha-dot-length", value: 2 },
               { name: "panel-size", value: 0.8 },
               { name: "table-size", value: 0.9 }] 
            }, 
          { screenHeight: [850, 1400], map: [
               { name: "remember-canvas", value: 0 },
               { name: "touch-set", value: "true" },
               { name: "global-color", value: "white" },
               { name: "default-button-color", value: "white" },
               { name: "theme-text-color", value: "gray" },
               { name: "global-text-color", value: "black" },
               { name: "start-button-color-default", value: "#fff3e7" },
	       { name: "start-button-color-active", value: "#efd6be" },
               { name: "theme-color", value: "rgb(255,255,255,0.75)" },
               { name: "theme-name", value: "connection.date" },
               { name: "bookmark-size", value: 1 },
               { name: "default-width", value: 12 },
               { name: "default-color", value: "[186,119,111,0.6]" },
               { name: "canvas-width", value: "innerHeight" },
               { name: "palette-size", value: 0.78 },
               { name: "grid-width", value: 25 },
               { name: "grid-color", value: "[227, 218, 204, 0.75]" },
               { name: "active-button-color", value: "rgba(185,158,153,0.2)" },
               { name: "tools-size", value: 0.95 },
               { name: "panel-alpha-dot-length", value: 2 },
               { name: "panel-size", value: 1 },
               { name: "table-size", value: 1 }] 
             }, 
          { screenHeight: [1400, Infinity], map: [
               { name: "remember-canvas", value: "[]" },
               { name: "touch-set", value: "true" },
               { name: "global-color", value: "white" },
               { name: "default-button-color", value: "white" },
               { name: "theme-text-color", value: "gray" },
               { name: "global-text-color", value: "black" },
               { name: "start-button-color-default", value: "#fff3e7" },
	       { name: "start-button-color-active", value: "#efd6be" },
               { name: "theme-color", value: "rgb(255,255,255,0.75)" },
               { name: "theme-name", value: "connection.date" },
               { name: "default-width", value: 12 },
               { name: "bookmark-size", value: 1.2 },
               { name: "default-color", value: "[191,157,129,1]" },
               { name: "canvas-width", value: "innerHeight" },
               { name: "palette-size", value: 1 },
               { name: "grid-width", value: 40 },
               { name: "grid-color", value: "[227, 218, 204, 0.75]" },
               { name: "active-button-color", value: "rgba(185,158,153,0.2)" },
               { name: "tools-size", value: 1.2 },
               { name: "panel-alpha-dot-length", value: 2 },
               { name: "panel-size", value: 1.4 },
               { name: "table-size", value: 1.3 }]
           }])
  
   customMap.load((function() {
         var version = localStorage.getItem("Paint/version/")
         localStorage.setItem("Paint/version/", connection.version)
         if(!version) { return "Welcome to Paint!" } 
         else if( (eval(version) <  eval(connection.version)) ) { 
             return "Custom Map updated, but can be restored with here `customMap.restore()`" 
            } 
      })())
  
  