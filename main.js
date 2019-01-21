var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')

autoSetCanvasSize(yyy)

/*************************/
listenToUser(yyy)

/************************************/
var eraserEnabled = false
pen.onclick = function (){
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}

eraser.onclick = function (){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

red.onclick = function (){
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}

green.onclick = function (){
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  green.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
}

blue.onclick = function (){
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  blue.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
}

/***********************************************/
function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  //context.fillStyle = 'black'
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  //context.strokeStyle = 'black'
  context.moveTo(x1, y1) //起点
  context.lineWidth = 5
  context.lineTo(x2, y2) //终点
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {
  var using = false //是否为橡皮状态

  var lastPoint = {
    x: undefined,
    y: undefined
  }

  // 特性检测
  if (document.body.ontouchstart !== undefined) {
    // 触屏设备
    canvas.ontouchstart = function (ev) {
      var x = ev.touches[0].clientX
      var y = ev.touches[0].clientY
      console.log(x, y)
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        // 鼠标按下时记录最后一个点
        lastPoint = {
          'x': x,
          'y': y
        }
      }
    }

    canvas.ontouchmove = function (ev) {
      console.log('表示大苏打')
      var x = ev.touches[0].clientX
      var y = ev.touches[0].clientY

      if (!using) { return }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          'x': x,
          'y': y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        // 鼠标移动之后最新的点为一开始记录的点
        lastPoint = newPoint
      }
    }

    canvas.ontouchend = function () {
      console.log('摸完了')
      using = false
    }
  } else {
    // 非触屏设备
    canvas.onmousedown = function (ev) {
      var x = ev.clientX
      var y = ev.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        // 鼠标按下时记录最后一个点
        lastPoint = {
          'x': x,
          'y': y
        }
      }
    }

    canvas.onmousemove = function (ev) {
      var x = ev.clientX
      var y = ev.clientY

      if (!using) { return }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          'x': x,
          'y': y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        // 鼠标移动之后最新的点为一开始记录的点
        lastPoint = newPoint
      }
    }

    canvas.onmouseup = function (ev) {
      using = false
    }
  }
}