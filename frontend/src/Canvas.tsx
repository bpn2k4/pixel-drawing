import { useEffect, useRef, useState, memo } from 'react'
import Utils from './Utils'
import { API_URL, CANVAS_HEIGHT, CANVAS_WIDTH } from './Config'
import { io } from 'socket.io-client'

type Point = {
  x: number
  y: number
  color: string
}

const CanvasReal = memo(() => {

  const ref = useRef<HTMLCanvasElement>(null)

  const [canvas,] = useState({
    context: null as unknown as CanvasRenderingContext2D
  })

  const firstDraw = () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        fetch(`${API_URL}/api/points?px=${i}&py=${j}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            for (let k = 0; k < data.length; k += 3) {
              const x = data[k]
              const y = data[k + 1]
              const color = data[k + 2]
              canvas.context.fillStyle = color
              canvas.context.fillRect(x, y, 1, 1)
            }
          })
          .catch(_ => { })
      }
    }
  }


  useEffect(() => {

    if (!ref.current) return

    canvas.context = ref.current.getContext('2d') as CanvasRenderingContext2D

    firstDraw()

    const socket = io(API_URL, {
      path: '/web-socket'
    })

    if (!socket) return

    socket.on('new-point', (data: Point) => {
      const { x, y, color } = data
      canvas.context.fillStyle = color
      canvas.context.fillRect(x, y, 1, 1)
    })

    return () => {
      socket.disconnect()
    }

  }, [])

  useEffect(() => {


  }, [])

  Utils.Canvas.drawPoints = (pointsList: [number, number, string][]) => {
    for (let i = 0; i < pointsList.length; i += 3) { }
  }

  const handleClick = async (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {

    if (Utils.Tool.mode == 'move') {
      return
    }

    const rect = ref.current?.getBoundingClientRect() as DOMRect
    const x = Math.floor((e.clientX - rect.left) / rect.width * CANVAS_WIDTH)
    const y = Math.floor((e.clientY - rect.top) / rect.height * CANVAS_HEIGHT)

    const color = Utils.Color.color

    fetch(`${API_URL}/api/points`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ x: x, y: y, color: color })
    }).catch(_ => { })
  }

  return (
    <canvas
      className='bg-rgb-245'
      style={{ imageRendering: 'pixelated' }}
      ref={ref}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      onClick={handleClick}>
    </canvas>
  )
})

const Canvas = () => {

  const [canvasState, setCanvasState] = useState({
    scale: 1,
    translate: {
      x: 0,
      y: 0
    },
    dragging: false
  })

  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (Utils.Tool.mode == 'move') {
      e.preventDefault()
      e.stopPropagation()
      canvasState.dragging = true
      setCanvasState({ ...canvasState })
    }
  }

  const handleMouseUp = () => {
    if (Utils.Tool.mode == 'move' && canvasState.dragging) {
      canvasState.dragging = false
      setCanvasState({ ...canvasState })
    }
  }

  const handleMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    canvasState.scale = canvasState.scale * factor
    canvasState.translate.x = e.pageX - (e.pageX - canvasState.translate.x) * factor
    canvasState.translate.y = e.pageY - (e.pageY - canvasState.translate.y) * factor
    setCanvasState({ ...canvasState })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (Utils.Tool.mode == 'move' && canvasState.dragging) {
      e.preventDefault()
      e.stopPropagation()
      canvasState.translate.x += e.movementX
      canvasState.translate.y += e.movementY
      setCanvasState({ ...canvasState })
    }
  }

  useEffect(() => {

    if (canvasState.scale == 1) {
      const rect = wrapperRef.current?.getBoundingClientRect() as DOMRect
      const { width, height } = rect

      const widthScale = width / CANVAS_WIDTH
      const heightScale = height / CANVAS_HEIGHT

      if (widthScale < heightScale) {
        const aspectWidth = width - 144
        const aspectHeight = aspectWidth * CANVAS_HEIGHT / CANVAS_WIDTH
        const factor = CANVAS_WIDTH / aspectWidth
        canvasState.scale = canvasState.scale / factor
        canvasState.translate.x = (width - aspectWidth) / 2
        canvasState.translate.y = (height - aspectHeight) / 2
        setCanvasState({ ...canvasState })
      }
      else {
        const aspectHeight = height - 200
        const aspectWidth = aspectHeight * CANVAS_WIDTH / CANVAS_HEIGHT
        const factor = CANVAS_HEIGHT / aspectHeight
        canvasState.scale = canvasState.scale / factor
        canvasState.translate.x = (width - aspectWidth) / 2
        canvasState.translate.y = 72
        setCanvasState({ ...canvasState })
      }
    }

  }, [])

  Utils.Canvas.center = () => {

    const rect = wrapperRef.current?.getBoundingClientRect() as DOMRect
    const { width, height } = rect

    const widthScale = width / CANVAS_WIDTH
    const heightScale = height / CANVAS_HEIGHT


    if (widthScale < heightScale) {
      const aspectWidth = width - 140
      const aspectHeight = aspectWidth * CANVAS_HEIGHT / CANVAS_WIDTH
      const factor = CANVAS_WIDTH / aspectWidth
      canvasState.scale = 1 / factor
      canvasState.translate.x = (width - aspectWidth) / 2
      canvasState.translate.y = (height - aspectHeight) / 2
      setCanvasState({ ...canvasState })
    }
    else {
      const aspectHeight = height - 140
      const aspectWidth = aspectHeight * CANVAS_WIDTH / CANVAS_HEIGHT
      const factor = CANVAS_HEIGHT / aspectHeight
      canvasState.scale = 1 / factor
      canvasState.translate.x = (width - aspectWidth) / 2
      canvasState.translate.y = (height - aspectHeight) / 2
      setCanvasState({ ...canvasState })
    }
  }

  Utils.Canvas.scale = (factor: number) => {

    const rect = wrapperRef.current?.getBoundingClientRect() as DOMRect
    const { width, height } = rect
    const x = width / 2
    const y = height / 2
    canvasState.scale = canvasState.scale * factor
    canvasState.translate.x = x - (x - canvasState.translate.x) * factor
    canvasState.translate.y = y - (y - canvasState.translate.y) * factor
    setCanvasState({ ...canvasState })
  }

  return (
    <div
      ref={wrapperRef}
      className='fixed top-0 bottom-0 left-0 right-0 overflow-hidden'
      onWheel={handleMouseWheel}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}>
      <div
        className='absolute origin-top-left'
        ref={canvasRef}
        style={{
          left: canvasState.translate.x,
          top: canvasState.translate.y,
          transform: `scale(${canvasState.scale})`,
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT
        }}>
        <CanvasReal />
      </div>
    </div>
  )
}

export default Canvas