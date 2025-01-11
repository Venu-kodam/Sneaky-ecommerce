import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Collections from './pages/Collections'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Placeorder from './pages/Placeorder'
import Product from './pages/Product'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes } from 'react-router-dom'
import Verify from './pages/Verify'
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/placeorder' element={<Placeorder />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
      <Footer />
    </div>
  )
}

export default App