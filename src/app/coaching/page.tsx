'use client'
import styles from './page.module.scss';
import React from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from '@apollo/client';
import GET_BANNER from '@/apollo/queries/getBanner';

import CoachingBannerImg from '../../../public/images/coaching-banner.png';
import CoachingBannerXsImg from '../../../public/images/coaching-banner-xs.png';

 
const Banner = dynamic(() => import('@/components/Banner/Banner'), { ssr: false })
const FootballCoaching = dynamic(() => import('@/components/FootballCoaching/FootballCoaching'), { ssr: false })
const ProfessionalCoaches = dynamic(() => import('@/components/ProfessionalCoaches/ProfessionalCoaches'), { ssr: false })
const JoinOurCamps = dynamic(() => import('@/components/JoinOurCamps/JoinOurCamps'), { ssr: false })
const RegisterBanner = dynamic(() => import('@/components/RegisterBanner/RegisterBanner'), { ssr: false })
const JoinUs = dynamic(() => import('@/components/JoinUs/JoinUs'), { ssr: false })
const JoinOurAcademy = dynamic(() => import('@/components/JoinOurAcademy/JoinOurAcademy'), { ssr: false })

const Coaching = () => {
    const { data } = useQuery(GET_BANNER, {
        variables: { section: 'COURSES' }
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
            <FootballCoaching  />
            <JoinOurCamps />
            <JoinOurAcademy />
            <ProfessionalCoaches/>
            <RegisterBanner/>
            <JoinUs/>
           
        </div>
    )
};

export default Coaching;