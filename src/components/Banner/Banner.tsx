"use client"
import styles from "./Banner.module.scss"
import React, { useRef } from "react"
import { Button, Flex } from "antd"
import { useMediaQuery } from "react-responsive"
import { StaticImageData } from "next/image"
import MediaQuery from "react-responsive"

import CustomButton from "../CustomButton/CustomButton"


const Banner = ({
  desktopBanner,
  mobileBanner,
  title,
  description,
  ctaText,
  onClick,
}: {
  desktopBanner: string,
  mobileBanner: string,
  title: string,
  description: string,
  ctaText: string,
  onClick: () => void
}) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1023 })
  const container = useRef<HTMLElement | any>()
  const background = useRef<HTMLElement | any>() // Ref for the background container
  const bannerContent = useRef<HTMLElement | any>() //
  const registerBtn = useRef<HTMLElement | any>() //

  return (
    <Flex justify={"start"} className={styles.banner_container} ref={container}>
      <MediaQuery minWidth={1024}>
        <div
          className={styles.banner_background}
          ref={background}
          style={{
            background: `url(${desktopBanner}) no-repeat center center`,
            backgroundSize: "cover",
          }}
        ></div>
      </MediaQuery>
      <MediaQuery maxWidth={1023}>
        <div
          className={styles.banner_background}
          ref={background}
          style={{
            background: `url(${mobileBanner}) no-repeat left bottom`,
            backgroundSize: "cover",
          }}
        ></div>
      </MediaQuery>
      <div className={styles.banner_content}>
        <div ref={bannerContent} data-aos="fade-right" data-aos-duration="600">
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>
        <div data-aos="fade-up" data-aos-duration="600">
          <CustomButton
            color={"#FFF"}
            bgColor={"rgba(1, 43, 127, 0.60)"}
            borderColor={"#FFF"}
            isFullWidth={false}
            onClick={onClick}
          >
            {ctaText}
          </CustomButton>
        </div>

        {/* <Button type="primary" className={styles.regiter_btn} ref={registerBtn} onClick={onClick}>
                {ctaText}
            </Button> */}
      </div>
    </Flex>
  )
}

export default Banner
