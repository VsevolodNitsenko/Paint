  var butts = document.getElementsByTagName("div")
  butts[0].addResizeMap(function(e) {
   e.style.marginLeft = (innerWidth-e.offsetWidth)/2+"px"
   })
  butts[1].addResizeMap(function(e) {
   e.style.marginLeft = (innerWidth-e.offsetWidth)/2+"px"
   })
  butts[2].addResizeMap(function(e) {
   e.style.marginLeft = (innerWidth-e.offsetWidth)/2+"px"
   })
  function upload() {
  document.getElementById("header").innerHTML = ""
  for(var i = 0; i < customMap.currentMap.length; i++) {
   var s = JSON.stringify(customMap.currentMap[i])
   var c = document.createElement("input")
   c.value = s
   document.getElementById("header").append(c)
   document.getElementById("header").append(document.createElement("br"))
      }
   }; upload()
  function edit() {
   var ins = document.getElementsByTagName("input")
   var map = []
   for(var i = 0; i < ins.length; i++) { map.push(ins[i].value) }
   console.log(map)
   customCloud.save(map)
   customMap.load(); upload()
   }
  function restore() { customCloud.overview(true); customMap.load("processing.."); upload() }
  window.onresize = function() {
  var elements = EventBase.getClass("resize-map")
  for(var i = 0; i < elements.length; i++) {
    elements[i].event(elements[i].element)
     }
   }; window.onload = function() { window.onresize() }