import { Routes, Route } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import ProfilePage from './pages/ProfilePage'
import ListingsPage from './pages/ListingsPage'
import ListingFormPage from './pages/ListingsFormPage'
import ListingPage from './pages/ListingPage'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials= true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/listings/" element={<ListingsPage />} />
          <Route path="/account/listings/new" element={<ListingFormPage />} />
          <Route path="/account/listings/:id" element={<ListingFormPage />} />
          <Route path="/listing/:id" element={<ListingPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>  
    </UserContextProvider>
  )
}

export default App
