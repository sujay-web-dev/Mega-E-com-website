import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/Layout'
import AuthLogin from './pages/auth/Login'
import AuthRegister from './pages/auth/Register'
import AdminLayout from './components/admin-view/Layout'
import AdminDashboard from './pages/admin-view/Dashboard'
import AdminProducts from './pages/admin-view/Products'
import AdminOrder from './pages/admin-view/Order'
import AdminFeatures from './pages/admin-view/Features'
import ShoppingLayout from './components/shopping-view/Layout'
import Notfound from './pages/not-found/Index'
import ShoppingHome from './pages/shopping-view/Home'
import ShoppingListing from './pages/shopping-view/Listing'
import ShoppingAccount from './pages/shopping-view/Account'
import ShoppingCheckout from './pages/shopping-view/Checkout'
import CheckAuth from './components/common/Check-auth'
import UnauthPage from './pages/unAuth-page/UnauthPage'

function App() {

  const isAuthenticated = false;
  const user = {
    name:"sujay",
    role:"admin"
  };

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      {/* Common Components */}
      <h4>Header Component</h4>
      <Routes>

        <Route path='/auth' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout /></CheckAuth>}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route path='/admin' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout /></CheckAuth>}>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrder />} />
          <Route path='features' element={<AdminFeatures />} />
        </Route>

        <Route path='/shop' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout /></CheckAuth>}>
          <Route path='home' element={<ShoppingHome />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
        </Route>

        <Route path='*' element={<Notfound />} />
        <Route path='/unauth-page' element={<UnauthPage/>}/>
      </Routes>
    </div>
  )
}

export default App
