import { Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/auth/LoginPage'
import Layout from './layout/Layout'
import RegisterPage from './pages/auth/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import ProfilePage from './pages/account/ProfilePage'
import ListingsPage from './pages/account/ListingsPage'
import ListingFormPage from './pages/listing/ListingsFormPage'
import ListingPage from './pages/listing/ListingPage'
import BookingsPage from './pages/account/BookingsPage'
import BookingPage from './pages/booking/BookingPage'
import AccountLayout from './layout/AccountLayout'

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
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<ProfilePage />} />
            <Route path="listings/" element={<ListingsPage />} />
            <Route path="listings/new" element={<ListingFormPage />} />
            <Route path="listings/:id" element={<ListingFormPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="bookings/:id" element={<BookingPage />} />
          </Route>
          <Route path="/listing/:id" element={<ListingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}


export default App
