
class Tools {
 constructor(size) {
  const that = this
   this.mode = {
    active: false,
    weapon: 0,
    max: document.createElement("div"),
    switch: function(n) {
     if(that.weapons[that.mode.weapon+n]) { exe(that.mode.weapon+n) } 
     else if(n > 0) { exe(0) }
     else { exe(that.weapons.length-1) }  
   function exe(x) {
     that.mode.weapon = x;
     that.mode.active = that.weapons[that.mode.weapon].name 
     var ctx = that.mode.min.getContext("2d")
     ctx.strokeStyle = canvas.getColor(true)
     ctx.lineWidth = 8* customMap.get("bookmark-size")
     ctx.lineCap = "round"
     ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height)
     ctx.stroke( that.weapons[that.mode.weapon].demo(ctx.canvas.width, ctx.canvas.height) )
     mess( that.mode.active )
      }
   },

  points: [],
  complete: function(event) {
   if(that.mode.active) {
     canvas.save()
     var draw = canvas.canvas.getContext("2d")
     draw.beginPath()
     draw.lineWidth = canvas.width
     draw.lineCap = "round"
     draw.strokeStyle=canvas.getColor(true)
     console.log(draw.strokeStyle)
      event( canvas.canvas.getContext("2d") ); that.mode.cansel()
      }
   },
 
   canvas: null,
   start: function(tool) {
    if(!that.mode.active) {
     if(tool) {
      that.mode.active = tool
    } else { that.mode.active = that.weapons[that.mode.weapon].name }
   var min = document.createElement("canvas")
   var size = customMap.get("bookmark-size")
   min.width = 110*size; min.height = 110*size;
   min.style = "background-color: rgba(255, 255, 255, 0.35); border: 1px dotted;"
   min.onclick = function() {
     that.mode.cansel()
    };
  
  that.mode.max.append(min)
  that.mode.min = min
  that.mode.switch(0)
  var draw = canvas.canvas.getContext("2d")
  that.mode.canvas = document.createElement("canvas")
  var canv = that.mode.canvas
  canv.width=draw.canvas.width
  canv.height=draw.canvas.height
  canv.className = "CanvasY"
  canvas.element.append(canv)
  var ctx = canv.getContext("2d")
   ctx.lineWidth = canvas.width
   ctx.fillStyle = canvas.getColor(true)
   canv.onclick=function(e) {
    that.mode.addPoint(e.layerX,e.layerY)
       }
     }
   },

  addPoint: function(x, y) {
   if(that.mode.active) {
    var ctx = that.mode.canvas.getContext("2d")
    ctx.beginPath()
    ctx.fillStyle = canvas.getColor(true)
    ctx.arc(x,y,canvas.width/2,0,2*Math.PI,false)
    ctx.fill()
    that.mode.points.push({ x: x, y: y })
    for(var i = 0; i < that.weapons.length; i++) {
      if(that.mode.active == that.weapons[i].name && that.mode.points.length >= that.weapons[i].points) {
        that.mode.complete(that.weapons[i].content); break
         }
       }
     }
  },
 
  cansel: function() {
   if(that.mode.canvas) {
    canvas.element.removeChild(that.mode.canvas)
    that.mode.points = []
    that.mode.active = false
    that.mode.canvas = null
    that.mode.max.removeChild(that.mode.min)
    that.mode.min = null
    mess("")
       }
     }
   }; this.weapons = []

  this.element = document.createElement("div")
  this.element.className = "toolsBody"
  createCSSline(".toolsBody", ["border: 1px dotted",
                               "position: fixed",
                               "margin-left: " + 15 * size + "px",
                               "background-color: " + customMap.get("theme-color"),
                               "width: " + 210 * size + "px",
                               "height: " + 350 * size + "px",
                               "border-radius: " + 4 * size + "px"])

  that.element.addResizeMap(function(e) {
  e.style.marginTop = innerHeight - 420 * size + "px"
   });

    that.mode.max.style.position = "fixed"
    that.mode.max.style.top = "0"
    that.mode.max.addResizeMap(function(e) {
    var size = customMap.get("bookmark-size")
    e.style.marginTop = bookmark_two.element.offsetTop  + (bookmark_two.element.offsetHeight - 110*size)/2+ "px"
    e.style.marginLeft = bookmark_two.element.offsetWidth + 10*size + "px"
   }); connection.content.body.append(that.mode.max)
  
 createCSSline(".Tools_bu", ["text-align: center",
                             "border: 1px dotted",
                             "background-color: " + customMap.get("default-button-color"),
                             "cursor: pointer",
                             "width: " + 190 * size + "px",
                             "padding-top: " + 10 * size + "px",
                             "padding-bottom: " + 10 * size + "px",
                             "font-size: " + 108 * size + "%",
                             "margin-top: " + 8 * size + "px",
                             "margin-left: " + 10 * size + "px",
                             "color: " + customMap.get("global-text-color"),
                             "border-radius: " + 6 * size + "px"])
 createCSSline(".Tools_bu:active", ["border-bottom: 2px solid"])
  
  that.controls = {
  head: document.createElement("div"),
  
  create: function(name, fun, ret) {
   var b = document.createElement("div")
   b.className = "Tools_bu"
   b.innerHTML = name
    b.onclick = function() {  fun(this)  }
     if(!ret) {  that.controls.head.append(b) }
     else { return b }
      }
   }

  this.activeBrush = 0
  this.brushes = []
  this.controlBrush = function(n) {
   if(typeof n == "string") { 
   for(var i =0; i < that.brushes.length; i++) {
   if(that.brushes[i].name == name) { that.activeBrush = i; mess(n); return true }
      }
    }
   else if(typeof n == "number") {
   var res = true
   if(that.brushes[that.activeBrush + n]) {
      that.activeBrush += n
    }
   else { res = false }
       mess(that.brushes[that.activeBrush].name)
       return res
       }
    };
 
   this.image = {
   head: document.createElement("div"),
   frame: document.createElement("div"),
   events: [], 
   img: null,
   position: 0,
   execute: function() {
   if(that.image.img) {
   canvas.save()
   that.image.events[that.image.position].content(that.image.img, canvas.canvas.getContext("2d"))
          }
       },
   put: function(file) {
    if(!file) {
      var input = document.createElement("input")
      input.type = "file"
      input.oninput = function() {
        console.log(input.files[0])
        if(this.files[0]) { use(input.files[0]) }
       }; input.click()
    } else { use(file) }

   function use(file) {
     that.image.frame.innerHTML = ""
     var src = URL.createObjectURL(file)
     that.image.img = new Image()
     that.image.img.src =src
      var demoImage = new Image()
      demoImage.src = src
      demoImage.width = that.image.frame.offsetWidth
      demoImage.height = that.image.frame.offsetHeight
      that.image.frame.append(demoImage)
      that.image.switch(0)
       }

    },
  
   switch: function(z) {
   var pos = 1
   if(z || z + "" == '0') { pos = z }
   var t = that.image.position
    if(that.image.events[t+pos]) { that.image.position = t+pos } 
     else {
       that.image.position = 0
         }
      that.image.events[that.image.position].demo(that.image.frame)
       }
     }; that.image.frame.useDropListener(that.image.put)
 
   this.info = {
   head: document.createElement("div"),
    }
   this.content = 0
   this.switch = function(n) {
   var elements = [that.controls.head, that.image.head, that.info.head]
   if(elements[that.content + n]) {  exe(that.content+n) }
    else if(n > 0) { exe(0) }
    else if(n < 0) { exe(elements.length-1) }
    function exe(x) {
     that.content = x
     that.element.innerHTML = ""
     that.element.append(elements[that.content])
        }
      }
    var ImageGrid = Math.floor(35 * size)
    var width = ImageGrid * 5
    that.image.frame.onclick = function() { that.image.switch() }
    that.image.frame.id = "image_frame"
    createCSSline("#image_frame", ["margin-left: " + ((210*size-width)/2-1) + "px",
                                   "margin-top: 10px",
                                   "border: 1px dashed gray",
                                   "overflow: hidden",
                                   "width: " + width + "px",
                                   "height: " + width + "px"])
    that.image.frame.style.backgroundImage="url('" + createBackgroundGridImage(ImageGrid, [150,150,150,0.2]) + "')"
  
    that.image.head.append(that.image.frame)
    that.image.push = that.controls.create("Put Image", function() { that.image.put() }, true)
    that.image.draw = that.controls.create("Pust Image", that.image.execute, true)
    that.image.head.append(that.image.push)
    that.image.head.append(that.image.draw)
  
    that.switch(0)
    that.element.onclick = function(e) {
    if(e.target == this) {
    if(e.layerY > this.offsetWidth * 4/5) {
    if(e.layerX > this.offsetWidth * 3/4) { that.switch(1) }
    else if(e.layerX < 1/4 * this.offsetWidth) { that.switch(-1) }
            }
         }
      }
    that.info.head.className = "toolsInfo"
    createCSSline(".toolsInfo", ["font-family: ui-serif", "font-style: oblique",
                                 "margin-left: " + 10*size + "px", 
                                 "margin-top: " + 10 * size + "px",
                                 "font-size: " + 120 * size + "%",
                                 "color: " + customMap.get("global-text-color")])
    that.info.head.innerHTML = `<br><br> More about Paint..`
 
     var dv = that.controls.create("Github", function() { window.open("https://github.com/VsevolodNitsenko") }, true)
     dv.style.marginLeft = 0
     that.info.head.append(dv);
     var cstm = that.controls.create("Custom", function() { window.open("CustomizeMap.html") }, true)
     cstm.style.marginLeft = 0
     that.info.head.append(cstm);

  that.weapons.push({ name: "Circle", content: function() {
      var a = that.mode.points[0].x - that.mode.points[1].x
      var b = that.mode.points[0].y - that.mode.points[1].y
      var Radius = Math.sqrt(a * a + b * b)
      var draw = canvas.canvas.getContext("2d")
      draw.arc(that.mode.points[0].x,that.mode.points[0].y,Radius,0,2 * Math.PI,false)
      draw.stroke(); } , points: 2, demo: function(width, height) {
        var p = new Path2D()
        p.arc(width/2, height/ 2, width/2 -15, 0, 2*Math.PI, false)
        return p
           }
       });
    that.weapons.push({ name: "line", content:  function() {
      var draw = canvas.canvas.getContext("2d")
      draw.moveTo(that.mode.points[0].x,that.mode.points[0].y)
      draw.lineTo(that.mode.points[1].x,that.mode.points[1].y)
      draw.stroke(); }, points: 2, demo: function(width, height) {
         var p = new Path2D()
         p.moveTo(width / 4, height * 4/5)
         p.lineTo(width * 4/5, height / 5)
         return p
         }
      });
   that.weapons.push({ name: "triangle", content: function triangle() {
       var draw = canvas.canvas.getContext("2d")
       for(var i = 0; i < 2; i++) {
         draw.moveTo(that.mode.points[i].x,that.mode.points[i].y)
         draw.lineTo(that.mode.points[i+1].x,that.mode.points[i+1].y)
        }
       draw.moveTo(that.mode.points[2].x,that.mode.points[2].y)
       draw.lineTo(that.mode.points[0].x,that.mode.points[0].y)
       draw.stroke(); }, points: 3, demo: function(width, height) {
        var p = new Path2D()
          p.moveTo(width/2, height /5)
          p.lineTo(width * 4/5, height * 3/4) // line 1
          p.moveTo(width *4/5, height * 3/4)
          p.lineTo(width /5, height * 3/4) // line 2
          p.moveTo(width /5, height * 3/4)
          p.lineTo(width/2, height/5) // line 3
          return p
          }
       });
  that.weapons.push({ name: "square", content: function() {
    var draw = canvas.canvas.getContext("2d")
    for(var i = 0; i < 3; i++) {
     draw.moveTo(that.mode.points[i].x,that.mode.points[i].y)
     draw.lineTo(that.mode.points[i+1].x,that.mode.points[i+1].y)
       }
     draw.moveTo(that.mode.points[3].x,that.mode.points[3].y)
     draw.lineTo(that.mode.points[0].x,that.mode.points[0].y)
     draw.stroke(); }, points: 4, demo: function(width, height) {
         var p = new Path2D()
         p.moveTo(width/5, height/5)
         p.lineTo(width * 4/5, height/5)
         p.moveTo(width * 4/5, height/5)
         p.lineTo(width * 4/5, height*4/5)
         p.moveTo(width * 4/5, height*4/5)
         p.lineTo(width/5, height*4/5)
         p.moveTo(width/5, height*4/5)
         p.lineTo(width/ 5, height/5)
          return p   
         }
      });
   that.brushes.push({ name: "Default line", 
     start: function(event) {  
        event.activeContext.lineCap = "round"
        event.activeContext.moveTo(event.x, event.y)
        event.activeContext.lineTo(event.x, event.y)
        event.activeContext.stroke()
   },
     move: function(event) {
      var path = new Path2D()
      path.moveTo(event.lx, event.ly)
      path.lineTo(event.x,event.y)
      event.activeContext.stroke( path )
       }, end: function() { canvas.save() }
    });

   that.brushes.push({ name: "Line Join", 
     start: function(event) {  
        event.activeContext.lineCap = "round"
        event.activeContext.moveTo(event.x, event.y)
        event.activeContext.lineTo(event.x, event.y)
        event.activeContext.stroke()
   },
     move: function(event) {
      event.activeContext.lineJoin = "round"
      event.activeContext.lineTo(event.x,event.y)
      event.activeContext.stroke()
       }, end: function() { canvas.save() }
    });
  
  
   that.brushes.push({ name: "Eraser",
    start: function(event) { canvas.save() },
    move: function(event) {
    var width = canvas.width
    var draw = canvas.canvas.getContext("2d")
    draw.beginPath()
    draw.save()
    draw.arc(event.x,event.y,width,0,2 * Math.PI,false)
    draw.clip()
    canvas.clear(true)
    draw.restore()
         }, end: function() {}
       });
    that.brushes.push({ name: "Finger Width", 
      start: function(event) {  
        event.activeContext.lineCap = "round"
        event.activeContext.moveTo(event.x, event.y)
        event.activeContext.lineTo(event.x, event.y)
        event.activeContext.stroke()
        },
      move: function(event) {
       var path = new Path2D()
        path.moveTo(event.lx, event.ly)
       path.quadraticCurveTo(event.x, event.y, event.x, event.y)
     // path.lineTo(event.x,event.y)
      if(event.originalEvent.touches && event.originalEvent.touches[0]) {
       var t = event.originalEvent.touches[0]
       if(t.radiusX >= t.radiusY) { event.activeContext.lineWidth= t.radiusX }
       else if(t.radiusX < t.radiusY) { event.activeContext.lineWidth= t.radiusY }   
             } event.activeContext.stroke( path )
           }, end: function() { canvas.save() }
        });

   that.brushes.push({ name: "difficult", 
      start: function(event) {
        event.activeContext.lineCap = "round"
        event.activeContext.moveTo(event.x, event.y)
        event.activeContext.lineTo(event.x, event.y)
        event.activeContext.stroke()
        },
      move: function(event) {
       tools.brushes.dif_o = !tools.brushes.dif_o
       var ps = [{ x: event.x, y: event.ly}, { x: event.lx, y: event.y }, 0]
       if(tools.brushes.dif_o) { ps[2] = 1 }

       var path = new Path2D()
        path.moveTo(event.lx, event.ly)
        path.quadraticCurveTo(ps[ps[2]].x, ps[ps[2]].y, event.x, event.y)
        event.activeContext.stroke( path )
           }, end: function() { canvas.save() }
        });

    that.brushes.push({ name: "Decoration (0, 20)", 
      start: function(event) {  
        event.activeContext.lineCap = "round"
        event.activeContext.moveTo(event.x, event.y)
        event.activeContext.lineTo(event.x, event.y)
        event.activeContext.stroke()
        },
      move: function(event) {
       var path = new Path2D()
       path.moveTo(event.lx, event.ly)
       path.quadraticCurveTo(event.x, event.y, event.x+10, event.y-10)
     //  path.lineTo(event.x,event.y)
       event.activeContext.stroke( path )
           }, end: function() { canvas.save() }
        });

    that.brushes.push({ name: "Color Select",
       start: function(event) {
       event = executor.handle(event)
       var data = event.baseContext.getImageData(event.x, event.y, 1, 1).data
       canvas.color[0] = data[0]
       canvas.color[1] = data[1]
       canvas.color[2] = data[2]
       canvas.color[3] = Math.floor(data[3]/255)
       panel.update()
          }, move: function() {}
       });
    that.brushes.push({  name: "fill Pixels", 
          start: function(event) {
          var range = canvas.width
          canvas.save()
          event = executor.handle(event)
          var ctx = event.baseContext
          var data = ctx.getImageData(0,0, ctx.canvas.width, ctx.canvas.height)
          var pixel = ctx.getImageData(event.x, event.y, 1,1).data
          var Data = data.data;
          function Equal(arr1, arr2) {
           var Res = 0
           for(var i = 0;  i < arr1.length; i++) {
             if( equal(arr1[i], arr2[i], range) ) { Res++ }
               }
            if(Res == arr1.length) { return true }
            }
          function equal(n1, n2, rn) {
           if(n1-rn <= n2 && n1 + rn >= n2) { return true }
             }
          for(var i = 0; i < Data.length; i+=4) {
            var p = [ Data[i] , Data[i+1] , Data[i+2] , Data[i+3] ]
            if( Equal(p, pixel) ) {
               Data[i] = canvas.color[0];
               Data[i+1] = canvas.color[1]; 
               Data[i+2] = canvas.color[2]; 
               Data[i+3] = canvas.color[3]*255;
                 }
               }; ctx.putImageData(data, 0, 0);
             },
          move: function() {  },
          end: function() {  }
        });
   that.brushes.push({  name: "Remove Colors", 
          start: function(event) { 
            canvas.save() 
             var color = canvas.color
             var size = canvas.width
             var ctx = canvas.canvas.getContext("2d")
             var frame = ctx.getImageData(event.x - size/2, event.y - size/2, size, size)
             function isEqual(a, b, r) {
               if(a + r > b && a-r < b) { return true }   
                 }
              function isEqualColors(a, b) {
                 for(var i = 0; i < 3; i++) {
                  if( !isEqual(a[i], b[i], canvas.width/2)) { return false }
                   }; if(isEqual(a[3], b[3]*255, canvas.width/2 )) { return true }
                 }
               var data = frame.data
               for(var i = 0; i < data.length; i+= 4) {
                 if( isEqualColors([data[i], data[i+1], data[i+2], data[i+3]], color) ) { 
                   data[i]=0; data[i+1]=0; data[i+2]=0; data[i+3]=0
                   }
                 }; frame.data = data; ctx.putImageData(frame, event.x - size/2, event.y - size/2)
               },
          move: function(event) {  },
          end: function() {  }
        });
  
      that.brushes.push({  name: "Copy Part", 
          start: function(event) { 
            canvas.save() 
             var size = canvas.width
             var ctx = canvas.canvas.getContext("2d")
             canvas.CopyPart = ctx.getImageData(event.x - size/2, event.y - size/2, size, size)
               },
          move: function() {  },
          end: function(event) { 
            var ctx = canvas.canvas.getContext("2d")  
            ctx.putImageData(canvas.CopyPart, event.x-canvas.width/2, event.y-canvas.width/2)
            canvas.CopyPart = undefined
           }
        });
       that.brushes.push({  name: "delete small colors (< 0.05 / 40)", 
          start: function(event) { 
            canvas.save() 
            function Round(n) {
             var x = n % size - size/2-1
             var y = Math.floor(n / size) - size/2
             if(y*y < size*size/4-x*x || x*x < size*size/4-y*y) { return true }
              }
            var size = canvas.width
            var less = 0.05*canvas.width/400
            var ctx = event.baseContext
            var colors = { id: [], count: [], 
             countById: function(p) {
             for(var i = 0; i < colors.id.length; i++) {
               if(colors.id[i] == p) { return colors.count[i] }
                    }
                },
             getBest: function() {
              var res = [0, 0]
              for(var i = 0; i < colors.count.length; i++) {
                if(colors.count[i] > res[0]) { res[0]=colors.count[i]; res[1]=i }
                  }; return eval(colors.id[res[1]])
                }  
              }
            var data = ctx.getImageData(event.x-size/2, event.y-size/2, size, size)
            var Data = data.data
            for(var i = 0; i < Data.length; i+=4) {
             var p = "["+ Data[i+0] + "," + Data[i+1] + "," + Data[i+2]+"]"
             var ex = false
             for(var e = 0; e < colors.id.length; e++) {
              if(p == colors.id[e]) {  colors.count[e]++; ex = true; break  }
               }; if(!ex) { colors.count[colors.id.length]=1; colors.id.push(p); }
             }
             var base = colors.getBest();
             for(var i = 0; i < Data.length; i+=4) {
              var p = "["+Data[i+0] + "," + Data[i+1] + "," + Data[i+2]+"]"
              if(Round(i/4) && colors.countById(p)/(size*size) <= less) {
               Data[i] = base[0]
               Data[i+1] = base[1]
               Data[i+2] = base[2]
                }
              }; ctx.putImageData(data, event.x-size/2, event.y-size/2)
            },
          move: function(event) {  },
          end: function() {  }
        });

  
     that.brushes.push({  name: "Correct defects", 
          start: function(event) { 
          canvas.save() 
          function equal(n1, n2, rn) {
           if(n1-rn <= n2 && n1 + rn >= n2) { return true }
             }
          function Equal(arr1, arr2) {
           var Res = 0
           for(var i = 0;  i < arr1.length; i++) {
             if( equal(arr1[i], arr2[i], range) ) { Res++ }
               }
            if(Res == arr1.length) { return true }
            }
           var range = canvas.width
           var ctx = event.baseContext
           var data = ctx.getImageData(0,0, ctx.canvas.width, ctx.canvas.height)
           var Data = data.data
           var color = ctx.getImageData(event.x, event.y, 1, 1).data
            for(var i = 0; i < Data.length; i+=4) {
            var p = [ Data[i] , Data[i+1] , Data[i+2] ]
            if( Equal(p, color) ) {
               Data[i] = color[0];
               Data[i+1] = color[1]; 
               Data[i+2] = color[2]; 
               Data[i+3] = color[3]*255;
                 }
              }; ctx.putImageData(data, 0, 0)
           },
          move: function(event) {  },
          end: function() {}
        });
  
     
      that.image.events.push({ content: function(image, canvasContext) {
            image.ondragstart = function() { return false }
            image.style="position: fixed; z-index: 10; opacity: 0.8"
            image.style.marginLeft = canvas.element.offsetLeft+canvas.canvas.offsetLeft + "px"
            image.style.marginTop = canvas.element.offsetTop +canvas.canvas.offsetTop+ "px"
            image.active = false
            image.addListener(function(e) { 
             e = executor.handle(e)
             var cs = toElement(image, e.x, e.y)
             image.active=[cs.x, cs.y]
             },
            function(e) {
              if(image.active) { e = executor.handle(e);
                 image.style.marginLeft = e.x-image.active[0]+"px"
                 image.style.marginTop = e.y-image.active[1]+"px"
                 }
              }, function () { image.active=false })
            image.onclick = function(e) {
            var cs = toElement(canvas.canvas, this.offsetLeft, this.offsetTop)
            canvasContext.drawImage(this, cs.x-1, cs.y-1)
            document.body.removeChild(this)
               }; document.body.append(image);       
          },
          demo: function(dv) { dv.style.border="1px solid" } 
       });  
     that.image.events.push({ content: function(image) {    
            var height = image.naturalHeight * (canvas.canvas.width / image.naturalWidth)
            canvas.resizeElement(canvas.canvas.width, height, true)
            canvas.canvas.getContext("2d").drawImage(image,0,0,canvas.canvas.width,canvas.canvas.height)
            }, demo: function(dv) { 
                dv.style.border="1px dotted"
                dv.style.borderLeft="2px solid"
                dv.style.borderRight="2px solid"
               } 
        });
     that.image.events.push({ content: function(image) {
          var top = 0;
          var left = 0;
          for(var x = left; x < canvas.canvas.width; x+= image.naturalWidth) {
           for(var y = top; y < canvas.canvas.height; y+= image.naturalHeight) { 
              canvas.canvas.getContext("2d").drawImage(image,x,y) }
                }
               }, demo: function(dv) { dv.style.border="1px dotted" }  
           });
     that.image.events.push({ content: function(image) {
         canvas.resizeElement(image.naturalWidth, image.naturalHeight, true)
         canvas.canvas.getContext("2d").drawImage(image, 0,0)
           }, demo: function(dv) { dv.style.border="2px solid" }  
        });
     }
  };
