import { FC, ReactNode } from 'react'
import { Routes, Route } from 'react-router-dom'

const routes = [
  {
    path: '/',
    element: <h1>Test</h1>
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