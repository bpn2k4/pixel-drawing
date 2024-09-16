import { twMerge } from "tailwind-merge"
import useDebounce from "./useDebounce"


const Modal = (props: ModalProps) => {

  const { className, show, children, onClickOutsize, cx } = props

  const _show = useDebounce(show, show ? 0 : 400)
  const __show = useDebounce(show, show ? 100 : 0)

  return (
    _show ? (
      <div
        className={twMerge(
          "fixed top-0 bottom-0 left-0 right-0 z-[99] flex items-center justify-center bg-black/50 transition-opacity duration-300",
          __show ? "opacity-100" : "opacity-0",
          cx?.wrapper
        )}>
        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-[1]"
          onClick={onClickOutsize} />
        <div className={twMerge(
          'z-[2] mx-3 w-full max-w-[400px] min-h-[200px] max-h-[calc(100dvh-40px)] rounded-lg bg-rgb-255 dark:bg-rgb-0 text-rgb-15 dark:text-rgb-240 overflow-hidden',
          className,
          cx?.content
        )}>
          {children}
        </div>
      </div>
    ) : (
      <></>
    )
  )
}

type ModalProps = {
  className?: string,
  cx?: {
    wrapper?: string,
    content?: string,
  }
  show?: boolean,
  children?: React.ReactNode,
  onClickOutsize?: () => void
}

export default Modal