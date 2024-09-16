import { memo, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import ButtonShow from './ButtonShow'
import { IconMoon, IconSun } from './Icon'
import logo from './logo.png'


const Header = () => {

  const [show, setShow] = useState(true)

  return (
    <div>
      <div className='fixed z-[2] top-0 left-4 right-4'>
        <div className={twMerge(
          'absolute h-14 top-0 left-14 right-14 flex flex-row justify-between bg-rgb-245 dark:bg-rgb-60 transition-all rounded-bl-md rounded-br-md border-l border-r border-b dark:border-rgb-80 shadow-[0_4px_32px_0_rgba(0,0,0,0.1)]',
          show ? 'translate-y-0' : '-translate-y-full'
        )}>
          <button className='px-4'>
            <img
              className='w-12 h-12 -scale-x-100'
              src={logo} />
          </button>
          <div className='h-full px-4 flex flex-row items-center'>
            <ToggleTheme />
          </div>

        </div>
        <ButtonShow
          show={show}
          className={twMerge(
            'left-1/2 -translate-x-1/2',
            show ? 'top-13' : 'top-0'
          )}
          onClick={() => setShow(!show)} />


      </div>
    </div>
  )
}


const ToggleTheme = memo(() => {

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const theme = localStorage.getItem('theme')
    if (theme && (theme == 'light' || theme == 'dark')) {
      return theme
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'dark'
  })


  const isDark = theme == 'dark'

  useEffect(() => {
    if (theme == 'dark') {
      localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark')
    } else {
      localStorage.setItem('theme', 'light')
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleChangeTheme = () => {
    setTheme(theme => theme == 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      className={twMerge(
        'size-10 relative rounded-full bg-transparent overflow-hidden transition-all',
        'hover:bg-rgb-225 dark:hover:bg-rgb-60'
      )}
      onClick={handleChangeTheme}>
      <div className={twMerge(
        'absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center rounded-full text-primary transition-transform duration-300',
        isDark ? 'opacity-0 rotate-45' : 'opacity-100 rotate-0'
      )}>
        <IconSun />
      </div>
      <div className={twMerge(
        'absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center rounded-full text-primary transition-transform duration-300',
        isDark ? 'opacity-100 -rotate-12' : 'opacity-0 -rotate-45'
      )}>
        <IconMoon />
      </div>
    </button>
  )
})

export default Header