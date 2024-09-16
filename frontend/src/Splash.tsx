import { useEffect, useState } from 'react'
import useDebounce from './useDebounce'
import { twMerge } from 'tailwind-merge'

const Splash = () => {

  const [show, setShow] = useState(true)

  const _show = useDebounce(show, show ? 0 : 1000)
  const __show = useDebounce(show, 50)

  useEffect(() => {

    const timer = setTimeout(() => {
      setShow(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    _show ? (
      <div className={twMerge(
        'fixed top-0 bottom-0 left-0 right-0 bg-rgb-235 dark:bg-rgb-40 z-[99] flex items-center justify-center transition-all duration-500',
        __show ? 'translate-y-0' : '-translate-y-full'

      )}>

      </div>
    ) : (
      <></>
    )
  )
}

export default Splash