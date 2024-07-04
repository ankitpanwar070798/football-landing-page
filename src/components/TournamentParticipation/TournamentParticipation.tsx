"use client"
import styles from "./TournamentParticipation.module.scss"
import React, { useEffect, useState } from "react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { FreeMode, Pagination, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Image, { StaticImageData } from "next/image"
import { Col, Row, Flex, Button } from "antd"
import MediaQuery from "react-responsive"
import { useLazyQuery } from "@apollo/client"
import GET_TEAMS_ACHIEVEMENTS from "@/apollo/queries/getTournamentParticipation"

import SectionTitle from "../SectionTitle/SectionTitle"
import CustomButton from "../CustomButton/CustomButton"

import TournamentWinnersImg from "../../../public/images/tournament-winners.png"
import NextArrow from "../../../public/images/slider-right-arrow.svg"
import RightArrow from "../../../public/images/right-arrow.svg"

interface SectionItem {
    id: string;
    mobileImage: string;
    desktopImage: string;
    participationStatus: string;
    year: number;
    place: string;
    location: string;
  }
  
  interface TournamentSection {
    id: string;
    title: string;
    sectionItems: {
      edges: {
        node: SectionItem;
      }[];
    };
  }
  
  interface TournamentData {
    getSections: TournamentSection;
  }


const TournamentParticipation = () => {
 const [tournamentParticipationData, setTournamentParticipationData] = useState<SectionItem[]>([]);
  const [title, setTitle] = useState<string>("");

  const [getTournamentData] = useLazyQuery<TournamentData>(GET_TEAMS_ACHIEVEMENTS);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getTournamentData({
          variables: { section: "TOURNAMENT_PARTICIPATION" },
        });
        if (data?.getSections) {
          setTitle(data.getSections.title);
          setTournamentParticipationData(data.getSections.sectionItems.edges.map(edge => edge.node));
        } else {
          setTournamentParticipationData([]);
        }
      } catch (error) {
        console.error("Error fetching tournament data:", error);
        setTournamentParticipationData([]);
      }
    };
    fetchData();
  }, [getTournamentData]);

  return (
    <div className={styles.tournament_participation_container}>
      <div data-aos="fade-down" data-aos-duration="600">
        <SectionTitle
          title={title}
          isWhite={false}
        />
      </div>
      <div
        className={styles.content_section}
        data-aos="fade-left"
        data-aos-duration="600"
      >
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={40}
          freeMode={false}
          pagination={{
            el: ".swiper-custom-pagination",
          }}
          navigation
          modules={[FreeMode, Pagination, Navigation]}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          className={styles.exclusive_coaching_slider}
          breakpoints={{
            1024: {
              slidesOffsetBefore: 80,
              slidesOffsetAfter: 80,
              freeMode: true,
              pagination: false,
              navigation: false,
            },
          }}
        >
          {tournamentParticipationData.map((item, index) => (
            <SwiperSlide key={item.id}>
              <ParticipationCard
                image={item.desktopImage}
                name={item.place}
                location={item.location}
                isEven={index % 2 === 0}
              />
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div className={styles.view_all_slider}>
              <div className={styles.title}>View All</div>
              <div className={styles.arrow_icon}>
                <Image src={NextArrow} alt={""} width={53} height={53} />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="swiper-custom-pagination" />
      </div>
      <MediaQuery maxWidth={1024}>
        <div className={styles.btn_section}>
          <CustomButton
            color={"#2D2D2D"}
            bgColor={"#FBE046"}
            borderColor={"#FBE046"}
            isFullWidth={false}
          >
            View All
          </CustomButton>
        </div>
      </MediaQuery>
    </div>
  )
}

export default TournamentParticipation

const ParticipationCard = ({
  image,
  name,
  location,
  isEven,
}: {
  image: string
  name: string
  location: string
  isEven: boolean
}) => {
  return (
    <div
      className={`${styles.participation_card_container} ${
        isEven ? styles.even_card : ""
      }`}
    >
      <div className={styles.image_section}>
        <Image
          src={image}
          alt={""}
          // fill={true}
          layout="fill"
          objectFit={"cover"}
          objectPosition={"top"}
          className={styles.participation_item_image}
        />
      </div>
      <div className={styles.participation_detail_container}>
        <div className={styles.title}>{name}</div>
        <div className={styles.description}>{location}</div>
      </div>
    </div>
  )
}
