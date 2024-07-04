"use client"
import "swiper/css"

import styles from "./OurPartnersAndSchools.module.scss"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Col, Row } from "antd"
import { Autoplay } from "swiper/modules"
import MediaQuery from "react-responsive"

import SectionTitle from "../SectionTitle/SectionTitle"
import CustomButton from "../CustomButton/CustomButton"

import PartnerImg1 from "../../../public/images/partner-1.png"
import GET_SCHOOLS_AND_PARTNERS from "@/apollo/queries/getSchoolsandPartners"
import { useLazyQuery } from "@apollo/client"
import { useMediaQuery } from "react-responsive"

interface SchoolAndPartner {
  id: string
  title: string
  subTitle: string
  description: string
  imageCollections: {
    edges: {
      node: {
        id: string
        mobileImage: string
        desktopImage: string
      }
    }[]
  }
}

const OurPartnersAndSchools = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  })

  const [getSchoolsAndPartnersData, { loading, error, data }] = useLazyQuery(
    GET_SCHOOLS_AND_PARTNERS
  )
  const [schoolsAndPartners, setSchoolsAndPartners] = useState<
    SchoolAndPartner[]
  >([])

  useEffect(() => {
    getSchoolsAndPartnersData({
      variables: { section: "PARTNERS_AND_SCHOOLS" },
    })
  }, [getSchoolsAndPartnersData])

  useEffect(() => {
    if (data?.getTeamsAchievements) {
      setSchoolsAndPartners(data.getTeamsAchievements)
    }
  }, [data])

  return (
    <div className={styles.our_partner_and_schools_container}>
      <div data-aos="fade-down" data-aos-duration="600">
        <SectionTitle title={schoolsAndPartners[0]?.title} isWhite={false} />
      </div>
      <div className={styles.content_section}>
        <Row>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              loop={true}
              slidesOffsetBefore={30}
              slidesOffsetAfter={30}
              breakpoints={{
                1024: {
                  slidesOffsetBefore: 40,
                  slidesOffsetAfter: 40,
                },
              }}
              data-aos="fade-right"
              data-aos-duration="600"
            >
              {schoolsAndPartners.flatMap((item) =>
                item.imageCollections.edges.map((imageNode) => (
                  <SwiperSlide key={imageNode.node.id}>
                    <MediaQuery minWidth={1024}>
                      <Image
                        src={imageNode.node.desktopImage}
                        alt={item.title}
                        width={130}
                        height={130}
                      />
                    </MediaQuery>
                    <MediaQuery maxWidth={1023}>
                      <Image
                        src={imageNode.node.mobileImage}
                        alt={item.title}
                        width={82}
                        height={82}
                      />
                    </MediaQuery>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            data-aos="fade-left"
            data-aos-duration="600"
          >
            <div className={styles.detail_section}>
              <div className={styles.title}>
                {schoolsAndPartners.length > 0 &&
                  schoolsAndPartners[0].subTitle}
              </div>
              <div className={styles.sub_title}>
                {schoolsAndPartners.length > 0 &&
                  schoolsAndPartners[0].description}
              </div>
              <div className={styles.enroll_btn}>
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

export default OurPartnersAndSchools
