import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import ButtonShow from './ButtonShow'
import { IconCode, IconMinimize, IconMove, IconPen, IconRotate } from './Icon'
import Utils from './Utils'


const Tool = () => {

  const [show, setShow] = useState(true)

  const [mode, setMode] = useState<'draw' | 'move'>('move')

  Utils.Tool.mode = mode

  useEffect(() => {

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        setMode(mode => mode === 'move' ? 'draw' : 'move')
      }
    }

    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keyup', handleKeyUp)
    }

  }, [])

  Utils.Canvas.setCursor(mode == 'draw' ? 'default' : 'grab')

  const handleCode = () => {
    Utils.ScriptModal.show({
      onConfirm: (points: [number, number, string][]) => {
        Utils.Canvas.drawPoints(points)
        Utils.ScriptModal.hide()
      }
    })
  }

  return (
    <div>
      <div className='fixed z-[2] top-14 bottom-14 left-0'>
        <div className={twMerge(
          'absolute top-0 left-0 bottom-0 px-2 py-2 w-14 bg-rgb-245 dark:bg-rgb-60 overflow-y-auto no-scrollbar shadow-[0_4px_32px_0_rgba(0,0,0,0.1)] transition-all rounded-tr-md rounded-br-md border-t border-r border-b dark:border-rgb-80',
          show ? 'translate-x-0' : '-translate-x-full'
        )}>
          <div className='my-2'>
            <button
              className={twMerge(
                'w-10 h-10 border border-rgb-215 dark:border-rgb-80 rounded flex items-center justify-center transition-all active:scale-95',
                mode === 'move' ? 'bg-rgb-200 dark:bg-rgb-100' : 'bg-transparent'
              )}
              onClick={() => setMode(mode === 'move' ? 'draw' : 'move')}>
              <IconMove />
            </button>
          </div>
          <div className='my-2'>
            <button
              className={twMerge(
                'w-10 h-10 border border-rgb-215 dark:border-rgb-80 rounded flex items-center justify-center transition-all active:scale-95',
                mode === 'draw' ? 'bg-rgb-200 dark:bg-rgb-100' : 'bg-transparent'
              )}
              onClick={() => setMode(mode === 'draw' ? 'move' : 'draw')}>
              <IconPen />
            </button>
          </div>
          <div className='my-2'>
            <button
              className='w-10 h-10 border border-rgb-215 dark:border-rgb-80 rounded flex items-center justify-center transition-all active:scale-95'
              onClick={() => 1}>
              <IconRotate />
            </button>
          </div>
          <div className='my-2'>
            <button
              className='w-10 h-10 border border-rgb-215 dark:border-rgb-80 rounded flex items-center justify-center transition-all active:scale-95'
              onClick={() => Utils.Canvas.center()}>
              <IconMinimize />
            </button>
          </div>
          <div className='my-2'>
            <button
              className='w-10 h-10 border border-rgb-215 dark:border-rgb-80 rounded flex items-center justify-center text-sm font-bold transition-all active:scale-95'
              onClick={() => Utils.Canvas.scale(2)}>
              x2
            </button>
          </div>
          <div className='my-2'>
            <button
              className='w-10 h-10 border border-rgb-215 dark:border-rgb-80 rounded flex items-center justify-center text-sm font-bold transition-all active:scale-95'
              onClick={() => Utils.Canvas.scale(0.5)}>
              x0.5
            </button>
          </div>
          <div className='my-2'>
            <button
              className='w-10 h-10 border border-rgb-215 dark:border-rgb-80 rounded flex items-center justify-center text-sm font-bold transition-all active:scale-95'
              onClick={handleCode}>
              <IconCode />
            </button>
          </div>
        </div>
        <ButtonShow
          className={twMerge(
            'top-1/2 -translate-y-1/2 -rotate-90',
            show ? 'left-13' : 'left-0'
          )}
          onClick={() => setShow(!show)}
          show={show} />
      </div>
    </div>
  )
}

export default Tool