import { Route, Routes } from "react-router"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Allcars from "./Pages/Allcars"
import Footer from "./Components/Footer"



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-cars" element={<Allcars />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
