import { Route, Routes } from "react-router"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Allcars from "./Pages/Allcars"
import CarDetails from "./Pages/CarDetail"
import Register from "./Components/Register"




function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-cars" element={<Allcars />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </>
  )
}

export default App
