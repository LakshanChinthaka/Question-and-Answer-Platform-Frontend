import React from 'react'
import Footer from '../Components/Footer'
import HeroSection from '../Components/HeroSection'
import NavBar from '../Components/NavBar'
import Post from '../Components/Post'


function Home() {
    return (
        <div>
            <HeroSection />
            <Post />
            <Footer />
        </div>
    )
}

export default Home