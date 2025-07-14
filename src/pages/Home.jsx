import React from 'react';
import Hero from '../components/Hero';
import Facilities from '../components/Facilities';
import LocationSection from '../components/LocationSection';
import DiscountCoupon from '../components/DiscountCoupon';
import RecentEvent from '../components/RecentEvent';

const Home = () => {
    return (
        <>
            <Hero></Hero>
            <Facilities></Facilities>
            <RecentEvent></RecentEvent>
            <DiscountCoupon></DiscountCoupon>
            <LocationSection></LocationSection>
            
        </>
    );
};

export default Home;