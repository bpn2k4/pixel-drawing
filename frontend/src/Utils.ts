

const Utils = {
  Tool: {
    mode: 'move' as 'move' | 'draw',
  },
  Canvas: {
    scale: (factor: number) => {
      console.log(factor)
    },

    center: () => {

    },
    setCursor: (cursor: 'default' | 'grab' | 'grabbing') => {
      cursor += ''
    },
    drawPoints: (points: [number, number, string][]) => {
      console.log(points)
    }
  },
  Color: {
    color: null as unknown as string
  },
  ScriptModal: {
    isShow: false,
    show: (config: {
      onConfirm: (points: [number, number, string][]) => void
    }) => {
      console.log(config)
    },
    hide: () => { }
  }
}

export default Utils