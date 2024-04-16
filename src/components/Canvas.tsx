import { FC, useLayoutEffect, useRef, useState } from 'react'

const WIDTH = 1920;
const HEIGHT = 1080;
const Canvas: FC<CanvasProps> = () => {

  const [scale, setScale] = useState<number>(1)
  const [isMoving, setIsMoving] = useState(true)
  const [ref, _] = useState<StateRef>({
    canvas: null,
    context: null,
    scale: scale,
    isMoving: isMoving,
    translate: { x: 0, y: 0 }
  })

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const clearCanvas = () => {
    const left = ref.translate.x
    const top = ref.translate.y
    const right = WIDTH * ref.scale + ref.translate.x
    const bottom = HEIGHT * ref.scale + ref.translate.y
    const width = Math.abs(right - left);
    const height = Math.abs(bottom - top);
    ref.context?.clearRect(left, top, width, height);
  }

  const drawCanvas = () => {
    clearCanvas()
  }

  useLayoutEffect(() => {
    ref.canvas = canvasRef.current
    ref.context = canvasRef.current?.getContext("2d")
  }, [])

  return (
    <div>
      <canvas ref={canvasRef}>

      </canvas>
    </div>
  )
}

export default Canvas
type CanvasProps = {

}

type StateRef = {
  canvas: HTMLCanvasElement | null,
  context: CanvasRenderingContext2D | null | undefined
  scale: number,
  isMoving: Boolean,
  translate: { x: number, y: number },

}