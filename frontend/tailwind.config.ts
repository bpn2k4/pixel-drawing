import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
        17: '4.25rem',
        18: '4.5rem',
      },
      colors: {
        rgb: {
          0: 'rgb(0,0,0)',
          15: 'rgb(15,15,15)',
          20: 'rgb(20,20,20)',
          25: 'rgb(25,25,25)',
          40: 'rgb(40,40,40)',
          45: 'rgb(45,45,45)',
          50: 'rgb(50,50,50)',
          60: 'rgb(60,60,60)',
          80: 'rgb(80,80,80)',
          85: 'rgb(85,85,85)',
          100: 'rgb(100,100,100)',
          200: 'rgb(200,200,200)',
          215: 'rgb(215,215,215)',
          220: 'rgb(220,220,220)',
          225: 'rgb(225,225,225)',
          230: 'rgb(230,230,230)',
          235: 'rgb(235,235,235)',
          240: 'rgb(240,240,240)',
          245: 'rgb(245,245,245)',
          255: 'rgb(255,255,255)',
        },
      },
    },
  },
}
export default config
