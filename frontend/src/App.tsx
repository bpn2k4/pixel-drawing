import Canvas from './Canvas'
import Color from './Color'
import Header from './Header'
import ScriptModal from './ScriptModal'
import Splash from './Splash'
import Tool from './Tool'

const App = () => {

  return (
    <div className="w-dvw h-dvh overflow-hidden bg-rgb-220 dark:bg-rgb-45 text-rgb-25 dark:text-rgb-230 transition-all duration-300">
      <Header />
      <Canvas />
      <Color />
      <Tool />
      <Splash />
      <ScriptModal />
    </div>
  )
}

export default App
