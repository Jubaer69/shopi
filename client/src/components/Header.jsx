import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { setIsOpen } from '../toolkit/slices/buyerSlice';

function Header() {

  const buyer = useSelector((d) => d.user.isBuyer);
  const admin = useSelector((d) => d.admin.isAdmin);
  const dispatch = useDispatch();

  const [menu, setMenu] = useState(false)


  function menuclose(){
    setMenu(false)
  }

  function menuOpen(){
    setMenu(true)
  }




  function fnOpen(){
      dispatch(setIsOpen(true))
      
  }

  // console.log(buyer)

  if(buyer){
    return  <div className='w-full relative z-[300]'>
      <div className={`fixed left-0  transition-all duration-500 ${menu ? 'top-[70px]' : 'top-[-400px]'} h-fit bg-black rounded-bl-3xl rounded-br-3xl  text-white p-10 z-[4000] w-full  lg:hidden block`}>
            <div className="nav flex flex-col items-center gap-5">
                <Link onClick={() => setMenu(false)} to={'/products'} href="">Products</Link>
                <Link onClick={() => setMenu(false)} to={'/myorders'} href="">Orders</Link>
                <Link onClick={() => setMenu(false)} to={'/profile'} href="">Profile</Link>
            </div>
      </div>
      <div className='hidden lg:block'>
              <header className='w-full flex fixed top-0 left-0 items-center justify-between p-[20px_10%]'>
            <h1 className='text-[24px] font-bold'>Shopi</h1>

            <div className="nav flex items-center gap-10">
                <Link to={'/products'} href="">Products</Link>
                <Link to={'/myorders'} href="">Orders</Link>
                <Link to={'/profile'} href="">Profile</Link>
            </div>

            <div>
                <i onClick={() => fnOpen()}  className="ri-shopping-cart-line cursor-pointer text-[20px]"></i>
            </div>
      </header>
      </div>

      <div className='block lg:hidden mix-blend-difference'>
          <header className='w-full flex fixed top-0 left-0 items-center justify-between p-[20px_5%]'>
            <h1 className='text-[20px] mix-blend-difference font-bold'>Shopi</h1>

            <div className='flex items-center gap-5'>
              <i onClick={() => fnOpen()}  className="ri-shopping-cart-line cursor-pointer text-[20px]"></i>
              {
                menu ? <i onClick={() => menuclose()}  className="ri-close-large-line cursor-pointer font-bold text-[20px]"></i> : 
                <i onClick={() => menuOpen()}  className="ri-menu-5-line cursor-pointer font-bold text-[20px]"></i>
              }

            </div>
          </header>
      </div>
    </div>
  }
  else if(admin){
    return  <div className='w-full relative z-[300]'>
    <div className={`fixed left-0  transition-all duration-500 ${menu ? 'top-[70px]' : 'top-[-400px]'} h-fit bg-black rounded-bl-3xl rounded-br-3xl  text-white p-10 z-[4000] w-full  lg:hidden block`}>
          <div className="nav flex flex-col items-center gap-5">
            <Link onClick={() => setMenu(false)} to={'/admin/orders'} href="">Orders</Link>
              <Link onClick={() => setMenu(false)} to={'/create/product'} href="">Create product</Link>
              <Link onClick={() => setMenu(false)} to={'/wearhouse'} href="">Wearhouse</Link>
          </div>
    </div>
    <div className='hidden lg:block'>
            <header className='w-full flex fixed top-0 left-0 items-center justify-between p-[20px_10%]'>
          <h1 className='text-[24px] font-bold'>Shopi</h1>

          <div className="nav flex items-center gap-10">
              <Link to={'/admin/orders'} href="">Orders</Link>
              <Link to={'/create/product'} href="">Create product</Link>
              <Link to={'/wearhouse'} href="">Wearhouse</Link>
          </div>

    </header>
    </div>

    <div className='block lg:hidden'>
        <header className='w-full flex fixed top-0 left-0 items-center justify-between p-[20px_5%]'>
          <h1 className='text-[20px] font-bold'>Shopi</h1>

          <div className='flex items-center gap-5'>
            {/* <i onClick={() => fnOpen()}  className="ri-shopping-cart-line cursor-pointer text-[20px]"></i> */}
            {
              menu ? <i onClick={() => menuclose()}  className="ri-close-large-line cursor-pointer font-bold text-[20px]"></i> : 
              <i onClick={() => menuOpen()}  className="ri-menu-5-line cursor-pointer font-bold text-[20px]"></i>
            }

          </div>
        </header>
    </div>
  </div>
  }
  else{
    return  <div className='w-full relative z-[300]'>
    <div className={`fixed left-0  transition-all duration-500 ${menu ? 'top-[70px]' : 'top-[-400px]'} h-fit bg-black rounded-bl-3xl rounded-br-3xl  text-white p-10 z-[4000] w-full  lg:hidden block`}>
          <div className="nav flex flex-col items-center gap-5">
              <Link onClick={() => setMenu(false)} to={'/'} href="">Home</Link>
              <Link onClick={() => setMenu(false)} to={'/products'} href="">Products</Link>
              <Link onClick={() => setMenu(false)} to={'/register'} href="">Register</Link>
              <Link onClick={() => setMenu(false)} to={'/login'} href="">Login</Link>
              <Link onClick={() => setMenu(false)} to={'/admin/login'} href="">Admin Login</Link>
          </div>
    </div>
    <div className='hidden lg:block'>
            <header className='w-full flex fixed top-0 left-0 items-center justify-between p-[20px_10%]'>
          <h1 className='text-[24px] font-bold'>Shopi</h1>

          <div className="nav flex items-center gap-10">
          <Link to={'/'} href="">Home</Link>
              <Link to={'/products'} href="">Products</Link>
              <Link to={'/register'} href="">Register</Link>
              <Link to={'/login'} href="">login</Link>
              <Link to={'/admin/login'} href="">Admin Login</Link>
          </div>

          <div>
              <i onClick={() => fnOpen()}  className="ri-shopping-cart-line cursor-pointer text-[20px]"></i>
          </div>
    </header>
    </div>

    <div className='block lg:hidden'>
        <header className='w-full flex fixed top-0 left-0 items-center justify-between p-[20px_5%]'>
          <h1 className='text-[20px] font-bold'>Shopi</h1>

          <div className='flex items-center gap-5'>
            <i onClick={() => fnOpen()}  className="ri-shopping-cart-line cursor-pointer text-[20px]"></i>
            {
              menu ? <i onClick={() => menuclose()}  className="ri-close-large-line cursor-pointer font-bold text-[20px]"></i> : 
              <i onClick={() => menuOpen()}  className="ri-menu-5-line cursor-pointer font-bold text-[20px]"></i>
            }

          </div>
        </header>
    </div>
  </div>
  }
  
}

export default Header

