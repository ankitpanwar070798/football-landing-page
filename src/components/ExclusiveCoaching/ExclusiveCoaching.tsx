"use client"
import styles from "./ExclusiveCoaching.module.scss"
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
import GET_EXCLUSIVE_COACHING from "@/apollo/queries/getExclusiveCoaching"

import SectionTitle from "../SectionTitle/SectionTitle"
import CustomButton from "../CustomButton/CustomButton"

import CoachingImg1 from "../../../public/images/coaching-1.png"
import NextArrow from "../../../public/images/slider-right-arrow.svg"
import RightArrow from "../../../public/images/right-arrow.svg"

interface SectionItem {
  id: string
  title: string
  description: string
  mobileImage: string
  desktopImage: string
}

interface ExclusiveCoachingSection {
  id: string
  title: string
  sectionItems: {
    edges: {
      node: SectionItem
    }[]
  }
}

interface ExclusiveCoachingData {
  getSections: ExclusiveCoachingSection
}

const ExclusiveCoaching = () => {
  const [exclusiveCoachingData, setExclusiveCoachingData] = useState<
    SectionItem[]
  >([])
  const [title, setTitle] = useState<string>("")

  const [getExclusiveCoachingData] = useLazyQuery<ExclusiveCoachingData>(
    GET_EXCLUSIVE_COACHING
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getExclusiveCoachingData({
          variables: { section: "EXCLUSIVE_COACHING" },
        })
        if (data?.getSections) {
          setTitle(data.getSections.title)
          setExclusiveCoachingData(
            data.getSections.sectionItems.edges.map((edge) => edge.node)
          )
        } else {
          setExclusiveCoachingData([])
        }
      } catch (error) {
        console.error("Error fetching exclusive coaching data:", error)
        setExclusiveCoachingData([])
      }
    }
    fetchData()
  }, [getExclusiveCoachingData])

  console.log(exclusiveCoachingData, "exclusiveCoachingData")
  return (
    <div className={styles.exclusive_coaching_container}>
      <div data-aos="fade-down" data-aos-duration="600">
        <SectionTitle title={title} isWhite={false} />
      </div>
      <div className={styles.content_section}>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          freeMode={false}
          pagination={{
            el: ".swiper-custom-pagination",
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
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
          data-aos="fade-left"
          data-aos-duration="600"
        >
          {exclusiveCoachingData.map((item) => (
            <SwiperSlide key={item.id}>
              <CoachingCard
                image={item.desktopImage}
                title={item.title}
                description={item.description}
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
        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />
      </div>
      {/* {exclusiveCoachingData.length > 5 && ( */}
      <MediaQuery maxWidth={1024}>
        <div className={styles.btn_section}>
          <CustomButton
            color={"#2D2D2D"}
            bgColor={"#FBE046"}
            borderColor={"#FBE046"}
            isFullWidth={false}
          >
            Explore All
          </CustomButton>
        </div>
      </MediaQuery>
      {/* )}  */}
    </div>
  )
}

export default ExclusiveCoaching

const CoachingCard = ({
  image,
  title,
  description,
}: {
  image: string
  title: string
  description: string
}) => {
  return (
    <div className={styles.coaching_card_container}>
      <Row>
        <Col xs={24} sm={10} md={10} lg={10} xl={10}>
          <div className={styles.image_section}>
            <Image
              src={image}
              alt={""}
              // fill={true}
              layout="fill"
              objectFit={"cover"}
              className={styles.coaching_item_image}
            />
          </div>
        </Col>
        <Col xs={24} sm={14} md={14} lg={14} xl={14}>
          <div className={styles.coaching_detail_container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
            <MediaQuery minWidth={1024}>
              <CustomButton
                color={"#2D2D2D"}
                bgColor={"#FBE046"}
                borderColor={"#FBE046"}
                isFullWidth={true}
              >
                Know More
              </CustomButton>
            </MediaQuery>
            <MediaQuery maxWidth={1024}>
              <Flex align="center" justify="space-between">
                <Button type="link" className={styles.enroll_btn}>
                  Know More
                </Button>
                <Image src={RightArrow} alt={""} width={54} height={54} />
              </Flex>
            </MediaQuery>
          </div>
        </Col>
      </Row>
    </div>
  )
}
