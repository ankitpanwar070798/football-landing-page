'use client'
import Image from "next/image";
import styles from "./page.module.scss";
import dynamic from 'next/dynamic';
import { useQuery } from '@apollo/client';
import GET_BANNER from '@/apollo/queries/getBanner';


import HomeBannerImg from '../../public/images/home-banner.png';
import HomeBannerXsImg from '../../public/images/home-banner-xs.png';


const Banner = dynamic(() => import('@/components/Banner/Banner'), { ssr: false })
const FootballCoaching = dynamic(() => import('@/components/FootballCoaching/FootballCoaching'), { ssr: false })
const ProfessionalCoaches = dynamic(() => import('@/components/ProfessionalCoaches/ProfessionalCoaches'), { ssr: false })
const ExclusiveCoaching = dynamic(() => import('@/components/ExclusiveCoaching/ExclusiveCoaching'), { ssr: false })
const JoinOurCamps = dynamic(() => import('@/components/JoinOurCamps/JoinOurCamps'), { ssr: false })
const TournamentParticipation = dynamic(() => import('@/components/TournamentParticipation/TournamentParticipation'), { ssr: false })
const RegisterBanner = dynamic(() => import('@/components/RegisterBanner/RegisterBanner'), { ssr: false })
const JoinUs = dynamic(() => import('@/components/JoinUs/JoinUs'), { ssr: false })
const Video = dynamic(() => import('@/components/VideoSection/Video'), { ssr: false })
const ContactUs = dynamic(() => import('@/components/ContactUs/ContactUs'), { ssr: false })
const JoinOurAcademy = dynamic(() => import('@/components/JoinOurAcademy/JoinOurAcademy'), { ssr: false })
const AreYouCoach = dynamic(() => import('@/components/AreYouCoach/AreYouCoach'), { ssr: false })
const OurPartnersAndSchools = dynamic(() => import('@/components/OurPartnersAndSchools/OurPartnersAndSchools'), { ssr: false })
const Impact = dynamic(() => import('@/components/Impact/Impact'), { ssr: false })
const PassionateVolunteers = dynamic(() => import('@/components/PassionateVolunteers/PassionateVolunteers'), { ssr: false })
const EmpowerFuture = dynamic(() => import('@/components/EmpowerFuture/EmpowerFuture'), { ssr: false })
const Testimonials = dynamic(() => import('@/components/Testimonials/Testimonials'), { ssr: false })


export default function Home() {
  const { data } = useQuery(GET_BANNER, {
    variables: { section: 'BANNER' }
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
      <FootballCoaching />
      <ProfessionalCoaches/>
      <ExclusiveCoaching />
      <JoinOurCamps />
      <TournamentParticipation />
      <RegisterBanner/>
      <Video/>
      <JoinOurAcademy/>
      <AreYouCoach />
      <OurPartnersAndSchools />
      <Impact />
      <EmpowerFuture />
      <PassionateVolunteers />
      <Testimonials />
      <JoinUs/>
      <ContactUs/>
    </div>
  );
}
