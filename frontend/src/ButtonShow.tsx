import { twMerge } from 'tailwind-merge'
import { IconAngle } from './Icon'


const ButtonShow = (props: ButtonShowProps) => {

  const { className, onClick, show } = props

  return (
    <div
      className={twMerge(
        'h-4 fixed cursor-pointer transition-all group active:scale-95',
        className
      )}
      onClick={onClick}>
      <div className={twMerge(
        'w-4 h-4 bg-yellow-500 relative border-y border-rgb-200 dark:border-rgb-100 group-hover:bg-pink-500 flex items-center justify-center',
        "before:contents-[''] before:block before:bg-yellow-500 before:w-7 before:h-4 before:absolute before:top-[-1px] before:-left-[16px] before:skew-x-[20deg] before:rounded-lg before:z-[-1] before:border before:border-rgb-200 before:dark:border-rgb-100 before:group-hover:bg-pink-500",
        "after:contents-[''] after:block after:bg-yellow-500 after:w-7 after:h-4 after:absolute after:top-[-1px] after:-right-[16px] after:-skew-x-[20deg] after:rounded-lg after:z-[-1] after:border after:border-rgb-200 after:dark:border-rgb-100 after:group-hover:bg-pink-500",
      )}>
        <IconAngle className={twMerge(
          'transition-all duration-300',
          show ? 'rotate-90' : '-rotate-90'
        )} />
      </div>

    </div>
  )
}

type ButtonShowProps = {
  className?: string,
  onClick?: () => void
  show?: boolean,
}

export default ButtonShow