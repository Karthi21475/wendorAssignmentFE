import { Route,Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import Signup from './pages/SignupPage.jsx';
import HomePage from './pages/Homepage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import BookingsPage from './pages/BookingsPage.jsx'
import MyBookings from './pages/MyBookings.jsx';
function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/services/:id' element={<ServicesPage/>}></Route>
      <Route path='/bookings/:id' element={<BookingsPage/>} ></Route>
      <Route path='/my-bookings' element={<MyBookings/>} ></Route>
    </Routes>
  )
}

export default App
