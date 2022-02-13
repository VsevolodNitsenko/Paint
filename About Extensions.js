 // How create own Extensions?
 // create JS file (example: "file://C:/example.js")
 // Write in console: ' CreateCloudExtension("file://C:/example.js") '
 // Reload page and see how it works!

  var CloudExtensions = new CloudSaver("Paint/extensions/")
  function CreateCloudExtension(source) {
   var list = CloudExtensions.getItems(); list.push(source)
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
     extensions = extensions.filter(function (e) {
       return !list.includes(e)
          }); CloudExtensions.save(extensions)
     }
  else { CloudExtensions.overview(true) }
   }
  var extensions = CloudExtensions.getItems()
  
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
   else { console.error("Script not found.. ", extensions) }
   }; if(connection.content.extensionsAllow) { uploadCloudScripts(0) }
  