
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Cart from './components/Cart'

// import Cart from './components/cart'

function App() {
  
  return (
    <div className='w-full  min-h-screen relative bg-[#fce5cd] text-[#444444]'>
        
        
        <Header />
        <Cart />

        <Outlet />
        {/* <p>Made by jubaer</p> */}
        
        
    </div>
  )
}

export default App
