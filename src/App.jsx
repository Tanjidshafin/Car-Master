import { Route, Routes } from "react-router"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Allcars from "./Pages/Allcars"
import CarDetails from "./Pages/CarDetail"
import Register from "./Components/Register"
import Login from "./Components/Login"
import Footer from "./Components/Footer"
import Errora from "./Components/Errora"
import { useContext, useEffect } from "react"
import { AppContext } from "./context/AppContext"
import MyProfile from "./Components/MyProfile"
import Private from "./context/Private"
import Favourites from "./Pages/Favourites"
import UseLiked from "./Hooks/UseLiked"
import AdminRoute from "./context/AdminRoute"
import VendorRoute from "./context/VendorRoute"
import AdminLayout from "./Pages/AdminLayout"
import AdminDashboard from "./Pages/AdminDashboard"
import AdminCars from "./Pages/AdminCars"
import AdminFavorites from "./Pages/AdminFavorites"
import AdminVendorRequests from "./Pages/AdminVendorRequests"
import AdminPendingListings from "./Pages/AdminPendingListings"
import VendorLayout from "./Pages/vendor/VendorLayout"
import VendorDashboard from "./Pages/vendor/VendorDashboard"
import VendorCars from "./Pages/vendor/VendorCars"
import VendorBookings from "./Pages/vendor/VendorBookings"
import VendorMessages from "./Pages/vendor/VendorMessages"
import VendorProfile from "./Pages/vendor/VendorProfile"
import BecomeVendor from "./Pages/vendor/BecomeVendor"
import Messages from "./Pages/Messages"
import Notifications from "./Pages/Notifications"
import MyBookings from "./Pages/MyBookings"
import { Navigate } from "react-router"




function App() {
  const { user, setFavCount } = useContext(AppContext)
  const [favCars, , isFetching] = UseLiked()
  useEffect(() => {
    if (!isFetching) {
      setFavCount(favCars.length);
      localStorage.setItem("favCounts", favCars.length);
    }
  }, [favCars, isFetching, setFavCount, user]);

  useEffect(() => {
    const storedFavCount = localStorage.getItem("favCounts");
    if (storedFavCount) {
      setFavCount(JSON.parse(storedFavCount));
    }
  }, [setFavCount]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-cars" element={<Allcars />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
        {user && <Route path="/profile" element={<Private>
          <MyProfile />
        </Private>} />}
        {user && <Route path="/favorites" element={<Private>
          <Favourites />
        </Private>} />}
        {user && <Route path="/messages" element={<Private><Messages /></Private>} />}
        {user && <Route path="/notifications" element={<Private><Notifications /></Private>} />}
        {user && <Route path="/my-bookings" element={<Private><MyBookings /></Private>} />}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="cars" element={<AdminCars />} />
          <Route path="favorites" element={<AdminFavorites />} />
          <Route path="vendor-requests" element={<AdminVendorRequests />} />
          <Route path="pending-listings" element={<AdminPendingListings />} />
        </Route>
        <Route
          path="/vendor"
          element={
            <VendorRoute>
              <VendorLayout />
            </VendorRoute>
          }
        >
          <Route index element={<Navigate to="/vendor/dashboard" replace />} />
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="cars" element={<VendorCars />} />
          <Route path="bookings" element={<VendorBookings />} />
          <Route path="messages" element={<VendorMessages />} />
        </Route>
        {user && <Route path="/become-vendor" element={<Private><BecomeVendor /></Private>} />}
        <Route path="/vendor/:vendorId" element={<VendorProfile />} />
        <Route path="*" element={<Errora />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
