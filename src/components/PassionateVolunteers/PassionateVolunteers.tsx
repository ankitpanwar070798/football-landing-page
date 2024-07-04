"use client"
import styles from "./PassionateVolunteers.module.scss"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Col, Row } from "antd"

import CustomButton from "../CustomButton/CustomButton"

import passionate_volunteers1 from "../../../public/images/passionate_volunteers1.png"
import passionate_volunteers2 from "../../../public/images/passionate_volunteers2.png"
import GET_VOLUNTEERS from "@/apollo/queries/getVolunteers"
import { useLazyQuery } from "@apollo/client"
import { useMediaQuery } from "react-responsive"

interface ImageCollection {
  id: string
  mobileImage: string
  desktopImage: string
}

interface TeamAchievement {
  id: string
  title: string
  description: string
  imageCollections?: {
    edges: {
      node: ImageCollection
    }[]
  }
}

const PassionateVolunteers = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  })

  const [getVolunteersData, { data }] = useLazyQuery<{
    getTeamsAchievements: TeamAchievement[]
  }>(GET_VOLUNTEERS)
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [imageCollections, setImageCollections] = useState<ImageCollection[]>(
    []
  )

  useEffect(() => {
    if (data?.getTeamsAchievements && data.getTeamsAchievements.length > 0) {
      const { title, description, imageCollections } =
        data.getTeamsAchievements[0]
      setTitle(title)
      setDescription(description)
      if (imageCollections?.edges) {
        // Check if imageCollections and edges are defined
        setImageCollections(imageCollections.edges.map((edge) => edge.node))
      }
    }
  }, [data])

  useEffect(() => {
    getVolunteersData({ variables: { section: "TEAM_OF_VOLUNTEERS" } })
  }, [getVolunteersData])

  return (
    <div className={styles.passionate_volunteers_container}>
      <Row gutter={[32, 32]}>
        <Col
          xs={24}
          sm={9}
          md={9}
          lg={9}
          xl={9}
          className={styles.left_column}
          data-aos="fade-right"
          data-aos-duration="600"
        >
          <div className={styles.title}>{title}</div>
          <div className={styles.sub_title}>{description}</div>
          <div className={styles.enroll_btn}>
            <CustomButton
              color={"#2D2D2D"}
              bgColor={"#FBE046"}
              borderColor={"#FBE046"}
              isFullWidth={false}
            >
              Join Now
            </CustomButton>
          </div>
        </Col>
        <Col
          xs={24}
          sm={15}
          md={15}
          lg={15}
          xl={15}
          className={styles.right_column}
          data-aos="fade-left"
          data-aos-duration="600"
        >
          <Row gutter={[32, 32]}>
            {imageCollections.map((image, index) => (
              <Col key={index} xs={24} sm={12} md={12} lg={12} xl={12}>
                <div className={styles.image_container}>
                  <Image
                    src={
                      isDesktopOrLaptop ? image.desktopImage : image.mobileImage
                    }
                    alt=""
                    layout="fill"
                    objectFit={"cover"}
                    objectPosition={"top"}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default PassionateVolunteers
