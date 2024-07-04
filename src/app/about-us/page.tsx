'use client'
import styles from './page.module.scss';
import React from 'react';
import dynamic from 'next/dynamic';

import { useQuery } from '@apollo/client';
import GET_BANNER from '@/apollo/queries/getBanner';

import AboutBannerImg from '../../../public/images/about-banner.png';
import AboutBannerXsImg from '../../../public/images/about-banner-xs.png';
import { ToastContainer } from 'react-toastify';
 
const Banner = dynamic(() => import('@/components/Banner/Banner'), { ssr: false })
const Video = dynamic(() => import('@/components/VideoSection/Video'), { ssr: false })
const Discover = dynamic(() => import('@/app/about-us/_components/Discover/Discover'), { ssr: false })
const Awards = dynamic(() => import('@/app/about-us/_components/Awards/Awards'), { ssr: false })
const BehindArtz = dynamic(() => import('@/app/about-us/_components/BehindArtz/BehindArtz'), { ssr: false })
const OurTrustee = dynamic(() => import('@/app/about-us/_components/OurTrustee/OurTrustee'), { ssr: false })
const RegisterBanner = dynamic(() => import('@/components/RegisterBanner/RegisterBanner'), { ssr: false })
const JoinUs = dynamic(() => import('@/components/JoinUs/JoinUs'), { ssr: false })
const ContactUs = dynamic(() => import('@/components/ContactUs/ContactUs'), { ssr: false })


const Aboutus = () => {
    const { data } = useQuery(GET_BANNER, {
        variables: { section: 'ABOUT_US' }
    });
    return (
        <div>
            <Banner 
                desktopBanner={data?.getSections?.sectionItems?.edges[0]?.node?.desktopImage}
                mobileBanner={data?.getSections?.sectionItems?.edges[0]?.node?.mobileImage}
                title={data?.getSections?.sectionItems?.edges[0]?.node?.title || ""}
                description={data?.getSections?.sectionItems?.edges[0]?.node?.description || ""}
                ctaText={"Register Now!"}
                onClick={()=>null}
            />
            <Video/>
            <Discover/>
            <Awards/>
            <BehindArtz/>
            <OurTrustee/>
            <RegisterBanner/>
            <JoinUs/>
            <ContactUs/>
            <ToastContainer />

        </div>
    )
};

export default Aboutus;