let canvas = document.querySelector("#canvas")
let context = canvas.getContext("2d")
let goma = document.querySelector("#goma")
let size = document.getElementById('size')
let color = document.getElementById('color')
let save = document.getElementById('save')
let smooth = document.getElementById('smooth')
let offset = canvas.getBoundingClientRect()
let ispressed = false
let isupdated = false
/*let currentColor = 'black'
let currentTool = 'lapiz'
let filter = ''
let startX = 0
let startY = 0*/
let state = {
    color : 'black', 
    tool : 'lapiz',
    width : 1,
    blur : 0
}
let lines = [

]
let offcanvas = document.createElement('canvas')
offcanvas.width = canvas.width
offcanvas.height = canvas.height

document.addEventListener("mouseup", function () {
    ispressed = false
})


canvas.addEventListener("mousedown", function (event) {
    let point = [
        event.clientX - offset.left,
        event.clientY - offset.top
    ]
    let  color
    if (state.tool==='goma') {
       color = 'white'
       } else {
       color = state.color
       }
     let line = {
         width : state.width,
         blur : state.blur,
         color : color,
        points : [
            point,
        ]
     }

     lines.push(line)

   /* startX = event.clientX - offset.left
    startY = event.clientY - offset.top*/

    ispressed = true
})

canvas.addEventListener("mousemove", function (event) {
   /*let x = event.clientX - offset.left
    let y = event.clientY - offset.top*/
    //console.log("x=", event.clientX, "y=", event.clientY)
    if (ispressed) {
      /*   context.beginPath()
        context.filter=filter
        context.moveTo(startX, startY)
        context.lineTo(x, y)
        context.stroke()

        startX = x
        startY = y */
        let line = lines[lines.length - 1]
        let point = [
            event.clientX - offset.left,
            event.clientY - offset.top
        ]

        line.points.push(point)
        isupdated = true
    }
})

canvas.addEventListener("mouseleave", function () {
    ispressed = false
    isupdated = true
})


goma.addEventListener("click", function () {
   
    state.tool = 'goma'
    //context.lineWidth = 20
})


lapiz.addEventListener("click", function () {
    
    state.tool = 'lapiz'
    //context.lineWidth = 1
})

size.addEventListener('change', function (event) {
    state.width = event.target.value
   
})

color.addEventListener('change', function (event) {
    state.color = event.target.value

    if (state.tool === 'lapiz') { 
        context.strokeStyle = state.color
    }
})
/*save.addEventListener('click', function (){
    let picture = canvas.toDataURL('image/png')

    save.href = picture
    console.log(picture)
   let newwindow = window.open("about:blank")
   newwindow.document.write(`<img src="${picture}">`)
})*/
smooth.addEventListener('change', function (event){
    state.blur = event.target.value
    
})




function  draw () {
    if (isupdated) {
        let offctx = offcanvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
        lines.forEach(function(line){
            offctx.clearRect(0, 0, canvas.width, canvas.height)
            offctx.beginPath()
            offctx.moveTo(...line.points[0])
            line.points.slice(1).forEach(function(point){
                offctx.lineTo(...point)
            })
            offctx.lineWidth = line.width
            offctx.strokeStyle = line.color
          
            offctx.filter = `blur(${line.blur}px)`
            offctx.stroke()
            context.drawImage(offcanvas, 0,0)

        }) 
        
        isupdated = false

    }
    requestAnimationFrame(draw)
    
}
requestAnimationFrame(draw) 