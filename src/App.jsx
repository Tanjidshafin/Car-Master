import { Route, Routes } from "react-router"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Allcars from "./Pages/Allcars"
import CarDetails from "./Pages/CarDetail"
import Register from "./Components/Register"
import Footer from "./Components/Footer"
import Errora from "./Components/Errora"
import { useContext } from "react"
import { AppContext } from "./context/AppContext"




function App() {
  const { user } = useContext(AppContext)
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-cars" element={<Allcars />} />
        <Route path="/car/:id" element={<CarDetails />} />
        {!user && <Route path="/register" element={<Register />} />}
        <Route path="*" element={<Errora />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
