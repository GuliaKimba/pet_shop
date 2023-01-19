import { Outlet } from 'react-router-dom'
import cn from 'classnames'
import stl from './app.module.scss'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <div className={cn(stl.app)}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
