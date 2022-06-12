  tools.weapons.push({ name: "Circle", content: function() {
      var a = tools.mode.points[0].x - tools.mode.points[1].x
      var b = tools.mode.points[0].y - tools.mode.points[1].y
      var Radius = Math.sqrt(a * a + b * b)
      var draw = canvas.canvas.getContext("2d")
      draw.arc(tools.mode.points[0].x,tools.mode.points[0].y,Radius,0,2 * Math.PI,false)
      draw.stroke(); } , points: 2, demo: function(width, height) {
        var p = new Path2D()
        p.arc(width/2, height/ 2, width/2 -15, 0, 2*Math.PI, false)
        return p
           }
       });
    tools.weapons.push({ name: "line", content:  function() {
      var draw = canvas.canvas.getContext("2d")
      draw.moveTo(tools.mode.points[0].x,tools.mode.points[0].y)
      draw.lineTo(tools.mode.points[1].x,tools.mode.points[1].y)
      draw.stroke(); }, points: 2, demo: function(width, height) {
         var p = new Path2D()
         p.moveTo(width / 4, height * 4/5)
         p.lineTo(width * 4/5, height / 5)
         return p
         }
      });
   tools.weapons.push({ name: "triangle", content: function triangle() {
       var draw = canvas.canvas.getContext("2d")
       for(var i = 0; i < 2; i++) {
         draw.moveTo(tools.mode.points[i].x,tools.mode.points[i].y)
         draw.lineTo(tools.mode.points[i+1].x,tools.mode.points[i+1].y)
        }
       draw.moveTo(tools.mode.points[2].x,tools.mode.points[2].y)
       draw.lineTo(tools.mode.points[0].x,tools.mode.points[0].y)
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
  tools.weapons.push({ name: "square", content: function() {
    var draw = canvas.canvas.getContext("2d")
    for(var i = 0; i < 3; i++) {
     draw.moveTo(tools.mode.points[i].x,tools.mode.points[i].y)
     draw.lineTo(tools.mode.points[i+1].x,tools.mode.points[i+1].y)
       }
     draw.moveTo(tools.mode.points[3].x,tools.mode.points[3].y)
     draw.lineTo(tools.mode.points[0].x,tools.mode.points[0].y)
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
   tools.brushes.push({ name: "Default line", 
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

   tools.brushes.push({ name: "Line Join", 
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
  
  
   tools.brushes.push({ name: "Eraser",
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
    tools.brushes.push({ name: "Finger Width", 
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

   tools.brushes.push({ name: "difficult", 
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

    tools.brushes.push({ name: "Decoration (0, 20)", 
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

    tools.brushes.push({ name: "Color Select",
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
    tools.brushes.push({  name: "fill Pixels", 
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
   tools.brushes.push({  name: "Remove Colors", 
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
  
      tools.brushes.push({  name: "Copy Part", 
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
       tools.brushes.push({  name: "delete small colors (< 0.05 / 40)", 
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

  
     tools.brushes.push({  name: "Correct defects", 
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
  
     
      tools.image.events.push({ content: function(image, canvasContext) {
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
            image.clickReaction(function(e) {
            var cs = toElement(canvas.canvas, image.offsetLeft, image.offsetTop)
            canvasContext.drawImage(image, cs.x-1, cs.y-1)
            document.body.removeChild(image)
               }); document.body.append(image);       
          },
          demo: function(dv) { dv.style.border="1px solid" } 
       });  
     tools.image.events.push({ content: function(image) {    
            var height = image.naturalHeight * (canvas.canvas.width / image.naturalWidth)
            canvas.resizeElement(canvas.canvas.width, height, true)
            canvas.canvas.getContext("2d").drawImage(image,0,0,canvas.canvas.width,canvas.canvas.height)
            }, demo: function(dv) { 
                dv.style.border="1px dotted"
                dv.style.borderLeft="2px solid"
                dv.style.borderRight="2px solid"
               } 
        });
     tools.image.events.push({ content: function(image) {
          var top = 0;
          var left = 0;
          for(var x = left; x < canvas.canvas.width; x+= image.naturalWidth) {
           for(var y = top; y < canvas.canvas.height; y+= image.naturalHeight) { 
              canvas.canvas.getContext("2d").drawImage(image,x,y) }
                }
               }, demo: function(dv) { dv.style.border="1px dotted" }  
           });
     tools.image.events.push({ content: function(image) {
         canvas.resizeElement(image.naturalWidth, image.naturalHeight, true)
         canvas.canvas.getContext("2d").drawImage(image, 0,0)
           }, demo: function(dv) { dv.style.border="2px solid" }  
        });
  