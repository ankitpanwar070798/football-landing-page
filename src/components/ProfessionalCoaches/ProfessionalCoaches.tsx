"use client"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

import styles from "./ProfessionalCoaches.module.scss"
import React, { useState } from "react"
import { Col, Row } from "antd"
import { Swiper, SwiperSlide } from "swiper/react"
import Image, { StaticImageData } from "next/image"
import { Pagination, Navigation, EffectFade } from "swiper/modules"
import MediaQuery from "react-responsive"
import { useQuery } from '@apollo/client';
import GET_COACHES_OR_CAMPS from '@/apollo/queries/getCoachesOrCamps';
import { useMediaQuery } from 'react-responsive'

import SectionTitle from "../SectionTitle/SectionTitle"
import CustomButton from "../CustomButton/CustomButton"

import ProfessionalImg from "../../../public/images/professional-img.png"
import PrevArrow from "../../../public/images/slider-left-arrow.svg"
import NextArrow from "../../../public/images/slider-right-arrow.svg"

const ProfessionalCoaches = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  const { data } = useQuery(GET_COACHES_OR_CAMPS, {
    variables: { section: 'COACH' }
  });
  const {getCoachesOrCamps} = data || [];

  const selectedCoach = getCoachesOrCamps?.[activeIndex] || {};

  return (
    <div className={styles.professional_coaches_container}>
      <div data-aos="fade-down" data-aos-duration="600">
        <SectionTitle title={"Our Professional Coaches"} isWhite={true} />
      </div>
      <div className={styles.content_section}>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={10} md={10} lg={10} xl={10}>
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              pagination={{
                el: ".swiper-custom-pagination",
              }}
              navigation
              modules={[Pagination, Navigation, EffectFade]}
              className={styles.professional_slider}
              effect="fade"
              data-aos="fade-right"
              data-aos-duration="600"
              onRealIndexChange={(element)=>setActiveIndex(element.activeIndex)}
            >
              {
                getCoachesOrCamps?.map((coach:any) => (
                  <SwiperSlide key={coach.id}>
                    <ProfessionalCard
                      desktopImage={coach.desktopImage}
                      mobileImage={coach.mobileImage}
                      name={coach.name}
                      role={coach.designation}
                    />
                  </SwiperSlide>
                ))
              }
              {/* <SwiperSlide>
                <ProfessionalCard
                  image={ProfessionalImg}
                  name={"Fazil Hussain"}
                  role={"Head"}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProfessionalCard
                  image={ProfessionalImg}
                  name={"Fazil Hussain"}
                  role={"Head"}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProfessionalCard
                  image={ProfessionalImg}
                  name={"Fazil Hussain"}
                  role={"Head"}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProfessionalCard
                  image={ProfessionalImg}
                  name={"Fazil Hussain"}
                  role={"Head"}
                />
              </SwiperSlide> */}
            </Swiper>
            <div className="swiper-custom-pagination" />
          </Col>
          <Col xs={24} sm={14} md={14} lg={14} xl={14}>
            <div
              className={styles.profession_detail_section}
              data-aos="fade-left"
              data-aos-duration="600"
            >
              <div className={styles.description}>
                {selectedCoach?.description}
              </div>
              <div className={styles.horizontal_divider} />
              <div className={styles.specialization_section}>
                <div className={styles.title}>Specialization</div>
                <ul className={styles.specialization_list}>
                  {
                    selectedCoach?.specializations?.map((specialization:string, index:number) => (
                      <li key={index}>{specialization}</li>
                    ))
                  }
                </ul>
              </div>
              <div className={styles.horizontal_divider} />
              <div className={styles.trained_count}>
                Students Trained:&nbsp;<span>{selectedCoach?.studentsTrained}</span>
              </div>
              <div className={styles.trained_count}>
                Available slots:&nbsp;<span>{selectedCoach?.availableSlots}</span>
              </div>
              <div className={styles.btn_section}>
                <CustomButton
                  color={"#2D2D2D"}
                  bgColor={"#FBE046"}
                  borderColor={"#FBE046"}
                  isFullWidth={false}
                >
                  Know More
                </CustomButton>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ProfessionalCoaches

const ProfessionalCard = ({
  desktopImage,
  mobileImage,
  name,
  role,
}: {
  desktopImage: string,
  mobileImage: string,
  name: string,
  role: string
}) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)'
  })
  return (
    <div className={styles.professional_card_container}>
      <div className={styles.image_section}>
        <Image
          src={isDesktopOrLaptop ? desktopImage : mobileImage}
          alt={""}
          // fill={true}
          layout="fill"
          objectFit={"cover"}
          className={styles.professional_item_image}
        />
        <MediaQuery maxWidth={1023}>
          <div className={styles.professional_detail}>
            <div className={styles.professional_name}>{name}</div>
            <div className={styles.professional_role}>{role}</div>
          </div>
        </MediaQuery>
      </div>
      <MediaQuery minWidth={1024}>
        <div className={styles.professional_name}>{name}</div>
        <div className={styles.professional_role}>{role}</div>
      </MediaQuery>
    </div>
  )
}
