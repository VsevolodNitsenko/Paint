  
  Array.prototype.delete = function(pos, place) {
    var arr = new Array()
     if(!place) {
     for(var i = 0; i < this.length-pos; i++) {
      arr.push(this[i])
         }
      }
     else {
        for(var i = 0; i < this.length; i++) {
         if(i != pos) { arr.push(this[i]) }
          }
        }
      return arr
    }
 Array.prototype.copy = function(F) {
    var res = new Array()
    for(var i = 0; i < this.length; i++) {
     var t = this[i]
     if(typeof F == "function") { t = F(t) }
     try { if(t.length) { t = t.copy(F) } } catch {}
     res[i] = t;
       }
  return res
   }
  
   HTMLElement.prototype.addResizeMap = function(f) {
     EventBase.setItem("resize-map",{ element: this, event: f })
    }
  
  HTMLElement.prototype.addListener = function(down, move, up, priorety) {
   if(!priorety) { priorety = 1 }
   else if(priorety < 0) { priorety = 1; console.warn("not allowed negative priorety!") }
   const object = this
   if(down && move && up) {
    EventBase.setItem("mousedown",{ object: object, event: function(e) { if( down(e) ) { return true } }, priorety: priorety })
    EventBase.setItem("mousemove",{ object: object, event: function(e) { if( move(e) ) { return true } }, priorety: priorety })
    EventBase.setItem("mouseup",{ object: object, event: function(e) { if( up(e) ) { return true } }, priorety: priorety })
     }
   };
  
   HTMLElement.prototype.useDropListener = function(callback) {
        ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
         this.addEventListener(eventName, preventDefaults, false)
             })
             function preventDefaults (e) {
                   e.preventDefault()
                   e.stopPropagation()
              }
         this.addEventListener('drop', handleDrop, false)
             function handleDrop(e) {
                  let dt = e.dataTransfer
                  let files = dt.files
               handleFiles(files)
                 }
               function handleFiles(files) {
                files = [...files]
                files.forEach(callback)
               }
          };

  function mess(text) {
   document.getElementById("messange").innerHTML = text
    };
  
  function fix(a, b) { var res = a.toFixed(b); return eval(res) };
  
  function toElement(element, x, y) {
    var p = element.getClientRects()[0]
    x = x - p.x
    y = y - p.y
     return { x: x, y: y }
      }
  
  function createCSSline(head, strings) {
   var text = `
    ` + head + " {"
    for(var i = 0; i < strings.length; i++) {
    text = text + `
     ` + strings[i] + ";"
      }; text += ` 
     }`
   var st = document.createElement("style")
   st.type="text/css"
   st.innerHTML = text
   document.head.append(st)
    }
  
  function onlyNumbers(text) {
     var res = ""
     for(var i = 0; i < text.length; i++) {
     for(var e = 0; e <= 9; e++) {
     if(text[i] == e.toString()) { res += text[i]; }
          }
        }
     if(res) { return eval(res) } else { return 0 }
    }
  
    function createBackgroundGridImage(width, color) {
       var context = document.createElement('canvas').getContext('2d')
       context.canvas.width= width
       context.canvas.height= width
       var imageData = context.getImageData(0,0, width, width)
       var Data = imageData.data
       function t(x) {
         x = x/4 
         if( x % width == 0) { return true }
         else if( x > width*(width-1) ) { return true }
        };
  
     for(var i = 0; i < Data.length; i+=4) {
      if( t(i) ) { 
       Data[i] = color[0]
       Data[i+1] = color[1]
       Data[i+2] = color[2]
       Data[i+3] = color[3] * 255
        }
      }; imageData.data = Data
  
    context.putImageData(imageData, 0, 0)
  
    var src = context.canvas.toDataURL()
   
       function dataToBlob(dataURI, dataTYPE) {
        var binary = atob(dataURI.split(',')[1]), array = [];
        for(var i = 0; i < binary.length; i++) array.push(binary.charCodeAt(i));
        return new Blob([new Uint8Array(array)], {type: dataTYPE});
               }
     return URL.createObjectURL( dataToBlob(src, 'image/png') )
  }
  