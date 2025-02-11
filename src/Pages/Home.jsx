import React from 'react'
import Hero from '../Components/Hero'
import Countup from '../Components/Countup'
import WhyChooseUs from '../Components/WhyChooseUs'
import SpecialOffers from '../Components/SpecialOffers'
import Featured from '../Components/Featured'

const Home = () => {
    return (
        <div>
            <Hero />
            <Countup />
            <SpecialOffers />
            <WhyChooseUs />
            <Featured />

        </div>
    )
}

export default Home