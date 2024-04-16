import { FC, ReactNode } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Draw from './pages/Draw'

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/draw/:boardId',
    element: <Draw />
  }
]

const AppRouter: FC<AppRouterProps> = ({ children }) => {

  return (
    <Routes>
      {routes.map(({ path, element }, index) => (
        <Route
          key={index}
          path={path}
          element={element} />
      ))}
      {children}
    </Routes>
  )
}

export default AppRouter

type AppRouterProps = {
  children?: ReactNode
}