// Home.js
import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import CategoriesSection from './CategoriesSection';
import TrendingCauses from './TrendingCauses';
import Footer from './Footer';

function Home() {
    return (
        <>
            <HeroSection />
            <CategoriesSection />
            <TrendingCauses />
        </>
    );
}

export default Home;
