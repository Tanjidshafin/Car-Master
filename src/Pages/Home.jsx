import React from 'react'
import Hero from '../Components/Hero'
import Countup from '../Components/Countup'
import WhyChooseUs from '../Components/WhyChooseUs'
import SpecialOffers from '../Components/SpecialOffers'
import Featured from '../Components/Featured'
import Blogs from '../Components/Blogs'
import WhatWeOffer from '../Components/WhatWeOffer'


const Home = () => {
    return (
        <div>
            <Hero />
            <Countup />
            <WhatWeOffer />
            <SpecialOffers />
            <WhyChooseUs />
            <Featured />
            <Blogs />
        </div>
    )
}

export default Home