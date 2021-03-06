 
  var dvs = document.getElementsByTagName("div")
  dvs[0].addResizeMap(function(e) {
   e.style.marginLeft = (innerWidth-e.offsetWidth)/2+"px"
   }); 
     window.onresize = function() {
    var events = EventBase.getClass("resize-map")
     for(var i = 0; i < events.length; i++) {
      events[i].event(events[i].element)
       }
     }; window.onload = function() { showExtensions(); window.onresize() }
   
  
    var extensions = new CloudSaver("Paint/Extensions")
    var Sets = extensions.getItems(function(set) { return eval("[" +set +"]")[0] })
    function showExtensions() {
     for(var i = 0; i < Sets.length; i++) {
      createFrame(Sets[i].name, Sets[i].date, Sets[i].text, true)
        }
      }
    function createExtension() {
      var input = document.createElement("input")
      input.type = "file"
      input.accept = ".txt, .js"
      input.oninput = function() {
       if(this.files[0]) { wrapFile(this.files[0]) }
       }; input.click()
     }
     function wrapFile(file) {
      var names = extensions.getItems(function(set) {
       if(file.name == set.name) { return set }
         })
      if(names.length>0) { alert("file name already exists!") } 
      else {
      var reader = new FileReader()
      reader.onloadend = function() {
       createFrame(file.name, readDate(file.lastModifiedDate.toString()), reader.result)
          }; reader.readAsText(file)
        }
      }
     function createFrame(name, date, text, readOnly) {
      var dv = document.createElement("div")
      dv.className = "extension"
      var stats = document.createElement("p")
      dv.append(stats)
      stats.innerHTML = "Name: " + name + "<br>Last Modified: " + date + "<br>"
      dv.position = "closed"
      var view = document.createElement("button")
      view.onclick = function() { dv.contrl() }
      view.innerHTML = "view code"
      dv.append(view)
      var remove = document.createElement("button")
      remove.innerHTML = "remove"
      remove.onclick = function() {
        extensions.save(Sets, function(set) {
          if(set.name != name) { return JSON.stringify(set) }
            }); 
          var a = document.createElement("a")
          a.href = document.URL; a.click()
        }
      dv.append(remove)
      dv.contrl = function() {
       if(this.position == "closed") {
        stats.innerHTML = text; this.position = "opened"; view.innerHTML = "hide code"
        }
       else { stats.innerHTML = "Name: " + name + "<br>Last Modified: " + date + "<br>"
       this.position = "closed"; view.innerHTML = "view code"  }; 
         };
       dv.addResizeMap(function(e) {
        e.style.marginLeft = (innerWidth-e.offsetWidth)/2+"px"
          });
     if(!readOnly) {
       Sets.push({ name: name, date: date, text: text });
       extensions.save(Sets, function(set) { return JSON.stringify(set) })
        }; document.body.append(dv); window.onresize();
      }; 
     function readDate(date) {
        var Date = ""
        var space = 0
        for(var i = 0; i < date.length; i++) {
          if(date[i] == " ") { space++ }
          if(space && space < 4) { Date += date[i] }
           }
        return Date
        }