  class Move {
   constructor(element, parentElement, options) {
    const that = this
    this.active = false
    this.points = {}
    this.handle = function(e) {
    if(e.pageX==undefined || !e.pageY == undefined) {
     e.pageX = e.touches[0].pageX
     e.pageY =  e.touches[0].pageY
          }; return e
        }
    element.addListener(function(e) {
       if( !options || ( options && options(e) ) ) {
          e = that.handle(e)
          that.active = true
          document.body.style.cursor = "grabbing"
          that.points.x = e.pageX 
          that.points.y = e.pageY
          return true
            }
          }, function(e) {
            if(that.active) { 
             e = that.handle(e)
             if(parentElement) { element = parentElement }
             element.style.marginLeft = element.offsetLeft + (e.pageX - that.points.x) + "px"
             element.style.marginTop = element.offsetTop + (e.pageY - that.points.y) + "px"
             that.points.x = e.pageX
             that.points.y = e.pageY
            }
          }, function() { 
              document.body.style.cursor = "default"
              that.active = false
              that.points = {}
         }, 2)
      }
   }

  class EventDataBase  {
   constructor() {
     const that = this
     this.DataBase = []

     this.setItem = function(Class, item) {
      var t = { type: Class, item: item }
      that.DataBase.push(t)
        };

     this.getClass = function(Class) {
      var Result = []
      for(var i = 0; i < that.DataBase.length; i++) {
       if(that.DataBase[i].type == Class) { Result.push(that.DataBase[i].item) }
         }
     return Result
          };

      this.restoreDefault = function() { that.DataBase = [] }
     }
   };  var EventBase = new EventDataBase(); 
  
       EventBase.restore = function() {  this.active = {}  }  
       EventBase.restore();
  


  class Executor {
  constructor() {
   const that = this
   this.alt = false
   this.down = function(e) {
     var prioretyList = []
       var object = e.target
       var downs = EventBase.getClass("mousedown")
        for(var i = 0; i < downs.length; i++) {
         if(downs[i].object == object) { prioretyList.push(downs[i]); EventBase.active = object }
         }
     if(prioretyList.length) {

     function getPriorety() {
      var Res = [0, 0]
      for(var i = 0; i < prioretyList.length; i++) {
       if(prioretyList[i].priorety > Res[0]) { Res[1] = i }
         }; return Res[1]
      }

       function exe(t) {
          if( prioretyList[ t ].event(e) ) { return true }
          else if(prioretyList.length > 1 && !prioretyList[ t ].event(e) ) { prioretyList = prioretyList.delete(t, true); return false }
          else { return true }
           }  
       function find() {
        var t = getPriorety()
        if( !exe(t) ) { find() }
          }; find()

        }
     }
   this.move = function(e) {
     var prioretyList = []
      var moves = EventBase.getClass("mousemove")
      for(var i = 0; i < moves.length; i++) {
       if(moves[i].object == EventBase.active) { prioretyList.push(moves[i]) }
     }
     if(prioretyList.length) {

     function getPriorety() {
      var Res = [0, 0]
      for(var i = 0; i < prioretyList.length; i++) {
       if(prioretyList[i].priorety > Res[0]) { Res[1] = i }
         }; return Res[1]
      }

       function exe(t) {
          if( prioretyList[ t ].event(e) ) { return true }
          else if(prioretyList.length > 1 && !prioretyList[ t ].event(e) ) { prioretyList = prioretyList.delete(t, true); return false }
          else { return true }
           }  
       function find() {
        var t = getPriorety()
        if( !exe(t) ) { find() }
          }; find()

        }
  }
   this.up = function(e) {
    var prioretyList = []
     var ups = EventBase.getClass("mouseup")
      for(var i = 0; i < ups.length; i++) {
       if(ups[i].object == EventBase.active) { prioretyList.push(ups[i]); }
         }
     if(prioretyList.length) {

     function getPriorety() {
      var Res = [0, 0]
      for(var i = 0; i < prioretyList.length; i++) {
       if(prioretyList[i].priorety > Res[0]) { Res[1] = i }
         }; return Res[1]
      }

       function exe(t) {
          if( prioretyList[ t ].event(e) ) { return true }
          else if(prioretyList.length > 1 && !prioretyList[ t ].event(e) ) { prioretyList = prioretyList.delete(t, true); return false }
          else { return true }
           }  
       function find() {
        var t = getPriorety()
        if( !exe(t) ) { find() }
          }; find()
       EventBase.restore()
        }
    }
    this.handle = function(event) {
       if(event.y == undefined || event.x == undefined) {
        event.y = event.touches[0].pageY
        event.x = event.touches[0].pageX
         }; return event
       }
    this.changeBackground = function() {
     var s = 255 - (canvas.color[0] + canvas.color[1] + canvas.color[2])/3
     var transp = (1-canvas.color[3])/10 + 0.1
     background.style.backgroundColor = "rgba(" + s + "," + s + "," + s + "," + transp + ")"
       }
     }
   }; var executor = new Executor()
