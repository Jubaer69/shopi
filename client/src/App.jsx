import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Cart from './components/cart'

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
