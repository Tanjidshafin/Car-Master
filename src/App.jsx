import { Route, Routes } from "react-router"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Allcars from "./Pages/Allcars"
import CarDetails from "./Pages/CarDetail"
import Register from "./Components/Register"
import Footer from "./Components/Footer"
import Errora from "./Components/Errora"
import { useContext, useEffect } from "react"
import { AppContext } from "./context/AppContext"
import MyProfile from "./Components/MyProfile"
import Private from "./context/Private"
import Favourites from "./Pages/Favourites"
import UseLiked from "./Hooks/UseLiked"




function App() {
  const { user, setFavCount } = useContext(AppContext)
  const [favCars, refetch, isFetching] = UseLiked()
  useEffect(() => {
    if (!isFetching) {
      setFavCount(favCars.length);
      localStorage.setItem("favCounts", favCars.length);
    }
  }, [favCars, isFetching, user]);

  useEffect(() => {
    const storedFavCount = localStorage.getItem("favCounts");
    if (storedFavCount) {
      setFavCount(JSON.parse(storedFavCount));
    }
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-cars" element={<Allcars />} />
        <Route path="/car/:id" element={<CarDetails />} />
        {!user && <Route path="/register" element={<Register />} />}
        {user && <Route path="/profile" element={<Private>
          <MyProfile />
        </Private>} />}
        {user && <Route path="/favorites" element={<Private>
          <Favourites />
        </Private>} />}
        <Route path="*" element={<Errora />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
