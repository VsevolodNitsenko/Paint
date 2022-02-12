 // How create own Extensions?
 // create JS file (example: "file://C:/example.js")
 // Write in console: ' CreateUserExtension("file://C:/example.js") '
 // Reload page and see how it works!
  
 class CloudSaver {
  constructor(id) {
  this.key = id + ""
  this.save = function(items) {
   this.overview(true)
   for(var i = 0; i < items.length; i++) {
   localStorage.setItem(this.key + i, items[i])
     }
   }
  this.get = function() { 
  var result = []
  var length = this.overview()
  for(var i = 0; i < length; i++) {
   result.push( localStorage.getItem(this.key+i) )
     }
  return result
   }
  this.overview = function(del) {
   var length = 0
   for(var i = 0; localStorage.getItem(this.key+i) != null; i++) {
    length++
    if(del) { localStorage.removeItem(this.key+i) }
           }
     return length
        }
  this.find = function(call) {
   for(var i = 0; i < this.overview(); i++) {
    var item = localStorage.getItem(this.key + i);
    if( call(item, this.key + i) ) { break }
         } 
       }
     }
   };
  var CloudExtensions = new CloudSaver("Paint/extensions/")
  function CreateUserExtension(source) {
   var list = CloudExtensions.get(); list.push(source)
   CloudExtensions.save(list)
    var script = document.createElement("script")
    script.src = source
    script.onload = function() { console.log("Script loaded!", script) }
    script.onerror = function() {
      console.warn("URL isn't correct.. "+ i + " " + extensions[i]);
      document.body.removeChild(this)
     }; document.body.append(script)
   }
  function removeCloudExtensions(list) {
  if(list && list.length) {
   for(var i = 0; i < list.length; i++) { 
    CloudExtensions.find(function(item, key) {
      if(item == list[i]) { 
         localStorage.removeItem(key)
         return true 
          }
       })
     }
   }
  else { CloudExtensions.overview(true) }
   }
  var extensions = CloudExtensions.get()
  
  function uploadCloudScripts(i) {
   if(extensions[i]) {
   var script = document.createElement("script")
   script.src = extensions[i]
   script.onload = function() { console.log("Script loaded!", script) }
   script.onerror = function() {
     console.warn("URL isn't correct.. "+ i + " " + extensions[i]);
     document.body.removeChild(this)
   } 
   document.body.append(script); uploadCloudScripts(i+1)
    }
   else if(i >= extensions.length) {}
   else { console.error("Script  not found.. ", extensions) }
   }; if(connection.extensionsAllow) { uploadCloudScripts(0) }
  
 
   // How to use CustomizeMap ?
   // just call customMap and use one of this methods:
   /* customMap.get(name) 
      customMap.edit(name, value)
      customMap.restoreDefault()
      customMap.upload(new Map)
      customMap.view() // returns current Map
      customMap.delete(name) // delete empty name
    */
    // customMap manages your style and can be change personal for you.
  
   // How to Write Extensions?
  
   /* Tools (Brushes) List Structure: 
       {  name: "", 
          start: function(event) {  },
          move: function(event) {  },
          end: function() { canvas.save() }
        }
  
     Start Event Options: {
         baseContext: Real Canvas,
         activeContext: fake Canvas,
         x: new point-X, y: now point-Y
       }
  
     Move Event Options: 
       { 
         baseContext: Real Canvas,
         activeContext: fake Canvas,
         lx: last point-X, ly: last point-Y,
         x: now point-X, y: now point-Y,
         originalEvent: mousemoveEvent / touchmoveEvent
       };
  
     Add Extension: tools.controls.brushes.push({ extension })
    */
  
   /* Tools (Figures) List Structure: 
        { name: "",
          points: Number,
          content: function(canvasContext, pointArray) {  } ,
          demo: function(width, height) { return Path2D }
         }
     Add Extension: tools.mode.weapons.push({ extension })
   */
  
   /* Tools (Images) List Structure:
          content: function(image, canvasContext) { canvasContext.drawImage(image) },
          demo: function(dv) { dv.style.border="" } 
     };
    Add Extension: tools.image.events.push({ extention })
    */
  