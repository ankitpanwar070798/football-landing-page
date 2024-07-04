"use client"
import React, { useEffect, useState } from "react"
import styles from "./Discover.module.scss"
import Image from "next/image"
import discoverImg from "../../../../../public/images/discoverImg.png"
import HorizontalLine from "../../../../../public/images/about-line.svg"
import { Button } from "antd"
import { useMediaQuery } from "react-responsive"
import GET_DREAMS_IN_ACTION from '@/apollo/queries/getVideo';
import { useLazyQuery } from '@apollo/client';

const Discover = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  })
  const [getDreamsInActionData] = useLazyQuery(GET_DREAMS_IN_ACTION);
  const [dreamsInActionData, setDreamsInActionData] = useState<any | null>(null);

  const getDreamsInActionApi = async () => {
    try {
      const { data } = await getDreamsInActionData({ variables: { section: "DREAMS_IN_ACTION" } });
      if (data?.getSections) {
        setDreamsInActionData(data.getSections);
      } else {
        setDreamsInActionData(null);
      }
    } catch (error) {
      setDreamsInActionData(null);
    }
  };

  useEffect(() => {
    getDreamsInActionApi();
  }, []);

  console.log("Dreams Data:", dreamsInActionData); 
  return (
    <div className={styles.discover_container}>
      <div className={styles.details_container} data-aos="fade-right" data-aos-duration="600">
        {isDesktopOrLaptop ? (
          <>
            <div className={styles.tag_container}>Discover Our Story</div>
            <div className={styles.title_container}>
              <h1>{dreamsInActionData?.title}</h1>
              <Image
                src={HorizontalLine}
                alt=""
                style={{
                  width: "20%",
                  height: "5px",
                }}
              />
            </div>
          </>
        ) : (
          ""
        )}
        <div className={styles.description_container}>
          <p>
           {dreamsInActionData?.description}
          </p>
        </div>
       <div className={styles.banner_cta}>
       <Button type="primary" className={styles.enroll_btn}>
            Enroll Now
        </Button>
        </div>
      </div>
      <div className={styles.images_container} data-aos="fade-left" data-aos-duration="600">
        {!isDesktopOrLaptop ? (
          <>
            <div className={styles.tag_container}>Discover Our Story</div>
            <div className={styles.title_container}>
              <h1>{dreamsInActionData?.title}</h1>
              <Image
                src={HorizontalLine}
                alt=""
                style={{
                  width: "20%",
                  height: "5px",
                }}
              />
            </div>
          </>
        ) : (
          ""
        )}
        <Image
          className={styles.image}
          src={discoverImg}
          alt="discover"
          width={726}
          height={648}
        />
      </div>
    </div>
  )
}

export default Discover
