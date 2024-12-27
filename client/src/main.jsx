import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './screens/Home.jsx'
import Login from './screens/Login.jsx'
import Register from './screens/Register.jsx'
import {Provider} from 'react-redux'
import Store from './toolkit/store.js'
import Cproduct from './screens/Cproduct.jsx'
import Products from './screens/Products.jsx'
import ProductView from './screens/ProductView.jsx'
import Wearhouse from './screens/Wearhouse.jsx'
import Profile from './screens/Profile.jsx'
import BuyerOrders from './screens/BuyerOrders.jsx'
import AdminLogin from './screens/AdminLogin.jsx'
import AdminOrder from './screens/AdminOrder.jsx'
import Success from './screens/Success.jsx'
import Error from './screens/Error.jsx'
// import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import IsAdmin from './middleware/IsAdmin.jsx'
import IsUser from './middleware/IsUser.jsx'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


const Rootx = () => {
  
  return <BrowserRouter>
  <ScrollToTop />
      <Routes>
          <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/create/product' element={<IsAdmin><Cproduct /></IsAdmin>} />
              <Route path='/products' element={<Products />} />
              <Route path='/products/:id' element={<ProductView />} />
              <Route path='/wearhouse' element={<IsAdmin><Wearhouse /></IsAdmin>} />
              <Route path='/profile' element={<IsUser><Profile /></IsUser>} />
              <Route path='/myorders' element={<IsUser><BuyerOrders /></IsUser>} />
              <Route path='/admin/login' element={<AdminLogin />} />
              <Route path='/admin/orders' element={<IsAdmin><AdminOrder /></IsAdmin>} />
              <Route path='/payment/success' element={<Success />} />
              <Route path='/payment/cancel' element={<Error />} />
          </Route>
        
      </Routes>
  </BrowserRouter>
}
let persistor = persistStore(Store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <Rootx />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
