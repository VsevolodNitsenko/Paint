/* Guide for extensions will be avaible soon */
  
  var extensions = new CloudSaver("Paint/Extensions")
  var scripts = extensions.getItems(function(set) {
   return eval("["+set+"]")[0].text
    })
  function writeScripts() {
   for(var i = 0; i < scripts.length; i++) {
     var script = document.createElement("script")
     script.type = "text/javascript"
     script.innerHTML = scripts[i]
     script.className = "Extension"
     document.body.append(script)
     }
   }; writeScripts()