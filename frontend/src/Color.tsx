import { useRef, useState } from 'react'
import ButtonShow from './ButtonShow'
import { twMerge } from 'tailwind-merge'
import Utils from './Utils'
import { IconCirclePlus } from './Icon'

type Color = {
  name?: string,
  hex: string,
}

const Color = () => {
  const [show, setShow] = useState(true)

  const [color, setColor] = useState<Color>({
    name: 'white',
    hex: '#ffffff',
  })

  Utils.Color.color = color.hex

  const ref = useRef<HTMLDivElement>(null)

  const [colors,] = useState<Color[]>([
    { name: 'white', hex: '#ffffff' },
    { name: 'black', hex: '#000000' },
    { name: 'red', hex: '#ff0000' },
    { name: 'green', hex: '#00ff00' },
    { name: 'blue', hex: '#0000ff' },
    { name: 'yellow', hex: '#ffff00' },
    { name: 'cyan', hex: '#00ffff' },
    { name: 'magenta', hex: '#ff00ff' },
    { name: 'gray', hex: '#808080' },
    { name: 'orange', hex: '#ffa500' },
    { name: 'purple', hex: '#800080' },
    { name: 'brown', hex: '#a52a2a' },
    { name: 'lime', hex: '#00ff00' },
    { name: 'olive', hex: '#808000' },
    { name: 'teal', hex: '#008080' },
    { name: 'navy', hex: '#000080' },
    { name: 'maroon', hex: '#800000' },
    { name: 'silver', hex: '#c0c0c0' },
    { name: 'violet', hex: '#ee82ee' },
    { name: 'fuchsia', hex: '#ff00ff' },
    { name: 'aqua', hex: '#00ffff' },
    { name: 'lavender', hex: '#e6e6fa' },
    { name: 'indigo', hex: '#4b0082' },
    { name: 'coral', hex: '#ff7f50' },
    { name: 'crimson', hex: '#dc143c' },
    { name: 'gold', hex: '#ffd700' },
    { name: 'khaki', hex: '#f0e68c' },
    { name: 'turquoise', hex: '#40e0d0' },
    { name: 'peach', hex: '#ffe5b4' },
    { name: 'mint', hex: '#98ff98' },
    { name: 'salmon', hex: '#fa8072' },
    { name: 'plum', hex: '#dda0dd' },
    { name: 'chocolate', hex: '#d2691e' },
    { name: 'slateblue', hex: '#6a5acd' },
    { name: 'periwinkle', hex: '#ccccff' },
    { name: 'apricot', hex: '#fbceb1' },
    { name: 'amber', hex: '#ffbf00' },
    { name: 'rose', hex: '#ff007f' },
    { name: 'scarlet', hex: '#ff2400' },
    { name: 'chartreuse', hex: '#7fff00' },
    { name: 'ivory', hex: '#fffff0' },
    { name: 'beige', hex: '#f5f5dc' },
    { name: 'sienna', hex: '#a0522d' },
    { name: 'cerulean', hex: '#007ba7' },
    { name: 'mauve', hex: '#e0b0ff' },
    { name: 'blush', hex: '#de5d83' },
    { name: 'ruby', hex: '#e0115f' },
    { name: 'mulberry', hex: '#c54b8c' },
    { name: 'midnightblue', hex: '#191970' },
    { name: 'denim', hex: '#1560bd' },
    { name: 'fern', hex: '#4f7942' },
    { name: 'eggplant', hex: '#614051' },
    { name: 'sand', hex: '#c2b280' },
    { name: 'ochre', hex: '#cc7722' },
    { name: 'raspberry', hex: '#e30b5d' },
    { name: 'mustard', hex: '#ffdb58' },
    { name: 'tangerine', hex: '#f28500' },
    { name: 'cerise', hex: '#de3163' },
    { name: 'almond', hex: '#efdecd' },
    { name: 'pearl', hex: '#eae0c8' },
    { name: 'brass', hex: '#b5a642' },
    { name: 'azure', hex: '#007fff' },
    { name: 'springgreen', hex: '#00ff7f' },
    { name: 'saffron', hex: '#f4c430' },
    { name: 'ebony', hex: '#555d50' },
    { name: 'jade', hex: '#00a86b' },
    { name: 'amethyst', hex: '#9966cc' },
    { name: 'skyblue', hex: '#87ceeb' },
    { name: 'limegreen', hex: '#32cd32' },
    { name: 'copper', hex: '#b87333' },
    { name: 'firebrick', hex: '#b22222' },
    { name: 'emerald', hex: '#50c878' },
    { name: 'steelblue', hex: '#4682b4' },
    { name: 'sandstone', hex: '#786d5f' },
    { name: 'moss', hex: '#8a9a5b' },
    { name: 'caramel', hex: '#af6f09' },
    { name: 'powderblue', hex: '#b0e0e6' },
    { name: 'bordeaux', hex: '#5c0120' },
    { name: 'pine', hex: '#01796f' },
    { name: 'flamingo', hex: '#fc8eac' },
    { name: 'seashell', hex: '#fff5ee' },
    { name: 'brick', hex: '#cb4154' },
    { name: 'charcoal', hex: '#36454f' },
    { name: 'butterscotch', hex: '#fdb147' },
    { name: 'honeydew', hex: '#f0fff0' },
    { name: 'tawny', hex: '#cd5700' },
    { name: 'bronze', hex: '#cd7f32' },
    { name: 'cornflowerblue', hex: '#6495ed' },
    { name: 'orchid', hex: '#da70d6' },
    { name: 'sapphire', hex: '#0f52ba' },
    { name: 'ultramarine', hex: '#3f00ff' },
    { name: 'pewter', hex: '#96a8a1' },
    { name: 'banana', hex: '#ffe135' },
    { name: 'smokyblack', hex: '#100c08' },
    { name: 'camel', hex: '#c19a6b' },
    { name: 'pistachio', hex: '#93c572' },
    { name: 'persianblue', hex: '#1c39bb' },
    { name: 'mimosa', hex: '#ffca4b' },
    { name: 'clover', hex: '#3ea055' },
    { name: 'canary', hex: '#ffef00' },
    { name: 'frost', hex: '#e5f9f6' }
  ])

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollLeft += e.deltaY
    }
  }

  return (
    <div>
      <div className='fixed z-[2] right-4 left-4 bottom-0'>
        <div className={twMerge(
          'absolute h-28 bottom-0 left-14 right-14 bg-rgb-245 dark:bg-rgb-60 transition-all rounded-tl-md rounded-tr-md border-l border-r border-t dark:border-rgb-80 shadow-[0_4px_32px_0_rgba(0,0,0,0.1)] overflow-hidden',
          show ? 'translate-y-0' : 'translate-y-full'
        )}>
          <div className='absolute top-0 bottom-0 left-0 w-18 flex flex-col items-center justify-center text-[10px] font-semibold'>
            <div className='w-10 h-10 mb-1 rounded-full border-2 border-rgb-215 dark:border-rgb-80' style={{ backgroundColor: color.hex }}>
            </div>
            <span>
              {color.name}
            </span>
            <span>
              {color.hex}
            </span>

          </div>
          <div
            className='absolute top-0 bottom-0 left-18 right-0 overflow-x-auto grid grid-rows-2 grid-flow-col gap-x-3 scroll-smooth pt-1 px-2'
            ref={ref}
            onWheel={handleWheel}>
            <button
              className='w-20 flex flex-col items-center text-[10px] font-semibold'
              onClick={() => 1}>
              <div className='w-20 h-10 rounded flex items-center justify-center border border-rgb-215 dark:border-rgb-80 active:scale-95'>
                <IconCirclePlus />
              </div>
            </button>
            {colors.map(({ hex, name }, index) => (
              <button
                key={index}
                className='w-20 flex flex-col items-center text-[10px] font-semibold'
                onClick={() => setColor({ name, hex })}>
                <div className='w-20 h-12 rounded flex items-center justify-center' style={{ backgroundColor: hex }}>
                  {hex}
                </div>
                <span>
                  {name}
                </span>
              </button>
            ))}
          </div>
        </div>
        <ButtonShow
          className={twMerge(
            'left-1/2 -translate-x-1/2 rotate-180',
            show ? 'bottom-[108px]' : 'bottom-0'
          )}
          onClick={() => setShow(!show)}
          show={show} />
      </div>
    </div>
  )
}

export default Color