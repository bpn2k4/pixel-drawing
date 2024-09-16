import { twMerge } from 'tailwind-merge'
import { useEffect, useState } from 'react'
import Modal from './Modal'
import { IconXMark } from './Icon'
import useDebounce from './useDebounce'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './Config'
import Utils from './Utils'

const ScriptModal = () => {

  const [show, setShow] = useState(false)

  const [code, setCode] = useState('')
  const [errors, setErrors] = useState<number[]>([])
  const [valid, setValid] = useState(false)

  const [config, setConfig] = useState({
    onConfirm: (points: [number, number, string][]) => {
      console.log(points)
    },
  })

  Utils.ScriptModal.show = (newConfig: typeof config) => {
    setConfig({
      ...config,
      ...newConfig,
    })
    setShow(true)
  }

  Utils.ScriptModal.hide = () => {
    setShow(false)
  }

  const codeDebounce = useDebounce(code, 1000)

  useEffect(() => {

    const isValidCode = (input: string) => {

      const errors = []

      if (!input) {
        return []
      }

      const lines = input.split('\n').map(line => line.trim())
      const pattern = /^(\d+),(\d+),(#[a-fA-F0-9]{6})$/

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        if (!line) {
          continue
        }

        const match = line.match(pattern)

        if (!match) {
          errors.push(i + 1)
          continue
        }

        const x = parseInt(match[1], 10)
        const y = parseInt(match[2], 10)

        if (x < 0 || x >= CANVAS_WIDTH || y < 0 || y >= CANVAS_HEIGHT) {
          errors.push(i + 1)
        }
      }

      return errors
    }

    const errors = isValidCode(codeDebounce)
    setErrors(errors)
    if (errors.length === 0 && codeDebounce) {
      setValid(true)
    }

  }, [codeDebounce])

  const placeHolder = `3,5,#ff0011\n5,5,#00ff00\n0,0,#000000`

  useEffect(() => {

    if (!show) {
      setConfig({
        onConfirm: (points: [number, number, string][]) => {
          console.log(points)
        }
      })
      setCode('')
      setErrors([])
      setValid(false)
    }
  }, [show])

  return (
    <Modal
      show={show}
      className='max-w-[600px] flex flex-col text-xs mx-5'
      onClickOutsize={() => setShow(false)}>
      <div className='relative border-b'>
        <div className='h-10 flex items-center justify-center font-semibold'>
          Script
        </div>
        <button
          className='absolute top-1 right-2 size-8 flex items-center justify-center rounded-full hover:bg-rgb-215 dark:hover:bg-rgb-60'
          onClick={() => setShow(false)}>
          <IconXMark />
        </button>
      </div>

      <div className='flex-1 px-3 overflow-y-auto py-3 relative'>
        <textarea
          className='w-full h-[300px] outline-none resize-none border bg-transparent rounded-md p-4 font-[monospace] text-sm leading-4'
          value={code}
          onChange={e => {
            setErrors([])
            setCode(e.target.value)
            setValid(false)
          }}
          placeholder={placeHolder}
          spellCheck="false" >
        </textarea>
        <div className={twMerge(
          'mt-2 origin-top transition-all font-semibold',
          (errors.length > 0 || valid) ? 'scale-y-100' : 'scale-y-0',
          valid ? 'text-green-500' : 'text-red-500'
        )}>
          {valid ? 'Syntax OK!' : `Have error at lines: ${errors.join(', ')}`}
        </div>
      </div>

      <div className='border-t'>
        <div className='h-11 flex flex-row px-4 gap-4 items-center justify-center text-rgb-255 font-medium'>
          <button
            className='flex-1 h-9 bg-red-400 rounded-md border transition-all active:scale-95'
            onClick={() => setShow(false)}>
            Cancel
          </button>
          <button className={twMerge(
            'flex-1 h-9 bg-green-400 rounded-md border transition-all',
            valid ? 'active:scale-95' : 'opacity-50 cursor-default'
          )}
            onClick={() => {
              if (!valid) {
                return
              }
              const pattern = /^(\d+),(\d+),(#[a-fA-F0-9]{6})$/
              const points = codeDebounce.split('\n').map(line => line.trim()).filter(line => line).map(line => {
                const match = line.match(pattern) as RegExpMatchArray
                return [parseInt(match[1], 10), parseInt(match[2], 10), match[3].toString()] as [number, number, string]
              })
              config.onConfirm(points)
            }}>
            Run
          </button>
        </div>
      </div>


    </Modal>
  )
}

export default ScriptModal